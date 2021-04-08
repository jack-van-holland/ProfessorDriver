import React, {Component} from "react";
import {StyleSheet, View, Image, Text, TextInput, TouchableHighlight} from "react-native";

import colors from "../../config/colors";

const SignupRole = ({ navigation }) => {
    const [driver, setDriver] = React.useState(false);
    const [parent, setParent] = React.useState(false);


    return (
        <View style={styles.background}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../../assets/images/icon.png")}/>
            </View>

            <View>
                <Text style={styles.titletext}>I am a...</Text>
            </View>
            
            <TouchableHighlight underlayColor="rgba(135, 178, 88, 0.2)"
            style={driver ? styles.buttonSelected :styles.buttonUnselected}
            onPress={() => {setParent(false); setDriver(true);}}>
                <Text style={styles.text}>learning driver</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="rgba(135, 178, 88, 0.2)"
            style={parent ? styles.buttonSelected :styles.buttonUnselected}
            onPress={() => {setParent(true); setDriver(false);}}>
                <Text style={styles.text}>parent or coach</Text>
            </TouchableHighlight>

            <View style={{flexDirection: "row"}}>

            <View style={{flex: 1, alignItems: "center"}}>
                <TouchableHighlight underlayColor="rgba(135, 178, 88, 0.2)"
                style={styles.backButtonSelected}
                onPress={() => navigation.goBack()}>
                    <Text style={styles.nexttext}>Back</Text>
                </TouchableHighlight>
            </View>

            <View style={{flex: 1, alignItems: "center"}}>
                <TouchableHighlight underlayColor="rgba(135, 178, 88, 0.2)"
                style={parent || driver ? styles.nextButtonSelected : styles.nextButtonUnselected}
                onPress={driver ? () => navigation.navigate("SignupExperience") : () => navigation.navigate("SignupParent")} 
                disabled={parent || driver ? false : true}>
                    <Text style={styles.nexttext}>Next</Text>
                </TouchableHighlight>
            </View>
            
            </View>
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
    nexttext: {
        fontFamily: "Montserrat",
        color: "#F3F3F5",
        fontWeight: "bold",
        fontSize: 18
    },
    titletext: {
        width: 287,
        height: 44,
        top: 475,
        fontFamily: "Montserrat",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 36,
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
        backgroundColor: "rgba(135, 178, 88, 0.4)",
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
        top: 550,
        backgroundColor: '#87B258',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    backButtonSelected: {
        width: 121,
        height: 40,
        top: 550,
        backgroundColor: '#87B258',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    nextButtonUnselected: {
        width: 121,
        height: 40,
        top: 550,
        backgroundColor: '#C4D9B3',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    }, 
})

export default SignupRole;