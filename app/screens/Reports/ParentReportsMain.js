import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    processColor,
    Image,
    TouchableHighlight,
} from 'react-native';
import update from 'immutability-helper';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import colors from "../../config/colors";

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { RadarChart } from 'react-native-charts-wrapper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Linking } from 'react-native';

class ParentReportsMain extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    habitNames = [
        "Proper Speed", "Gentle Acceleration", "Gentle Braking", "Avoiding Phone Use", "Slowing for Turns"
    ]

    habitTips = ["take a moment to center yourself before driving. Life can get busy and chaotic, " +
        "but speeding generally on saves a couple minutes of time and contributes to a third of collisions." +
        " Before a drive, take a moment to make the decision not to speed.",
    "remember that there may be unexpected objects in your path. Accelerating more slowly will " +
    "help give you time to react to these dangerous events. This is also more efficent," +
    "and will help lower your fuel costs and carbon footprint!",
    "Braking suddenly can surprise drivers behind you and cause collisions. If possible, " +
    "start braking earlier so that you can brake more gently over a longer period of time. However, " +
    "you should still brake hard when necessary, such as when you see an unexpected pedestrian.",
    "enable do-not-disturb when you drive so that you won't be distracted by alerts. " +
    "Your friends and family will understand if you don't respond while driving.", ""
    ];
    habitLinks = ["https://www.youtube.com/watch?v=SzcDDuiZW2U",
        "https://www.youtube.com/watch?v=zuiErrLL8lQ",
        "https://www.youtube.com/watch?v=YpdfT6eKg1w",
        "https://www.youtube.com/watch?v=IhAIzc1MgVc",
        "https://www.youtube.com/watch?v=4Lt-xIvXrf8"];

    challengeNames = ["Parking", "Distractions", "Merging", "Left Turns"];

    challengeTips = ["make sure to find a space you are confident in. Don't worry about a slightly longer walk" +
        " to your destination if there is a less crowded area of the parking lot.",
    "passenger conversations can be distracting. Your passengers are counting on you to keep them safe. They "
    + "won't be offended if you ask them for quiet to concentrate on the road.",
    "make sure to adjust your speed to the traffic you are merging into. Some learning drivers " +
    "have the instinct to slow down before merging; this can actually be more dangerous in this situation.",
    "remember that the choice of when to turn is yours. Do not let drivers behind you pressure " +
    "you into turning unsafely.",
    ];
    challengeLinks = ["https://www.youtube.com/watch?v=v-OmDGydsHc&t=25s",
        "https://www.youtube.com/watch?v=V2h0jxCbKso",
        "https://www.youtube.com/watch?v=wfXQ2YWB34Y",
        "https://www.youtube.com/watch?v=dvvUt8mAxHk"];

    componentDidMount() {
        firestore().collection('users').doc(auth().currentUser.uid).get().then((parentData) => {
            firestore().collection('users').doc(parentData._data.currentChild).get().then((data) => {
                const minDate = String(Date.now() - 604800000);
                firestore().collection('users').doc(parentData._data.currentChild).collection('reports').where(firestore.FieldPath.documentId(), '>=', minDate).get().then((reportData) => {
                    firestore().collection('users').doc(parentData._data.currentChild).collection('drives').where(firestore.FieldPath.documentId(), '>=', minDate).get().then((driveData) => {
                        let habits = [0, 0, 0, 0, 0];
                        let challenges = [0, 0, 0, 0];
                        reportData._docs.forEach(element => {
                            habits[0] += element._data.speed;
                            habits[1] += element._data.accel;
                            habits[2] += element._data.brake;
                            habits[3] += element._data.phone;
                            habits[4] += element._data.turn;
                        });
                        driveData._docs.forEach(element => {
                            if (element._data.reflection.bad.parking) {
                                challenges[0] += 1;
                            }
                            if (element._data.reflection.bad.distractions) {
                                challenges[1] += 1;
                            }
                            if (element._data.reflection.bad.merging) {
                                challenges[2] += 1;
                            }
                            if (element._data.reflection.bad.left) {
                                challenges[3] += 1;
                            }
                        });
                        let habitMax = 0;
                        let habitMaxIndex = 0;
                        for (let i = 0; i < 5; i++) {
                            if (habits[i] > habitMax) {
                                habitMax = habits[i];
                                habitMaxIndex = i;
                            }
                        }
                        let skillMax = 0;
                        let skillMaxIndex = 0;
                        for (let i = 0; i < 4; i++) {
                            if (challenges[i] > skillMax) {
                                skillMax = challenges[i];
                                skillMaxIndex = i;
                            }
                        }

                        let road = "";
                        let roads = [data._data.statistics.roads.rural, data._data.statistics.roads.residential,
                        data._data.statistics.roads.highway, data._data.statistics.roads.city,
                        data._data.statistics.roads.interstate];
                        let roadNames = ["rural", "residential", "highway", "city", "interstate"];
                        if (data._data.level < 3) {
                            let min = roads[0];
                            let minIndex = 0;
                            for (let i = 0; i < 2; i++) {
                                if (roads[i] < min) {
                                    min = roads[i];
                                    minIndex = i;
                                }
                            }
                            road = roadNames[minIndex];
                        }
                        else if (data._data.level < 5) {
                            let min = roads[0];
                            let minIndex = 0;
                            for (let i = 0; i < 3; i++) {
                                if (roads[i] < min) {
                                    min = roads[i];
                                    minIndex = i;
                                }
                            }
                            road = roadNames[minIndex];
                        }
                        else if (data._data.level < 8) {
                            let min = roads[0];
                            let minIndex = 0;
                            for (let i = 0; i < 4; i++) {
                                if (roads[i] < min) {
                                    min = roads[i];
                                    minIndex = i;
                                }
                            }
                            road = roadNames[minIndex];
                        } else {
                            let min = roads[0];
                            let minIndex = 0;
                            for (let i = 0; i < 5; i++) {
                                if (roads[i] < min) {
                                    min = roads[i];
                                    minIndex = i;
                                }
                            }
                            road = roadNames[minIndex];
                        }

                        this.setState({
                            empty: reportData._docs.length === 0,
                            habit: habitMaxIndex,
                            challenge: skillMaxIndex,
                            roadType: road,
                        })

                    });
                });
            });
        });
    }

    render() {

        return (
            this.state.roadType ? !this.state.empty ?
                <View style={[styles.container, { flex: 1, justifyContent: "space-evenly" }]}>
                    <View style={{ flex: 0, flexDirection: "row", backgroundColor: "#C4D9B3" }}>
                        <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                            onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'ParentRoads' }], }); }} style={styles.topStartButton}>
                            <View>
                                <Image style={styles.image} source={require("../../assets/images/road.png")}></Image>
                                <Text style={styles.topStartText}>Roads</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                            onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'ParentProgress' }], }); }} style={styles.topStartButton}>
                            <View>
                                <Image style={styles.image} source={require("../../assets/images/progress.png")}></Image>
                                <Text style={styles.topStartText}>Progress</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" disabled={true}
                            onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'ParentReportsMain' }], }); }} style={styles.topStartButtonSelected}>
                            <View>
                                <Image style={styles.image} source={require("../../assets/images/learning.png")}></Image>
                                <Text style={styles.topStartText}>Tips</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                            onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'ParentSafety' }], }); }} style={styles.topStartButton}>
                            <View>
                                <Image style={styles.image} source={require("../../assets/images/car.png")}></Image>
                                <Text style={styles.topStartText}>Safety</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <Text style={[styles.toptitle, { marginTop: 10 }]}>Top 3 Tips from this week to improve student driving!</Text>
                    <View style={{ flex: 2 }}>
                        <Text style={[styles.title,]}>Safety Habits</Text>
                        <Text style={[styles.subtitle,]}>They struggle most with: </Text>
                        <Text style={[styles.subtitle,]}>{this.habitNames[this.state.habit]}</Text>

                        <Text style={[styles.text,]}>Our recommendation: {this.habitTips[this.state.habit]}</Text>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <TouchableHighlight onPress={() => { Linking.openURL(this.habitLinks[this.state.habit]); }} style={styles.backButtonSelected}>
                                <Text style={styles.nexttext}>Video to Learn More</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={[styles.title]}>Skills</Text>
                        <Text style={[styles.subtitle]}>They struggle most with: </Text>
                        <Text style={[styles.subtitle]}>{this.challengeNames[this.state.challenge]}</Text>
                        <Text style={[styles.text]}>Our recommendation: {this.challengeTips[this.state.challenge]}</Text>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <TouchableHighlight onPress={() => { Linking.openURL(this.challengeLinks[this.state.challenge]); }} style={styles.backButtonSelected}>
                                <Text style={styles.nexttext}>Video to Learn More</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.title]}>Road Types</Text>
                        <Text style={[styles.subtitle]}>Practice more on {this.state.roadType} roads. </Text>
                        <Text style={[styles.text, { marginBottom: 25 }]}>This is at your student's skill level and will help you gain valuable experience.</Text>
                    </View>

                    <View style={{ flex: 0, flexDirection: "row" }}>
                        <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                            onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'ParentHome' }], }); }} style={styles.startButton}>
                            <View>
                                <Image style={styles.image} source={require("../../assets/images/home.png")}></Image>
                                <Text style={styles.startText}>Home</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight disabled={true} underlayColor="rgba(95, 128, 59, .5)"
                            onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'ParentReportsMain' }], }); }} style={styles.startButtonSelected}>
                            <View>
                                <Image style={styles.image} source={require("../../assets/images/chart.png")}></Image>
                                <Text style={styles.startText}>Reports</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                            onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'ParentAccount' }], }); }} style={styles.startButton}>
                            <View>
                                <Image style={styles.image} source={require("../../assets/images/account.png")}></Image>
                                <Text style={styles.startText}>Account</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                </View>

                :
                <View style={[{ flex: 1, justifyContent: "space-evenly" }]}>
                    <View style={{ flex: 0, flexDirection: "row", backgroundColor: "#C4D9B3" }}>
                        <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                            onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'Roads' }], }); }} style={styles.topStartButton}>
                            <View>
                                <Image style={styles.image} source={require("../../assets/images/road.png")}></Image>
                                <Text style={styles.topStartText}>Roads</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                            onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'Progress' }], }); }} style={styles.topStartButton}>
                            <View>
                                <Image style={styles.image} source={require("../../assets/images/progress.png")}></Image>
                                <Text style={styles.topStartText}>Progress</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" disabled={true}
                            onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'ReportsMain' }], }); }} style={styles.topStartButtonSelected}>
                            <View>
                                <Image style={styles.image} source={require("../../assets/images/learning.png")}></Image>
                                <Text style={styles.topStartText}>Tips</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                            onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'Safety' }], }); }} style={styles.topStartButton}>
                            <View>
                                <Image style={styles.image} source={require("../../assets/images/car.png")}></Image>
                                <Text style={styles.topStartText}>Safety</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                            onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'Skills' }], }); }} style={styles.topStartButton}>
                            <View>
                                <Image style={styles.image} source={require("../../assets/images/skills.png")}></Image>
                                <Text style={styles.topStartText}>Skills</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={[styles.background, { flex: 3 }]}>
                        <View style={styles.logoContainer}>
                            <Image style={styles.logo} source={require("../../assets/images/icon.png")} />
                            <Text style={styles.title}>Practice driving this week to receive some tips!</Text>
                        </View>
                    </View>

                    <View style={{ flex: 0, flexDirection: "row" }}>
                        <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                            onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'ParentHome' }], }); }} style={styles.startButton}>
                            <View>
                                <Image style={styles.image} source={require("../../assets/images/home.png")}></Image>
                                <Text style={styles.startText}>Home</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight disabled={true} underlayColor="rgba(95, 128, 59, .5)"
                            onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'ParentReportsMain' }], }); }} style={styles.startButtonSelected}>
                            <View>
                                <Image style={styles.image} source={require("../../assets/images/chart.png")}></Image>
                                <Text style={styles.startText}>Reports</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                            onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'ParentAccount' }], }); }} style={styles.startButton}>
                            <View>
                                <Image style={styles.image} source={require("../../assets/images/account.png")}></Image>
                                <Text style={styles.startText}>Account</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>


                :
                <View style={styles.background}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logo} source={require("../../assets/images/icon.png")} />
                        <Text style={styles.name}>Professor Driver</Text>
                    </View>
                </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 19,
        alignItems: "center",
        //justifyContent: "center"
    }, title: {
        fontFamily: "Montserrat",
        color: "black",
        fontWeight: "bold",
        fontSize: 22,
        paddingTop: 10,
        textAlign: "center",
    },
    toptitle: {
        fontFamily: "Montserrat",
        color: "black",
        fontWeight: "bold",
        fontSize: 25,
        paddingTop: 10,
        paddingHorizontal: 20,
        textAlign: "center",
    },
    background: {
        flex: 1,
        backgroundColor: "#F3F3F5",
        alignItems: "center",
    },
    logoContainer: {
        alignItems: "center",
        position: "absolute",
        top: 270
    },
    name: {
        fontFamily: "Montserrat",
        fontWeight: "bold",
        fontSize: 33,
        lineHeight: 100,
        letterSpacing: 0.015
    },
    note: {
        fontFamily: "Montserrat-Italic",
        color: "black",
        fontSize: 18,
        paddingTop: 5
    },
    startButton: {
        backgroundColor: "#FD917E",
        borderRadius: 8,
        width: 160,
        height: 64,
        alignItems: "center",
        justifyContent: "center"
    },
    startText: {
        fontFamily: "Montserrat",
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        //paddingTop: 10
    },
    logo: {
        width: 150,
        height: 123
    },
    subtitle: {
        fontFamily: "Montserrat",
        color: colors.PDgreen,
        fontWeight: "bold",
        textAlign: "center",
        marginHorizontal: 20,
        fontSize: 18
    },
    text: {
        fontFamily: "Montserrat",
        textAlign: "center",
        marginHorizontal: 20,
        fontSize: 16
    },
    chart: {
        flex: 4,
        marginTop: 200,
        height: 100,
        //backgroundColor: '#C4D9B3',
        borderRadius: 16,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    startText: {
        fontFamily: "Montserrat",
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        //paddingTop: 10
    },
    topStartText: {
        fontFamily: "Montserrat",
        color: "white",
        //fontWeight: "bold",
        fontSize: 20,
        //paddingTop: 10
    },
    container: {
        backgroundColor: "white",
        borderRadius: 19,
        alignItems: "center",
        //justifyContent: "center"
    },
    topStartButton: {
        backgroundColor: "#C4D9B3",
        borderRightColor: "#F3F3F5",
        borderLeftColor: "#F3F3F5",
        borderTopColor: "#F3F3F5",
        borderBottomColor: "#C4D9B3",
        paddingBottom: 15,
        paddingTop: 50,
        flex: 1,
        borderWidth: 1,
        height: 150,
        alignItems: "center",
        justifyContent: "center"
    },
    topStartButtonSelected: {
        backgroundColor: "rgba(95, 128, 59,255)",
        borderRightColor: "#F3F3F5",
        borderLeftColor: "#F3F3F5",
        borderTopColor: "#F3F3F5",
        borderBottomColor: "rgba(95, 128, 59, 255)",
        paddingBottom: 15,
        paddingTop: 50,
        flex: 1,
        borderWidth: 1,
        height: 150,
        alignItems: "center",
        justifyContent: "center"
    },
    startButton: {
        backgroundColor: "#C4D9B3",
        borderRightColor: "#F3F3F5",
        borderLeftColor: "#F3F3F5",
        borderTopColor: "#F3F3F5",
        borderBottomColor: "#C4D9B3",
        paddingBottom: 15,
        paddingTop: 15,
        flex: 1,
        borderWidth: 1,
        height: 90,
        alignItems: "center",
        justifyContent: "center"
    },
    startButtonSelected: {
        backgroundColor: "rgba(95, 128, 59,255)",
        borderRightColor: "#F3F3F5",
        borderLeftColor: "#F3F3F5",
        borderTopColor: "#F3F3F5",
        borderBottomColor: "rgba(95, 128, 59, 255)",
        paddingBottom: 15,
        paddingTop: 15,
        flex: 1,
        borderWidth: 1,
        height: 90,
        alignItems: "center",
        justifyContent: "center"
    }, backButtonSelected: {
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#87B258',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    }, nexttext: {
        fontFamily: "Montserrat",
        color: "#F3F3F5",
        fontWeight: "bold",
        fontSize: 18
    },
});

export default ParentReportsMain;