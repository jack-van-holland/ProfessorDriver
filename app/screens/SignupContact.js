import React, {Component} from "react";
import {StyleSheet, View, Image, Text, TextInput, TouchableHighlight,} from "react-native";

import colors from "../config/colors";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';





const SignupContact = ({ navigation, route }) => {

    let [firstName, setFirstName] = React.useState("");
    let [lastName, setLastName] = React.useState("");
    let [email, setEmail] = React.useState("");
    let [password, setPassword] = React.useState("");
    let [confirmPassword, setConfirmPassword] = React.useState("");

    submit = () => {
        if (password !== confirmPassword) {
            return;
        }

        auth().createUserWithEmailAndPassword(email, password)
        .then((userCred) => {
                firestore().collection('users').doc(userCred.user.uid)
                .set({
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    role: route.params.role,
                    level: route.params.level,
                    child: route.params.child,
                });
            }).then(() => {
            console.log('User account created & signed in!');
            console.log(auth().currentUser.uid);
            console.log(firstName);
            console.log(lastName);
            console.log(password);
            console.log(email);
            console.log(route.params.role);
            console.log(route.params.level);
            console.log(route.params.child);
            navigation.navigate("Home");
        })
    .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }
        
            console.error(error);
        });
    };

    return (
        <View style={styles.background}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/icon.png")}/>
            </View>

            <View>
                <Text style={styles.titletext}>Almost done...</Text>
                <TextInput style={styles.input} value={firstName} onChangeText={setFirstName}
                placeholder = "First Name" placeholderTextColor="#C4D9B3"
                autoCompleteType="name" ></TextInput>
                <TextInput style={styles.input} value={lastName} onChangeText={setLastName}
                placeholder = "Last Name" placeholderTextColor="#C4D9B3"
                autoCompleteType="name" ></TextInput>
                <TextInput style={styles.input} value={email} onChangeText={setEmail}
                placeholder = "Email" autoCapitalize = {false} keyboardType="email-address"
                autoCompleteType="email" placeholderTextColor="#C4D9B3"></TextInput>
                <TextInput style={styles.input} value={password} secureTextEntry={true}
                onChangeText={setPassword} placeholder = "Password" placeholderTextColor="#C4D9B3"
                autoCapitalize = {false} autoCompleteType="password"></TextInput>
                <TextInput style={styles.input} value={confirmPassword} secureTextEntry={true}
                onChangeText={setConfirmPassword} placeholder = "Confirm Password"
                autoCapitalize = {false} placeholderTextColor="#C4D9B3"></TextInput>
            </View>

            <TouchableHighlight onPress={() => navigation.goBack()} style={styles.backButtonSelected}>
                <Text style={styles.nexttext}>Back</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={submit}
            disabled={firstName && lastName && email && password && confirmPassword ? false : true}
            style={firstName && lastName && email && password && confirmPassword ? styles.nextButtonSelected : styles.nextButtonUnselected}
            >
                <Text style={styles.nexttext}>Submit</Text>
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

export default SignupContact;