import React, {Component} from "react";
import {StyleSheet, View, Image, Text, TextInput, TouchableHighlight} from "react-native";

import colors from "../config/colors";

const SignupScreen = ({ navigation, goBack }) => {

    const _onPressButton = () => {
        alert('You tapped the button!')
    }

    return (
        <View style={styles.background}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/icon.png")}/>
                <Text style={styles.name}>Professor Driver</Text>
            </View>

                <View style={styles.loginButton}>
                    <TextInput />
                </View>

            
            <TouchableHighlight onPress={_onPressButton}>
            <View style={styles.registerButton}>
                <Text style={styles.text}>Sign Up</Text>
            </View>
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
        justifyContent: "center"
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

export default SignupScreen;