import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TextInput, TouchableHighlight, ScrollView } from "react-native";

import QRCode from 'react-native-qrcode-svg';
import colors from "../config/colors";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


class Account extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        firestore().collection('users').doc(auth().currentUser.uid).get().then((userData) => {
            if (userData._data.newReport) {
              Alert.alert("New Driving report available!");
              this.props.navigation.navigate("EndDrive", {startDrive: userData._data.newReport});
              return;
            }
            else {
        this.load();
    }});
    }

    load = () => {
        firestore().collection('users').doc(auth().currentUser.uid).get().then((data) => {
            const parentNames = [];
            console.log(data);
            if (data._data.parents.length) {
                for (let i = 0; i < data._data.parents.length; i++) {
                    firestore().collection('users').doc(data._data.parents[i]).get().then((parent) => {
                        parentNames.push(parent._data.firstName + " " + parent._data.lastName);
                        this.setState({ parents: parentNames });
                    });
                }
            } else {
                this.setState({ parents: parentNames });
            }
            const parentReqs = [];
            //console.log(data._data.parentReqs);
            if (data._data.parentReqs.length) {
                for (let i = 0; i < data._data.parentReqs.length; i++) {
                    parentReqs.push(data._data.parentReqs[i]);
                    this.setState({ requests: parentReqs });
                }
            } else {
                this.setState({ requests: [] })
            }
        });
    }

    approveRequest = (request) => {
        firestore().collection('users').doc(request.id).get().then((parentData) => {
            let parentRequest = parentData._data.pendingReqs.find(req => req.id === auth().currentUser.uid);
            firestore().collection('users').doc(auth().currentUser.uid).update({
                parents: firestore.FieldValue.arrayUnion(request.id),
                parentReqs: firestore.FieldValue.arrayRemove(request),
            }).then(() => {
                firestore().collection('users').doc(request.id).update({
                    pendingReqs: firestore.FieldValue.arrayRemove(parentRequest),
                    children: firestore.FieldValue.arrayUnion({ child: auth().currentUser.uid, role: request.role }),
                    currentChild: auth().currentUser.uid,
                });
                this.load();
            }
            );
        });
    };

    denyRequest = (request) => {
        firestore().collection('users').doc(request.id).get().then((parentData) => {
            let parentRequest = parentData._data.pendingReqs.find(req => req.id === auth().currentUser.uid);
            firestore().collection('users').doc(auth().currentUser.uid).update({
                parentReqs: firestore.FieldValue.arrayRemove(request),
            }).then(() => {
                firestore().collection('users').doc(request.id).update({
                    pendingReqs: firestore.FieldValue.arrayRemove(parentRequest),
                });
                this.load();
            }
            );
        });
    };
    render() {
        return (
            <View style={[styles.container, { flex: 1, justifyContent: "space-between", alignItems: "center", alignContent: "center" }]}>

                <View style={{ justifyContent: "center", paddingTop: 50 }}>
                    <QRCode
                        value={auth().currentUser.uid}
                        logo={require("../assets/images/icon.png")}
                    />
                </View>
                <View style={{ flex: .5 }}>
                    <Text style={styles.text}>Show your parent or coach this code to link your accounts.</Text>
                </View>
                <View style={{ height: 200 }}>
                    <Text style={styles.subtitle}>Your Link Requests</Text>
                    <ScrollView>
                        {this.state.requests
                            ? this.state.requests.length ? this.state.requests.map((item) => (
                                <View style={[styles.historyContainer, { flexDirection: "row" }]} key={item.id}>
                                    <View style={[{ flexDirection: "column", flex: 1, alignItems: "center" }]}>

                                        <Text style={[styles.historyText, { flex: 1, paddingLeft: 10, paddingVertical: 10 }]}>
                                            {item.name + " is requesting: "}
                                        </Text>
                                        <Text style={[styles.historyText, { fontWeight: "bold", flex: 1, paddingLeft: 10, paddingVertical: 10 }]}>
                                            {item.role === "parent" ? "parental control" : "view access"}
                                        </Text>
                                    </View>
                                    <TouchableHighlight style={[styles.approveButton, { flex: 0 }]} onPress={() => { this.approveRequest(item); }}>
                                        <View>
                                            <Text style={styles.approveText}>
                                                Approve
                                        </Text>
                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={[styles.denyButton, { flex: 0 }]} onPress={() => { this.denyRequest(item); }}>
                                        <View>
                                            <Text style={styles.approveText}>
                                                Deny
                                        </Text>
                                        </View>
                                    </TouchableHighlight>
                                    <View style={{ paddingTop: 6 }}></View>
                                </View>
                            ))
                                : <Text style={[styles.historyText, { textAlign: "center", paddingHorizontal: 20 }]}>No link requests right now. Click refresh if you think there should be one!</Text>
                            : <Text style={[styles.historyText, { textAlign: "center", paddingHorizontal: 20 }]}>Loading requests...</Text>}
                    </ScrollView>
                </View>
                <View style={{ height: 200 }}>
                    <Text style={styles.subtitle}>Your Coaches</Text>
                    <ScrollView>
                        {this.state.parents
                            ? this.state.parents.length ? this.state.parents.map((item) => (
                                <View style={styles.historyContainer} key={item}>
                                    <Text style={styles.historyText}>
                                        {item}
                                    </Text>
                                    <View style={{ paddingTop: 6 }}></View>
                                </View>
                            ))
                                : <Text style={[styles.historyText, { textAlign: "center", paddingHorizontal: 20 }]}>No coaches added yet. Have them scan your code above to link your accounts.</Text>
                            : <Text style={[styles.historyText, { textAlign: "center", paddingHorizontal: 20 }]}>Loading coaches...</Text>}
                    </ScrollView>
                </View>
                <View style={{ flex: .5 }}>
                    <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" onPress={() => { this.load(); }}
                        style={styles.backButtonSelected}>
                        <Text style={styles.nexttext}>Refresh</Text>
                    </TouchableHighlight>
                </View>
                <View style={{ flex: .5 }}>
                    <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" onPress={() => { auth().signOut().then(() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'WelcomeScreen' }], }); }); }}
                        style={styles.backButtonSelected}>
                        <Text style={styles.nexttext}>Logout</Text>
                    </TouchableHighlight>
                </View>
                <View style={{ flex: 0, flexDirection: "row" }}>
                    <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                        onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }], }); }} style={styles.startButton}>
                        <View>
                            <Image style={styles.image} source={require("../assets/images/home.png")}></Image>
                            <Text style={styles.startText}>Home</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                        onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'ReportsMain' }], }); }} style={styles.startButton}>
                        <View>
                            <Image style={styles.image} source={require("../assets/images/chart.png")}></Image>
                            <Text style={styles.startText}>Reports</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                        onPress={() => {
                            firestore().collection('users').doc(auth().currentUser.uid).get().then((data) => {
                                if (data._data.status && data._data.status.type) {
                                    this.props.navigation.navigate("DriveAlert", { alert: data._data.status });
                                } else {
                                    this.props.navigation.navigate("Checklist");
                                }
                            });
                        }} style={styles.startButton}>
                        <View>
                            <Image style={styles.image} source={require("../assets/images/turning.png")}></Image>
                            <Text style={styles.startText}>Drive</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                        onPress={() => { this.props.navigation.navigate("Log") }} style={styles.startButton}>
                        <View>
                            <Image style={styles.image} source={require("../assets/images/diary.png")}></Image>
                            <Text style={styles.startText}>Log</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight disabled={true} underlayColor="rgba(95, 128, 59, .5)"
                        onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'Account' }], }); }} style={styles.startButtonSelected}>
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
        borderRadius: 15,
        flex: 0,
        paddingVertical: 10,
        paddingHorizontal: 50,
        justifyContent: "center"
    },
    approveButton: {
        backgroundColor: "rgba(95, 128, 59,255)",
        borderRadius: 15,
        flex: 0,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        justifyContent: "center"
    },
    denyButton: {
        backgroundColor: "#E60000",
        borderRadius: 15,
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
        paddingHorizontal: 25,

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
        borderTopColor: "#F3F3F5",
        borderBottomColor: "#C4D9B3",
        paddingBottom: 15,
        paddingTop: 15,
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
        borderTopColor: "#F3F3F5",
        borderBottomColor: "rgba(95, 128, 59, 255)",
        paddingBottom: 15,
        paddingTop: 15,
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
    }, historyContainer: {
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

export default Account;