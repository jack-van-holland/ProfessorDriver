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


class Accident extends React.Component {

    constructor() {
        super();
        this.state = {
            injuries: false, passengers: false, safety: false, call: false, parents: false, wait: false, exchange: false, document: false,
        };
    }

    render() {

        return (
            <View style={{ flex: 1, justifyContent: "space-around", paddingTop: 50 }}>


                <View style={{ flex: 1 }}>
                    <Text style={[styles.title, { alignItems: "center" }]}>Don't Panic. </Text>
                    <Text style={[styles.subtitle, { alignItems: "center" }]}>Here's what to do: </Text>
                </View>
                <CheckBox fontFamily='Montserrat' center title="Check yourself for injuries" onPress={() => { this.setState((pastState) => { return { injuries: !pastState.injuries } }); }}
                    checked={this.state.injuries} style={{ flex: 1 }}></CheckBox>
                <CheckBox fontFamily='Montserrat' center title="Check in on your passengers" onPress={() => { this.setState((pastState) => { return { passengers: !pastState.passengers } }); }}
                    checked={this.state.passengers} style={{ flex: 1 }}></CheckBox>
                <CheckBox fontFamily='Montserrat' center title='Get to safety' onPress={() => { this.setState((pastState) => { return { safety: !pastState.safety } }); }}
                    checked={this.state.safety} style={{ flex: 1 }}></CheckBox>
                <CheckBox fontFamily='Montserrat' center title='Call 911' onPress={() => { this.setState((pastState) => { return { call: !pastState.call } }); }}
                    checked={this.state.call} style={{ flex: 1 }}></CheckBox>
                <CheckBox fontFamily='Montserrat' center title='Call your parents' onPress={() => { this.setState((pastState) => { return { parents: !pastState.parents } }); }}
                    checked={this.state.parents} style={{ flex: 1 }}></CheckBox>
                <CheckBox fontFamily='Montserrat' center title='Wait for help to arrive' onPress={() => { this.setState((pastState) => { return { wait: !pastState.wait } }); }}
                    checked={this.state.wait} style={{ flex: 1 }}></CheckBox>
                <CheckBox fontFamily='Montserrat' center title='Exchange contact and insurance information' onPress={() => { this.setState((pastState) => { return { exchange: !pastState.exchange } }); }}
                    checked={this.state.exchange} style={{ flex: 1 }}></CheckBox>
                <CheckBox fontFamily='Montserrat' center title='Document the accident with notes and photos' onPress={() => { this.setState((pastState) => { return { document: !pastState.document } }); }}
                    checked={this.state.document} style={{ flex: 1 }}></CheckBox>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <TouchableHighlight onPress={() => { this.props.navigation.goBack(); }}
                        style={styles.backButtonSelected}
                    >
                        <Text style={styles.nexttext}>Resolved</Text>
                    </TouchableHighlight>
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
        alignItems: "center"

    }, subtitle: {
        fontFamily: "Montserrat",
        color: "black",
        fontWeight: "bold",
        fontSize: 22,
        paddingTop: 10,
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center"

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
    },
    nextButtonSelected: {
        backgroundColor: '#87B258',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    emergencyButtonSelected: {
        width: 300,
        height: 75,
        backgroundColor: '#E60000',
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    backButtonSelected: {
        width: 300,
        height: 75,
        backgroundColor: '#87B258',
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50
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
    },
    emergencyText: {
        fontFamily: "Montserrat",
        color: "#F3F3F5",
        fontWeight: "bold",
        fontSize: 22,
        paddingTop: 15
    },
});

export default Accident;