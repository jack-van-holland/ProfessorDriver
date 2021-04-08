import React, {Component, useEffect} from "react";
import {StyleSheet, View, Image, Text, Button, TouchableHighlight} from "react-native";

import colors from "../../config/colors";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


//function WelcomeScreen(props) 
const WelcomeScreen = ({ navigation }) => {
    useEffect(() => {
        if (auth().currentUser) {
            firestore().collection('users').doc(auth().currentUser.uid).get().then((userInfo) => {
                if (userInfo.role = "parent") {
                    navigation.navigate("ParentHome");
                } else {
                    navigation.navigate("Home");
                }
            })
        }
    });
    return (
        <View style={styles.background}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../../assets/images/icon.png")}/>
                <Text style={styles.name}>Professor Driver</Text>
            </View>
            <TouchableHighlight onPress={() => navigation.navigate('Login')}
            style={styles.loginButton} underlayColor="rgba(135, 178, 88, 0.2)">
                    <Text style={styles.text}>Sign In</Text>
            </TouchableHighlight>
            
            <TouchableHighlight style={styles.registerButton} 
            onPress={() => navigation.navigate('SignupRole')}
            underlayColor="rgba(135, 178, 88, 0.2)">
                <Text style={styles.text}>Sign Up</Text>
            </TouchableHighlight>
        </View>
    );
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

export default WelcomeScreen;