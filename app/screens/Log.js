import React, { useState, useEffect } from 'react';
import {StyleSheet, View, ScrollView, Text, Button, TouchableHighlight} from "react-native";

import colors from "../config/colors";

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const Log = ({ navigation }) => {

    // read report from db
    const [userHistory, setUserHistory] = useState();
    const {uid} = auth().currentUser;

    const getUserHistory = async () => {
        try {
        const snap = await firestore()
            .collection(`users/${uid}/drives`)
            .get();
        var userHistoryData = [];
        snap.forEach(doc => {
            if (doc.id.includes(".")) {
                if (doc.id.includes(".1"))
                    userHistoryData.push(doc.id.replace(".1", ""))
            } else
                userHistoryData.push(doc.id)
            // console.log(doc.id, '=>', doc.data());
        });
        setUserHistory(userHistoryData.reverse());
        } catch {
            console.error("cant access firestore");
        }
    };

    useEffect(() => {
        getUserHistory();
    }, []);

    toReport = (timestamp) => {
        navigation.navigate("LogStats", {
            timestamp: timestamp,
        });
    };

    return (
        <View style={styles.background}>
            <View style={{flex: 7, padding:15}}>
                <View style={{flex: 0.5}} />
                <View style={[styles.container, {flex: 10}]}>
                        <Text style={styles.title}>Drive Log</Text>

                    <ScrollView contentContainerStyle={{alignItems: "center", justifyContent: "center"}}>
                        {userHistory 
                            ? userHistory.map((item)=>(
                                <View key={item}>
                                <TouchableHighlight style={styles.historyContainer}
                                onPress={() => toReport(item)}>
                                <Text style={styles.historyText}>
                                    {new Date(item * 1).toUTCString()}
                                 </Text>
                                </TouchableHighlight>
                                <View style={{paddingTop: 6}}></View>
                                </View>
                                )) 
                            : <Text>Loading Log...</Text>}
                    </ScrollView>
                </View>
            </View>

            {/* FIXME add bar ??*/}

        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#E5E5E5",
        flexDirection: "column",
    },
    container: {
        backgroundColor: "white",
        borderRadius: 19,
        alignItems: "center",
        //justifyContent: "center"
    },
    startContainer: {
        backgroundColor: "white", 
        alignItems: "center", 
        justifyContent: "center",
    }, 
    title: {
        fontFamily: "Montserrat",
        color: "black",
        fontWeight: "bold",
        fontSize: 30,
        paddingTop: 10
    },
    note: {
        fontFamily: "Montserrat-Italic",
        color: "black",
        fontSize: 18,
        paddingTop: 5
    },
    historyContainer: {
        backgroundColor: "white",
        width: 300,
        borderRadius: 5,
        borderColor: colors.PDgreen,
        borderWidth: 1,
        alignItems: "center",
        //paddingTop: 10
    },
    historyText: {
        fontFamily: "Montserrat",
        color: "black",
        fontSize: 18,
        //paddingTop: 10
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
        color: colors.PDgreen,
        fontWeight: "bold",
        fontSize: 18
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
    }
})

export default Log;