import React, {Component} from "react";
import {StyleSheet, View, Image, Text, TextInput, TouchableHighlight, Button, AppState, DatePickerIOS} from "react-native";

import QRCode from 'react-native-qrcode-svg';
import colors from "../config/colors";
import Geolocation from 'react-native-geolocation-service';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import KeepAwake from 'react-native-keep-awake';
import DateTimePicker from '@react-native-community/datetimepicker';


import axios from 'axios';
import sizeof from 'object-sizeof'; 


import {
    accelerometer,
    gyroscope,
    setUpdateIntervalForType,
    SensorTypes
  } from "react-native-sensors";

import {
    combineLatest
  } from "rxjs";
import { Dimensions } from "react-native";
  


class DriveAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
      componentDidMount() {
        if (this.props.route.params.alert.type === "curfew") {
            let currMinutes = (new Date(Date.now())).getMinutes() + (new Date(Date.now())).getHours() * 60;
            let curfew = this.props.route.params.alert.curfewTime;
            console.log(currMinutes);
            console.log(curfew)
            if ((curfew < 360 && (currMinutes < curfew || currMinutes > 360)) || (curfew > 360 && (currMinutes > 360 && currMinutes < curfew))) {
                this.setState({brokeCurfew: false}, () => {console.log(this.state)})
            } else {
                this.setState({brokeCurfew: true}, () => {console.log(this.state)})
            }
        }
        
      }

    render() {
        return (
            <View style={{ flex: 1, }}>
                

                <Text style={[styles.title, { paddingTop: 50, flex: 0.25, }]}>Alert</Text>
                <Text style={[styles.subtitle, {flex: 0.25, alignItems:"center" }]}>Your parent has given you a {this.props.route.params.alert.type === "warning" ? "warning" : this.props.route.params.alert.type === "curfew" ? "curfew" : "suspension"}.</Text>
                <Text style={[styles.subtitle, {flex: 0.5, alignItems:"center" }]}>It's a good idea to have a discussion with them about their concerns and how to improve your behavior.</Text>
                {this.props.route.params.alert.type === "curfew" ?  <Text style={[styles.subtitle, {flex: 0.5, alignItems:"center" }]}>Your curfew is at: {(new Date(Date.now() - (new Date(Date.now())).getHours() * 60 * 60 * 1000 - (new Date(Date.now())).getMinutes() * 60 * 1000 - (new Date(Date.now())).getSeconds() * 1000 + this.props.route.params.alert.curfewTime * 60 * 1000)).toLocaleTimeString()}</Text>
                : null}
                {this.props.route.params.alert.type === "curfew" ? this.state.brokeCurfew ? <Text style={[styles.subtitle, {flex: 0.5, alignItems:"center" }]}> It is past your curfew so you cannot drive right now.</Text> : 
                <Text style={[styles.subtitle, {flex: 0.5, alignItems:"center" }]}> It is before your curfew so you can drive right now.</Text> : null}
                {this.props.route.params.alert.type === "grounded" ?  <Text style={[styles.subtitle, {flex: 0.5, alignItems:"center" }]}>Your parents have suspended your driving privileges. You may not drive right now.</Text>
                : null}
                <Text style={[styles.subtitle, { flex: 0, alignItems:"center" }]}>{"It will expire on: "}</Text>
                <Text style={[styles.subtitle, { flex: 0, alignItems:"center" }]}>{
                (new Date(this.props.route.params.alert.end.seconds * 1000)).toLocaleDateString() + 
                " at " + (new Date(this.props.route.params.alert.end.seconds * 1000)).toLocaleTimeString()}</Text>


                    
                <View style={{ flex: 1, flexDirection: "row", top: Dimensions.get("window").height - 650}}>
                <View style={{ flex: 1, alignItems: "center" }}>
                        <TouchableHighlight onPress={() => {this.props.navigation.goBack();}} style={styles.backButtonSelected}>
                            <Text style={styles.nexttext}>Back</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <TouchableHighlight onPress={() => { if (this.props.route.params.alert.type === "warning" || (this.props.route.params.alert.type === "curfew" && !this.state.brokeCurfew)){ this.props.navigation.navigate("Checklist");} else {this.props.navigation.navigate("Home");} }} style={styles.backButtonSelected}>
                            <Text style={styles.nexttext}>{this.props.route.params.alert.type === "warning" ? "Ok" : this.props.route.params.alert.type === "curfew" && !this.state.brokeCurfew ? "Ok" : "Cancel Drive"}</Text>
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
        fontSize: 35,
        paddingTop: 10,
        textAlign: "center",

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
    emergencyText: {
        fontFamily: "Montserrat",
        color: "#F3F3F5",
        fontWeight: "bold",
        fontSize: 22,
        paddingTop:15
    },nextButtonSelected: {
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

export default DriveAlert;