import React, {Component} from "react";
import {StyleSheet, View, Image, Text, TextInput, TouchableHighlight, Button, AppState} from "react-native";

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
        this.state = {startTime: "", apiRequests: 0, lastRoad: {lat: 0, lon: 0, roadType: "", roadSpeed: ""}, data: [], appState: "active"};
    }

    componentDidMount() {
        AppState.addEventListener("change", this._handleAppStateChange);
      }
    
      componentWillUnmount() {
        AppState.removeEventListener("change", this._handleAppStateChange);
      }
    
      _handleAppStateChange = nextAppState => {
          console.log(nextAppState);
        this.setState({ appState: nextAppState });
      };

    learnRoad = (lat, lon) => {
        this.setState((prevState, props) => ({
            apiRequests: prevState.apiRequests + 1
        })); 
        const nomUrl = "https://nominatim.openstreetmap.org/reverse?lat=" + 
                          String(lat)+ "&lon=" +  String(lon) 
                          + "&zoom=17&format=json";
                          axios.get(nomUrl).then( (nomResponse) => {
                            const road = nomResponse.data.osm_id;
                            const osmUrl = "https://openstreetmap.org/api/0.6/way/" + road + "/full.json";
                            axios.get(osmUrl).then((osmResponse) => {
                                const roadTags = osmResponse.data.elements.find((element) => element.type === "way").tags;
                                const roadType = roadTags.highway;
                                const roadSpeed = roadTags.maxSpeed;
                                console.log(roadType + " " + roadSpeed);
                                this.setState({lastRoad: {lat: lat, lon:lon, roadType:roadType, roadSpeed:roadSpeed}})
                            }).catch((error) => {
                                console.log(error + ": " + osmUrl);
                                //this.setState({lastRoad: {lat: lat, lon:lon, roadType:"", roadSpeed:""}});
                             });

                          }).catch((error) => {
                              console.log(error + ": " + nomUrl);
                              //this.setState({lastRoad: {lat: lat, lon:lon, roadType:"", roadSpeed:""}});
                            }); 
    }
    checkPosition = (lat1, lon1, lat2, lon2) =>  {
        const deltaLat = (lat2-lat1) * (Math.PI/180); 
        const deltaLon = (lon2-lon1) * (Math.PI/180); 
        const a = 
          Math.pow(Math.sin(deltaLat/2),2) +
          Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * 
          Math.pow(Math.sin(deltaLon/2),2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = 6371 * c; 
        console.log(d);
        return d * 1000 > 30;
      }

    render() {
        return (
            <View style={styles.background}>
                <Text>Welcome</Text>
                <Text>Welcome</Text>
                <Text>Welcome</Text>
                <Text>Welcome</Text>
                <Button title="Start Drive" style={styles.nextButtonSelected} disabled={this.state.startTime? true : false} onPress={() => {
                    KeepAwake.activate();
                    this.setState({startTime: new Date().getTime()});
                    Geolocation.requestAuthorization("always").then((result) => {
                        if(result === "granted") {
            
                            setUpdateIntervalForType(SensorTypes.accelerometer, 250);
                            setUpdateIntervalForType(SensorTypes.gyroscope, 250);
                            const mySensors = combineLatest(accelerometer, gyroscope);
                            this.subscription = mySensors.subscribe( ([accel, gyro]) => {
                            
                                //console.log("started");
                                Geolocation.getCurrentPosition(
                                    (position) => {
                                        if (this.checkPosition(position.coords.latitude, 
                                            position.coords.longitude, this.state.lastRoad.lat, 
                                            this.state.lastRoad.lon)) {
                                                this.learnRoad(position.coords.latitude, position.coords.longitude);
                                        }
                                      this.setState(state => {
                                          const data = state.data.concat({loc: {accuracy: position.coords.accuracy, 
                                        latitude: position.coords.latitude, longitude: position.coords.longitude, 
                                        heading: position.coords.heading, speed: position.coords.speed, 
                                        time: position.timestamp, roadType: this.state.lastRoad.roadType, 
                                        roadSpeed: this.state.lastRoad.roadSpeed}, 
                                            acc: {x: accel.x, y: accel.y, z: accel.z, t: accel.timestamp},
                                            gyro: {x: gyro.x, y: gyro.y, z: gyro.z, t: gyro.timestamp}, phone: {using: this.state.appState}});
                                           
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
                                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 0}
                                ); });
                            
                    }}
                      );
                }}></Button>
                <Button title="Stop Drive" style={styles.nextButtonSelected} disabled={this.state.startTime? false : true} onPress={() => {
                    this.subscription.unsubscribe();
                    KeepAwake.deactivate();
                    this.props.navigation.navigate("Reflection", {data: this.state.data, apiRequests: this.state.apiRequests, startTime: this.state.startTime})
                }}> 
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    logo: {
        width: 150,
        height: 123
    },
    text: {
        fontFamily: "Montserrat",
        color: colors.PDgreen,
        fontWeight: "bold",
        fontSize: 18
    },
    nexttext: {
        fontFamily: "Montserrat",
        color: "#F3F3F5",
        fontWeight: "bold",
        fontSize: 18
    },
    titletext: {
        width: 400,
        height: 44,
        top: 200,
        fontFamily: "Montserrat",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: 50,
        textAlign: "center",
    },
    loginButton: {
        width: 261,
        height: 40,
        top: 506,
        backgroundColor: "#F3F3F5",
        borderColor: "#87B258",
        borderWidth: 1.5,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonUnselected: {
        top: 475,
        width: 261,
        height: 40,
        marginTop: 25,
        backgroundColor: "#F3F3F5",
        borderColor: "#87B258",
        borderWidth: 1.5,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonSelected: {
        top: 475,
        width: 261,
        height: 40,
        marginTop: 25,
        backgroundColor: "rgba(135, 178, 88, 0.2)",
        borderColor: "#87B258",
        borderWidth: 1.5,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",        
    },
    registerButton: {
        width: 261,
        height: 40,
        top: 520,
        backgroundColor: "#F3F3F5",
        borderColor: "#87B258",
        borderWidth: 1.5,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    nextButtonSelected: {
        width: 121,
        height: 40,
        left: 100,
        top: 500,
        backgroundColor: '#87B258',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    backButtonSelected: {
        width: 121,
        height: 40,
        left: -100,
        top: 500,
        backgroundColor: '#87B258',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    nextButtonUnselected: {
        width: 121,
        height: 40,
        left: 207,
        top: 697,
        backgroundColor: '#C4D9B3',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    }, 
    backButtonUnselected: {
        width: 121,
        height: 40,
        left: 207,
        top: 697,
        backgroundColor: '#C4D9B3',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default Drive;