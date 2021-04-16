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


class Checklist extends React.Component {

    constructor() {
        super();

        this.state = {
            mirrors: false, seatbelt: false, gas: false, maintenance: false, radio: false, headlights: false, temperature: false, wipers: false, snow: false,
        };
    }

    render() {

        return (
            <View style={{ flex: 1 }}>

                <Text style={[styles.title, { marginTop: 50 }]}>Before you go...</Text>
                <View style={{flex:10, marginTop: 25}}>
                <Text style={[styles.subtitle,]}>Make sure that you:</Text>
                <CheckBox fontFamily='Montserrat' center title='adjust the mirrors' onPress={() => { this.setState((pastState) => { return { mirrors: !pastState.mirrors } }); }}
                    checked={this.state.mirrors} style={{ flex: 1 }}></CheckBox>
                <CheckBox fontFamily='Montserrat' center title='clear the windows of any snow or frost' onPress={() => { this.setState((pastState) => { return { snow: !pastState.snow } }); }}
                    checked={this.state.snow} style={{ flex: 1 }}></CheckBox>
                <CheckBox fontFamily='Montserrat' center title='fasten your seatbelt' onPress={() => { this.setState((pastState) => { return { seatbelt: !pastState.seatbelt } }); }}
                    checked={this.state.seatbelt} style={{ flex: 1 }}></CheckBox>
                <CheckBox fontFamily='Montserrat' center title='check your fuel level' onPress={() => { this.setState((pastState) => { return { gas: !pastState.gas } }); }}
                    checked={this.state.gas} style={{ flex: 1 }}></CheckBox>
                <CheckBox fontFamily='Montserrat' center title='check for any maintenance alerts' onPress={() => { this.setState((pastState) => { return { maintenance: !pastState.maintenance } }); }}
                    checked={this.state.maintenance} style={{ flex: 1 }}></CheckBox>
                <CheckBox fontFamily='Montserrat' center title='turn down the radio' onPress={() => { this.setState((pastState) => { return { radio: !pastState.radio } }); }}
                    checked={this.state.radio} style={{ flex: 1 }}></CheckBox>
                <CheckBox fontFamily='Montserrat' center title='turn on the headlights if necessary' onPress={() => { this.setState((pastState) => { return { headlights: !pastState.headlights } }); }}
                    checked={this.state.headlights} style={{ flex: 1 }}></CheckBox>
                <CheckBox fontFamily='Montserrat' center title='adjust the heat or A/C if necessary' onPress={() => { this.setState((pastState) => { return { temperature: !pastState.temperature } }); }}
                    checked={this.state.temperature} style={{ flex: 1 }}></CheckBox>
                <CheckBox fontFamily='Montserrat' center title='turn on the wipers if necessary' onPress={() => { this.setState((pastState) => { return { wipers: !pastState.wipers } }); }}
                    checked={this.state.wipers} style={{ flex: 1 }}></CheckBox>
                </View>
                <View style={{ flex: 2, flexDirection: "row" }}>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <TouchableHighlight onPress={() => { this.props.navigation.goBack(); }} style={styles.backButtonSelected}>
                            <Text style={styles.nexttext}>Back</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <TouchableHighlight onPress={() => { this.props.navigation.navigate("DriveScreen"); }}
                            disabled={(this.state.mirrors && this.state.snow &&
                                this.state.seatbelt && this.state.gas &&
                                this.state.maintenance && this.state.radio
                                && this.state.headlights && this.state.temperature
                                && this.state.wipers) ? false : true}
                            style={(this.state.mirrors && this.state.snow &&
                                this.state.seatbelt && this.state.gas && this.state.maintenance
                                && this.state.radio && this.state.headlights && this.state.temperature
                                && this.state.wipers) ? styles.nextButtonSelected : styles.nextButtonUnselected}
                        >
                            <Text style={styles.nexttext}>Start</Text>
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
        fontSize: 18
    },
});

export default Checklist;