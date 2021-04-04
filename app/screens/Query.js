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
  


class Query extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
       let drive = await firestore().collection("users").doc(auth().currentUser.uid).collection("drives").doc("1617155166165.1").get();
        console.log(drive._data.data);
    }
    
    
  
    render() {
        return (
            <View>
                <Text>Welcome</Text>
                </View>);
}

}

export default Query;