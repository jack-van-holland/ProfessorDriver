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
import colors from "../config/colors";
import { CheckBox } from "react-native-elements";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { RadarChart } from 'react-native-charts-wrapper';


class DriveScreen extends React.Component {

    constructor() {
        super();
    }

    render() {

        return (
            <View style={{ flex: 1, justifyContent: "space-around" }}>

                <Text style={[styles.title, { flex: 1, alignItems: "center" }]}>Phone Placement</Text>
                <Image style={styles.image} source={require("../assets/images/mount.jpg")}></Image>
                <Text style={[styles.subtitle, { flex: 3, alignItems: "center" }]}>{`
Please place your phone in a car mount. 
                
Make sure that it does not obscure your vision of the road.
                
It must be placed fully vertical with cameras faced directly towards the front of the car to ensure proper data collection.`}</Text>

                <View style={{ flex: .65, flexDirection: "row" }}>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <TouchableHighlight onPress={() => { this.props.navigation.goBack(); }} style={styles.backButtonSelected}>
                            <Text style={styles.nexttext}>Back</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <TouchableHighlight onPress={() => { this.props.navigation.navigate("Drive"); }}
                            style={styles.nextButtonSelected}
                        >
                            <Text style={styles.nexttext}>I'm Ready!</Text>
                        </TouchableHighlight>
                    </View>
                </View>

            </View>);

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
        fontSize: 40,
        paddingTop: 10,
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        marginTop: 50,

    }, subtitle: {
        fontFamily: "Montserrat",
        color: "black",
        fontSize: 22,
        paddingTop: 10,
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        marginHorizontal: 20,

    }, background: {
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
    text: {
        fontFamily: "Montserrat",
        fontSize: 16,
        textAlign: "center",
        zIndex: 2,
    },
    chart: {
        flex: 4,
        marginTop: 200,
        height: 100,
        //backgroundColor: '#C4D9B3',
        borderRadius: 16,
        zIndex: 1,
    },
    image: {
        flex: 3,
        width: null,
        height: null,
        resizeMode: 'contain',
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
    },
    nextButtonSelected: {
        width: 121,
        height: 40,
        backgroundColor: '#87B258',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    backButtonSelected: {
        width: 121,
        height: 40,
        backgroundColor: '#87B258',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    nextButtonUnselected: {
        width: 121,
        height: 40,
        backgroundColor: '#C4D9B3',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    }, nexttext: {
        fontFamily: "Montserrat",
        color: "#F3F3F5",
        fontWeight: "bold",
        fontSize: 35,
    }, nexttext: {
        fontFamily: "Montserrat",
        color: "#F3F3F5",
        fontWeight: "bold",
        fontSize: 18
    },
    emergencyText: {
        fontFamily: "Montserrat",
        color: "#F3F3F5",
        fontWeight: "bold",
        fontSize: 22,
        paddingTop: 15
    },
});

export default DriveScreen;