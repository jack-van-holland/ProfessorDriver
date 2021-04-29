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
  


class Curfew extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    createCurfew = () => {
        firestore().collection('users').doc(this.props.route.params.id).update({
            status: {
                type: "curfew",
                end: this.state.date,
            },
        }).then(() => {
            this.props.navigation.navigate("ParentAccount");
        });
    }
    
      componentDidMount() {

        this.setState({date: Date.now()})
      }

    render() {
        return (
            <View style={{ flex: 1, }}>
                

                <Text style={[styles.subtitle, { paddingTop: 300, flex: 0.25, alignItems:"center" }]}>Create a curfew to teach your student to focus more on safe driving.</Text>
                <Text style={[styles.subtitle, { flex: 0, alignItems:"center" }]}>Set the date when the curfew will expire.</Text>

                {this.state.date ? <DateTimePicker testID="dateTimePicker"
          
          mode={'datetime'}
          is24Hour={true}
          display="default"
         value={this.state.date} onChange={(event, date) => {this.setState({date: date});}} style={{flex: .25, marginLeft: Dimensions.get("window").width / 2 - 100}}>
                </DateTimePicker> : null}
                    
                <View style={{ flex: 1, flexDirection: "row", top: Dimensions.get("window").height - 575}}>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <TouchableHighlight onPress={() => { this.props.navigation.goBack(); }} style={styles.backButtonSelected}>
                            <Text style={styles.nexttext}>Cancel</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <TouchableHighlight onPress={() => { this.props.navigation.navigate("CurfewTime", {id: this.props.route.params.id, end: this.state.date}); }}
                            style={styles.nextButtonSelected}
                        >
                            <Text style={styles.nexttext}>Continue</Text>
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

export default Curfew;