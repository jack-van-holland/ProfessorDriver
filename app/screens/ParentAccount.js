import React, {Component} from "react";
import {StyleSheet, View, Image, Text, TextInput, TouchableHighlight, ScrollView} from "react-native";

import QRCode from 'react-native-qrcode-svg';
import colors from "../config/colors";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


class ParentAccount extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.load();
    }

    load = () => {
        firestore().collection('users').doc(auth().currentUser.uid).get().then((data) => {
            const childNames = [];
            console.log(data);
            if (data._data.children.length) {
            for (let i = 0; i < data._data.children.length; i++) {
                firestore().collection('users').doc(data._data.children[i].child).get().then((child) => {
                    childNames.push(child._data.firstName + " " + child._data.lastName);
                    this.setState({children: childNames});
                });
            }} else {
                this.setState({children: childNames});
            }
            const pendingReqs = [];
            //console.log(data._data.parentReqs);
            if (data._data.pendingReqs.length) {
                for (let i = 0; i < data._data.pendingReqs.length; i++) {
                    pendingReqs.push(data._data.pendingReqs[i]);
                    this.setState({requests:pendingReqs});
                }
            } else {
                this.setState({requests: []})
            }
        });
    }

    approveRequest = (request) => {
        firestore().collection('users').doc(request.id).get().then( (parentData) => {
        let parentRequest = parentData._data.pendingReqs.find(req => req.id === auth().currentUser.uid);
        firestore().collection('users').doc(auth().currentUser.uid).update({
            parents: firestore.FieldValue.arrayUnion(request.id),
            parentReqs: firestore.FieldValue.arrayRemove(request),
        }).then( () => {
            firestore().collection('users').doc(request.id).update( {
                pendingReqs: firestore.FieldValue.arrayRemove(parentRequest),
                children: firestore.FieldValue.arrayUnion({child: auth().currentUser.uid, role: request.role}),
                currentChild: auth().currentUser.uid,
            });
            this.load();
        }
        );
    });
    };

    denyRequest = (request) => {
        firestore().collection('users').doc(request.id).get().then( (parentData) => {
        let parentRequest = parentData._data.pendingReqs.find(req => req.id === auth().currentUser.uid);
        firestore().collection('users').doc(auth().currentUser.uid).update({
            parentReqs: firestore.FieldValue.arrayRemove(request),
        }).then( () => {
            firestore().collection('users').doc(request.id).update( {
                pendingReqs: firestore.FieldValue.arrayRemove(parentRequest),
            });
            this.load();
        }
        );
    });
    };
    render() {
    return (
        <View style={[styles.container, {flex:1, justifyContent:"space-between", alignItems:"center", alignContent: "center"}]}>
            
            
            <View style={{height: 200, paddingTop:50}}>
                <Text style={styles.subtitle}>Your Pending Student Requests</Text>
                <ScrollView>
                {this.state.requests 
                            ? this.state.requests.length ? this.state.requests.map((item)=>(
                                <View style={[styles.historyContainer, ]} key={item.id}>

                                
                                <Text style={[styles.historyText, {flex:1, paddingLeft:10, paddingVertical:10}]}>
                                    {"You've requested " + (item.role === "parent" ? "parental control" : "view access") + " for: "}
                                 </Text>
                                 <Text style={[styles.historyText, {flex:1}]}>
                                    {item.name}
                                 </Text>
                                <View style={{paddingTop: 6}}></View>
                                </View>
                                )) 
                            : <Text style={[styles.historyText, {textAlign:"center", paddingHorizontal:20}]}>No pending requests right now. Click to add a student.</Text> 
                            : <Text style={[styles.historyText, {textAlign:"center", paddingHorizontal:20}]}>Loading requests...</Text> }
                </ScrollView>
            </View>
            <View style={{flex:.5}}>
            <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" onPress={() => 
            {this.props.navigation.navigate("Scan");}}
            style={styles.backButtonSelected}>
                <Text style={styles.nexttext}>Add a Student</Text>
            </TouchableHighlight>
            </View>
            <View style={{height: 300}}>
                <Text style={styles.subtitle}>Your Students</Text>
                <ScrollView>
                {this.state.children 
                            ? this.state.children.length ? this.state.children.map((item)=>(
                                <View style={styles.historyContainer} key={item}>
                                <Text style={[styles.historyText, {fontWeight: "bold"}]}>
                                    {item}
                                 </Text>
                                 <Text style={[styles.historyText,]}>
                                    Actions
                                 </Text>
                                <View style={{paddingTop: 6}}></View>
                                </View>
                                )) 
                            : <Text style={[styles.historyText, {textAlign:"center", paddingHorizontal:20}]}>No students added yet. Add a student above.</Text> 
                            : <Text style={[styles.historyText, {textAlign:"center", paddingHorizontal:20}]}>Loading students...</Text> }
                </ScrollView>
            </View>
            
            <View style={{flex:.5}}>
            <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" onPress={() => 
            {this.load();}}
            style={styles.backButtonSelected}>
                <Text style={styles.nexttext}>Refresh</Text>
            </TouchableHighlight>
            </View>
            <View style={{flex:.5}}>
            <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" onPress={() => 
            {auth().signOut().then(() => {this.props.navigation.reset({index: 0,routes: [{name: 'WelcomeScreen'}],});}); }}
            style={styles.backButtonSelected}>
                <Text style={styles.nexttext}>Logout</Text>
            </TouchableHighlight>
            </View>
            <View style={{flex: 0, flexDirection:"row"}}>
            <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                 onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'ParentHome'}],});}} style={styles.startButton}>
                    <View>
                    <Image style={styles.image} source={require("../assets/images/home.png")}></Image>
                    <Text style={styles.startText}>Home</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                 onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'ParentReportsMain'}],});}} style={styles.startButton}>
                    <View>
                    <Image style={styles.image} source={require("../assets/images/chart.png")}></Image>
                    <Text style={styles.startText}>Reports</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight disabled={true} underlayColor="rgba(95, 128, 59, .5)"
                onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'ParentAccount'}],});}} style={styles.startButtonSelected}>
                <View>
                  <Image style={styles.image} source={require("../assets/images/account.png")}></Image>
                  <Text style={styles.startText}>Account</Text>
                </View>
                </TouchableHighlight>
            </View>
        </View>
    );
}
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
        paddingVertical: 10,
        paddingHorizontal: 50,
        justifyContent: "center"
    },
    approveButton: {
        backgroundColor: "rgba(95, 128, 59,255)",
        borderRadius:15,
        flex: 0,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        justifyContent: "center"
    },
    denyButton: {
        backgroundColor: "#E60000",
        borderRadius:15,
        flex: 0,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        justifyContent: "center"
    },
    approveText: {
        fontFamily: "Montserrat",
        color: "#F3F3F5",
        fontWeight: "bold",
        fontSize: 15
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
    subtitle: {
        fontFamily: "Montserrat",
        color: "black",
        fontWeight: "bold",
        fontSize: 22,
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
    },historyContainer: {
        backgroundColor: "white",
        width: 350,
        borderRadius: 5,
        borderColor: colors.PDgreen,
        borderWidth: 1,
        alignItems: "center",
        //paddingTop: 10
    },
    historyText: {
        fontFamily: "Montserrat",
        color: "black",
        fontSize: 18,
        //paddingTop: 10
    },
})

export default ParentAccount;