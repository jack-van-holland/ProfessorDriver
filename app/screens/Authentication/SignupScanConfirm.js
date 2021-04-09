import React, {Component, useEffect} from "react";
import {StyleSheet, View, Image, Text, TextInput, TouchableHighlight} from "react-native";

import colors from "./../../config/colors";
import firestore from '@react-native-firebase/firestore';


const SignupScanConfirm = ({ navigation, route }) => {
    let [childUser, setChildUser] = React.useState(null);

    useEffect( () => {
    firestore().collection('users').doc(route.params.child).get().then((child) => {setChildUser(child);}).catch((error) => {navigation.goBack();});
    });
    return (
        !childUser ? (<View></View>) : (childUser._data ? 
        (<View style={styles.background}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('./../../assets/images/icon.png')}/>
            </View>
            
            <View>
                <Text style={styles.titletext}>Is this your student?</Text>
                <Text style={styles.titletext}>{childUser._data.firstName + " " + childUser._data.lastName}</Text>
                <Text style={styles.titletext}>{childUser._data.email}</Text>
            </View>
            
            <TouchableHighlight onPress={() => {navigation.goBack(); route.params.onGoBack();}}
            style={styles.backButtonSelected}>
                <Text style={styles.nexttext}>No, scan again</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {
                navigation.navigate("SignupContact", {role: "parent", level: "", child: route.params.child})
            }}
            style={styles.nextButtonSelected}>
                <Text style={styles.nexttext}>Yes, continue</Text>
            </TouchableHighlight>
        </View>) : <View style={styles.background}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../../assets/images/icon.png")}/>
            </View>
            
            <View>
                <Text style={styles.titletext}>Whoops, something went wrong with the scan.</Text>
            </View>
            
            <TouchableHighlight onPress={() => {navigation.goBack(); route.params.onGoBack();}}
            style={styles.backButtonSelected}>
                <Text style={styles.nexttext}>Retry</Text>
            </TouchableHighlight>
        </View>)

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

export default SignupScanConfirm;