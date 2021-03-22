import React, {Component} from "react";
import {StyleSheet, View, Image, Text, TextInput, TouchableHighlight,} from "react-native";
import auth from '@react-native-firebase/auth';

import colors from "../config/colors";

const Login = ({ navigation }) => {
    
    submit = () => {
        console.log("beginning login");
        auth().signInWithEmailAndPassword(email, password).then(() => {
            console.log("logged in");
            navigation.navigate("Home");
        }).catch((error) => {console.log("fail"); console.error(error);});
        
    };

    let [email, setEmail] = React.useState("");
    let [password, setPassword] = React.useState("");

    return (
        <View style={styles.background}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/icon.png")}/>
            </View>

            <View>
                <Text style={styles.titletext}>Sign In</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail}
                placeholder = "Email" autoCapitalize = {false} keyboardType="email-address"
                autoCompleteType="email" placeholderTextColor="#C4D9B3"></TextInput>
                <TextInput style={styles.input} value={password} secureTextEntry={true}
                onChangeText={setPassword} placeholder = "Password" placeholderTextColor="#C4D9B3"
                autoCapitalize = {false} autoCompleteType="password"></TextInput>
            </View>

            <TouchableHighlight onPress={() => navigation.goBack()} style={styles.backButtonSelected}>
                <Text style={styles.nexttext}>Back</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={submit}
            disabled={email && password ? false : true}
            style={email && password ? styles.nextButtonSelected : styles.nextButtonUnselected}
            >
                <Text style={styles.nexttext}>Sign In</Text>
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
        left: 100,
        top: 350,
        backgroundColor: '#87B258',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    backButtonSelected: {
        width: 121,
        height: 40,
        left: -100,
        top: 350,
        backgroundColor: '#87B258',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    nextButtonUnselected: {
        width: 121,
        height: 40,
        left: 100,
        top: 350,
        backgroundColor: '#C4D9B3',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    }, 
})

export default Login;