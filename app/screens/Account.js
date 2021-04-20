import React, {Component} from "react";
import {StyleSheet, View, Image, Text, TextInput, TouchableHighlight} from "react-native";

import QRCode from 'react-native-qrcode-svg';
import colors from "../config/colors";
import auth from '@react-native-firebase/auth';


const Account = ({ navigation }) => {


    return (
        <View style={[styles.container, {flex:1, justifyContent:"space-between", alignItems:"center", alignContent: "center"}]}>
            <View style={{paddingTop:100, flex:1, justifyContent:"space-evenly"}}>
                <Text style={styles.title}>Account</Text>
            </View>
            
            <View style={{justifyContent:"center"}}>
            <QRCode
            value={auth().currentUser.uid}
            logo={require("../assets/images/icon.png")}
            />
            </View>
            <View style={{flex:1}}>
            <Text style={styles.text}> If you are learning with parent or coach, 
                show them this code when they are creating an account. 
                This will give them access to view your driving performance.  </Text>
            </View>
            <View style={{flex:1}}>
            <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" onPress={() => 
            {auth().signOut().then(() => {navigation.reset({index: 0,routes: [{name: 'WelcomeScreen'}],});}); }}
            style={styles.backButtonSelected}>
                <Text style={styles.nexttext}>Logout</Text>
            </TouchableHighlight>
            </View>
            <View style={{flex: 0, flexDirection:"row"}}>
            <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                 onPress={() => {navigation.reset({index: 0,routes: [{name: 'Home'}],});}} style={styles.startButton}>
                    <View>
                    <Image style={styles.image} source={require("../assets/images/home.png")}></Image>
                    <Text style={styles.startText}>Home</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                 onPress={() => {navigation.reset({index: 0,routes: [{name: 'ReportsMain'}],});}} style={styles.startButton}>
                    <View>
                    <Image style={styles.image} source={require("../assets/images/chart.png")}></Image>
                    <Text style={styles.startText}>Reports</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                onPress={() => {navigation.navigate("Checklist");}} style={styles.startButton}>
                  <View>
                  <Image style={styles.image} source={require("../assets/images/turning.png")}></Image>
                  <Text style={styles.startText}>Drive</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                onPress={() => {navigation.navigate("Log")}} style={styles.startButton}>
                <View>
                  <Image style={styles.image} source={require("../assets/images/diary.png")}></Image>
                  <Text style={styles.startText}>Log</Text>
                </View>
                </TouchableHighlight>
                <TouchableHighlight disabled={true} underlayColor="rgba(95, 128, 59, .5)"
                onPress={() => {navigation.reset({index: 0,routes: [{name: 'Account'}],});}} style={styles.startButtonSelected}>
                <View>
                  <Image style={styles.image} source={require("../assets/images/account.png")}></Image>
                  <Text style={styles.startText}>Account</Text>
                </View>
                </TouchableHighlight>
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
    backButtonSelected: {
        backgroundColor: "#C4D9B3",
        borderRadius:15,
        flex: 0,
        paddingVertical: 20,
        paddingHorizontal: 50,
        justifyContent: "center"
    },
    nexttext: {
        fontFamily: "Montserrat",
        color: "#F3F3F5",
        fontWeight: "bold",
        fontSize: 28
    },
    title: {
        fontFamily: "Montserrat",
        color: "black",
        fontWeight: "bold",
        fontSize: 38,
        paddingTop: 10,
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        flex: 1,
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
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
      },
    logo: {
        width: 150,
        height: 123
    },
    container: {
        backgroundColor: "white",
        borderRadius: 19,
        alignItems: "center",
        //justifyContent: "center"
  },
  text: {
    fontFamily: "Montserrat",
    color: "black",
    fontSize: 22,
    paddingTop: 10,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal:25,
  
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
        top: 500,
        backgroundColor: '#87B258',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    nextButtonUnselected: {
        width: 121,
        height: 40,
        left: 207,
        top: 697,
        backgroundColor: '#C4D9B3',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    }, 
    backButtonUnselected: {
        width: 121,
        height: 40,
        left: 207,
        top: 697,
        backgroundColor: '#C4D9B3',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    startButton: {
        backgroundColor: "#C4D9B3",
        borderRightColor: "#F3F3F5",
        borderLeftColor: "#F3F3F5",
        borderTopColor:"#F3F3F5",
        borderBottomColor:"#C4D9B3",
        paddingBottom: 15,
        paddingTop:15,
        flex: 1,
        borderWidth: 1,
        height: 90, 
        alignItems: "center", 
        justifyContent: "center"
    },
    startButtonSelected: {
        backgroundColor: "rgba(95, 128, 59,255)",
        borderRightColor: "#F3F3F5",
        borderLeftColor: "#F3F3F5",
        borderTopColor:"#F3F3F5",
        borderBottomColor:"rgba(95, 128, 59, 255)",
        paddingBottom: 15,    
        paddingTop:15,
        flex: 1,
        borderWidth: 1,
        height: 90, 
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
})

export default Account;