import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Button, TouchableHighlight } from "react-native";

import colors from "../config/colors";

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const StartDrive = ({ navigation }) => {


    // read report from db
    const [user, setUser] = useState("");
    const { uid } = auth().currentUser;

    const getUser = async () => {
        try {
            const documentSnapshot = await firestore()
                .collection('users')
                .doc(uid)
                .get();

            const userData = documentSnapshot.data();
            setUser(userData);
        } catch {
            //do whatever
        }
    };

    // Get user on mount
    useEffect(() => {
        getUser();
    }, []);


    return (
        <View style={styles.background}>
            <View style={{ flex: 7, padding: 20 }}>
                <View style={{ flex: 1 }} />
                <View style={[styles.container, { flex: 9 }]}>
                    <Text style={styles.title}>Before You Drive</Text>
                    <Text style={styles.note}>“Here is a quick reminder of your reflection from last time”</Text>
                    <Text> {user ? user.email : ""} </Text>
                </View>
                <View style={{ flex: 1 }} />
                <View style={[styles.container, { flex: 4 }]}>
                    <Text style={styles.title}>  Select Your Desired{"\n"}Practice Environment</Text>
                </View>
                <View style={{ flex: .5 }} />
            </View>

            <View style={[styles.startContainer, { flex: 1 }]}>
                <TouchableHighlight onPress={() => { navigation.navigate("Drive") }} style={styles.startButton}>
                    <Text style={styles.startText}>OK, ready to drive!</Text>
                </TouchableHighlight>
            </View>

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
        justifyContent: "center"
    },
    title: {
        fontFamily: "Montserrat",
        color: "black",
        fontWeight: "bold",
        fontSize: 22,
        paddingTop: 10
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

export default StartDrive;