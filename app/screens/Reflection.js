import React, {Component} from "react";
import {StyleSheet, View, Image, Text, TextInput, TouchableHighlight,} from "react-native";

import colors from "../config/colors";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import sizeof from 'object-sizeof'; 





const Reflection = ({ navigation, route }) => {

    submit = () => {
        const size = sizeof(route.params.data);
        const max = 1000000;
                    if (size > max) {
                        const num = Math.ceil(size / max);
                        const section = Math.floor(route.params.data.length / num);
                        for (let i = 0; i < num; i++) {
                            const doc = firestore().collection('users').doc(auth().currentUser.uid).collection('drives').doc(String(route.params.startTime) + "." + String(i + 1));
                            
                            doc.set({
                            data: route.params.data.slice(i * section, (i + 1) * section), 
                            apiRequests: route.params.apiRequests
                            });
                        }
                    }
                    else { 
                    const doc = firestore().collection('users').doc(auth().currentUser.uid).collection('drives').doc(String(route.params.startTime));

                    doc.set({
                    data: route.params.data, 
                    apiRequests: route.params.apiRequests
                });
            }
            navigation.navigate("StartDrive");
        };

    return (
        <View style={styles.background}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/images/icon.png")}/>
            </View>

            <View style={{flexDirection: "row"}}>
                <View style={{flex: 1, alignItems: "center"}}>
                    <TouchableHighlight onPress={submit}
                    style={ styles.nextButtonSelected}>
                        <Text style={styles.nexttext}>Submit Drive</Text>
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
        backgroundColor: "rgba(135, 178, 88, 0.2)",
        borderColor: "#87B258",
        borderWidth: 1.5,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",        
    },
    input: {
        fontFamily: "Montserrat",
        top: 300,
        fontWeight: "bold",
        fontSize: 20, 
        lineHeight: 20,
        letterSpacing: 0.015,
        height: 40,
        color: "#76AD87",
        backgroundColor: "#ECECEC",
        margin: 12,
        borderWidth: 0,
        paddingHorizontal: 20,
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
        top: 350,
        backgroundColor: '#87B258',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    backButtonSelected: {
        width: 121,
        height: 40,
        top: 350,
        backgroundColor: '#87B258',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    nextButtonUnselected: {
        width: 121,
        height: 40,
        top: 350,
        backgroundColor: '#C4D9B3',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    }, 
})

export default Reflection;