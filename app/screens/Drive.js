import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TextInput, TouchableHighlight, Button, AppState } from "react-native";

import QRCode from 'react-native-qrcode-svg';
import colors from "../config/colors";
import Geolocation from 'react-native-geolocation-service';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import KeepAwake from 'react-native-keep-awake';


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



class Drive extends Component {
    constructor(props) {
        super(props);
        this.state = { startTime: "", apiRequests: 0, lastRoad: { lat: 0, lon: 0, roadType: "", roadSpeed: "" }, data: [], appState: "active" };
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this._handleAppStateChange);
    }

    _handleAppStateChange = nextAppState => {
        console.log(nextAppState);
        this.setState({ appState: nextAppState });
    };

    startDrive = () => {
        KeepAwake.activate();
        this.setState({ startTime: new Date().getTime() });
        Geolocation.requestAuthorization("always").then((result) => {
            if (result === "granted") {

                setUpdateIntervalForType(SensorTypes.accelerometer, 250);
                setUpdateIntervalForType(SensorTypes.gyroscope, 250);
                const mySensors = combineLatest(accelerometer, gyroscope);
                this.subscription = mySensors.subscribe(([accel, gyro]) => {

                    //console.log("started");
                    Geolocation.getCurrentPosition(
                        (position) => {
                            if (this.checkPosition(position.coords.latitude,
                                position.coords.longitude, this.state.lastRoad.lat,
                                this.state.lastRoad.lon)) {
                                this.learnRoad(position.coords.latitude, position.coords.longitude);
                            }
                            this.setState(state => {
                                const data = state.data.concat({
                                    loc: {
                                        accuracy: position.coords.accuracy,
                                        latitude: position.coords.latitude, longitude: position.coords.longitude,
                                        heading: position.coords.heading, speed: position.coords.speed,
                                        time: position.timestamp, roadType: this.state.lastRoad.roadType,
                                        roadSpeed: this.state.lastRoad.roadSpeed
                                    },
                                    acc: { x: accel.x, y: accel.y, z: accel.z, t: accel.timestamp },
                                    gyro: { x: gyro.x, y: gyro.y, z: gyro.z, t: gyro.timestamp }, phone: { using: this.state.appState }
                                });

                                return {
                                    data,
                                };
                            });

                            //console.log(position);
                            //console.log(accel.x, accel.y, accel.z, accel.timestamp);
                        },
                        (error) => {
                            // See error code charts below.
                            console.log(error.code, error.message);
                        },
                        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
                    );
                });

            }
        }
        );
    };

    stopDrive = () => {
        this.subscription.unsubscribe();
        KeepAwake.deactivate();
        this.props.navigation.navigate("Reflection", { data: this.state.data, apiRequests: this.state.apiRequests, startTime: this.state.startTime })
    };


    learnRoad = (lat, lon) => {
        this.setState((prevState, props) => ({
            apiRequests: prevState.apiRequests + 1
        }));
        const nomUrl = "https://nominatim.openstreetmap.org/reverse?lat=" +
            String(lat) + "&lon=" + String(lon)
            + "&zoom=17&format=json";
        axios.get(nomUrl).then((nomResponse) => {
            const road = nomResponse.data.osm_id;
            const osmUrl = "https://openstreetmap.org/api/0.6/way/" + road + "/full.json";
            axios.get(osmUrl).then((osmResponse) => {
                const roadTags = osmResponse.data.elements.find((element) => element.type === "way").tags;
                const roadType = roadTags.highway;
                const roadSpeed = roadTags.maxSpeed;
                console.log(roadType + " " + roadSpeed);
                this.setState({ lastRoad: { lat: lat, lon: lon, roadType: roadType, roadSpeed: roadSpeed } })
            }).catch((error) => {
                console.log(error + ": " + osmUrl);
                //this.setState({lastRoad: {lat: lat, lon:lon, roadType:"", roadSpeed:""}});
            });

        }).catch((error) => {
            console.log(error + ": " + nomUrl);
            //this.setState({lastRoad: {lat: lat, lon:lon, roadType:"", roadSpeed:""}});
        });
    }
    checkPosition = (lat1, lon1, lat2, lon2) => {
        const deltaLat = (lat2 - lat1) * (Math.PI / 180);
        const deltaLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.pow(Math.sin(deltaLat / 2), 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.pow(Math.sin(deltaLon / 2), 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = 6371 * c;
        console.log(d);
        return d * 1000 > 30;
    }
    componentDidMount() {
        AppState.addEventListener("change", this._handleAppStateChange);
        this.startDrive();
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: "space-around" }}>
                <View style={{ flex: 2, alignItems: "center", paddingTop: 50 }}>
                    <TouchableHighlight onPress={() => { this.stopDrive(); this.props.navigation.navigate("Accident"); }} style={styles.emergencyButtonSelected}>
                        <View style={{ flexDirection: "row" }}>
                            <Image source={require("../assets/images/emergency.png")}></Image>
                            <Text style={styles.emergencyText}>I was in an accident.</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <Text style={[styles.title, { flex: 3, alignItems: "center" }]}>Keep your eyes on the road!</Text>


                <View style={{ flex: 1, alignItems: "center" }}>
                    <TouchableHighlight onPress={() => { this.stopDrive(); }}
                        style={styles.backButtonSelected}
                    >
                        <Text style={styles.nexttext}>Finish Drive</Text>
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

export default Drive;