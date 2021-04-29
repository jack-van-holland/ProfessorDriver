import React, {Component, useEffect} from "react";
import {StyleSheet, View, Image, Text, TextInput, TouchableHighlight} from "react-native";

import colors from "../../config/colors";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const ScanConfirm = ({ navigation, route }) => {
    let [childUser, setChildUser] = React.useState(null);
    let [parent, setParent] = React.useState(false);
    let [coach, setCoach] = React.useState(false);



    let sendRequest = (childName, childId, role) => {
        firestore().collection('users').doc(auth().currentUser.uid).update({
            pendingReqs: firestore.FieldValue.arrayUnion({role: role, id: childId, name: childName})
        }).then(() => {
            firestore().collection('users').doc(auth().currentUser.uid).get().then((data) => {
                firestore().collection('users').doc(childId).update({
                    parentReqs: firestore.FieldValue.arrayUnion({role: role, id: auth().currentUser.uid, 
                        name: data._data.firstName + " " + data._data.lastName})
                }).then(() => {
                    navigation.navigate("ParentAccount");
                });

            });
            });
    };


    useEffect( () => {
    firestore().collection('users').doc(route.params.child).get().then((child) => {setChildUser(child);}).catch((error) => {navigation.goBack();});
    });
    return (
        !childUser ? (<View></View>) : (childUser._data ? 
        (<View style={[styles.background, {flex:1}]}>
            
            <View style={{flex:.25, paddingTop:50}}>
                <Text style={styles.titletext}>Your student:</Text>
                <Text style={styles.titletext}>{childUser._data.firstName + " " + childUser._data.lastName}</Text>
                <Text style={styles.titletext}>{childUser._data.email}</Text>
            </View>

            <Text style={styles.titletext}>Select your access level: </Text>

            <TouchableHighlight onPress={() => {setCoach(true); setParent(false);}}
            style={coach ? styles.buttonSelected :styles.buttonUnselected}
            underlayColor="rgba(135, 178, 88, 0.2)">
                <Text style={styles.text}>View Access (select for most coaches)</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {setParent(true); setCoach(false);}}
            style={parent ? styles.buttonSelected :styles.buttonUnselected}
            underlayColor="rgba(135, 178, 88, 0.2)">
                <Text style={styles.text}>Parental Control (select for most parents)</Text>
            </TouchableHighlight>
            <View style={{flexDirection:"row", flex:1}}>
            <TouchableHighlight onPress={() => {navigation.goBack(); route.params.onGoBack();}}
            style={styles.backButtonSelected}>
                <Text style={styles.nexttext}>Rescan</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {
                sendRequest(childUser._data.firstName + " " + childUser._data.lastName, route.params.child, parent ? "parent" : "coach");}
            }
            style={styles.nextButtonSelected}>
                <Text style={styles.nexttext}>Request</Text>
            </TouchableHighlight>
            </View>
        </View>) : <View style={styles.background}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../../assets/images/icon.png")}/>
                <Text style={styles.name}>Whoops, something went wrong with the scan.</Text>
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
        textAlign:"center",
        fontWeight: "bold",
        fontSize: 33, 
        padding:20
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
        fontFamily: "Montserrat",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 28,
        textAlign: "center",
        flex:0,
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
        backgroundColor: "#F3F3F5",
        borderColor: "#87B258",
        borderWidth: 1.5,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        height:50,
    },
    buttonSelected: {
        height:50,
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
        height: 40,
        paddingHorizontal:20,
        marginHorizontal:20,
        backgroundColor: '#87B258',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flex: 0,
    },
    backButtonSelected: {
        height: 40,
        paddingHorizontal:20,
        marginHorizontal:20,
        backgroundColor: '#87B258',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flex: 0,
    },
    nextButtonUnselected: {
        width: 121,
        height: 40,
        top: 400,
        backgroundColor: '#C4D9B3',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    }, 
})

export default ScanConfirm;