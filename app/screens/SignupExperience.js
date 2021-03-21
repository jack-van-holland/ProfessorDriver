import React, {Component} from "react";
import {StyleSheet, View, Image, Text, TextInput, TouchableHighlight} from "react-native";

import colors from "../config/colors";

const SignupExperience = ({ navigation }) => {
    let [exp, setExp] = React.useState("");

    return (
        <View style={styles.background}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/icon.png")}/>
            </View>

            <View>
                <Text style={styles.titletext}>My driving level is...</Text>
            </View>
            
            <TouchableHighlight onPress={() => {setExp("novice");}}
            style={exp === "novice" ? styles.buttonSelected :styles.buttonUnselected}
            underlayColor="rgba(135, 178, 88, 0.2)">
                <Text style={styles.text}>Novice (less than a month of experience)</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {setExp("beginning")}}
            style={exp === "beginning" ? styles.buttonSelected : styles.buttonUnselected}
            underlayColor="rgba(135, 178, 88, 0.2)">
                <Text style={styles.text}>Beginning (1-6 months of experience)</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="rgba(135, 178, 88, 0.2)"
            onPress={() => {setExp("intermediate")}}
            style={exp === "intermediate" ? styles.buttonSelected : styles.buttonUnselected}>
                <Text style={styles.text}>Intermediate (6-12 months of experience)</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="rgba(135, 178, 88, 0.2)"
            onPress={() => {setExp("advanced")}}
            style={exp === "advanced" ? styles.buttonSelected : styles.buttonUnselected}>
                <Text style={styles.text}>Advanced Driver (More than 12 months of experience)</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => navigation.goBack()}
            style={styles.backButtonSelected}>
                <Text style={styles.nexttext}>Back</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {
                navigation.navigate("SignupContact", {role: "driver", level: exp, child : ""})
            }}
            style={exp ? styles.nextButtonSelected : styles.nextButtonUnselected}>
                <Text style={styles.nexttext}>Next</Text>
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
        top: 100
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
        width: 287,
        height: 44,
        top: 300,
        fontFamily: "Montserrat",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 28,
        lineHeight: 36,
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
        top: 300,
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
        top: 300,
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
        top: 400,
        backgroundColor: '#87B258',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    backButtonSelected: {
        width: 121,
        height: 40,
        left: -100,
        top: 400,
        backgroundColor: '#87B258',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    nextButtonUnselected: {
        width: 121,
        height: 40,
        left: 100,
        top: 400,
        backgroundColor: '#C4D9B3',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    }, 
})

export default SignupExperience;