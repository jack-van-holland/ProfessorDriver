import React, { Component, useEffect } from "react";
import {
    StyleSheet, View, Image, Text, TextInput,
    TouchableHighlight, AppRegistry
} from "react-native";

import colors from "../../config/colors";


import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const Scan = ({ navigation }) => {
    const scanner = React.useRef(null);
    onSuccess = e => {
        navigation.navigate("ScanConfirm", { onGoBack: () => { scanner.current.reactivate(); }, role: "parent", child: e.data, level: "" });
    };



    return (
        <View style={styles.background}>
            <QRCodeScanner
                ref={scanner}
                onRead={this.onSuccess}
                topContent={
                    <Text style={styles.titletext}>Scan your learning driver's code</Text>
                }
                bottomContent={
                    <View style={{ flexDirection: "row" }}>
                        <TouchableHighlight style={styles.backButtonSelected}
                            onPress={() => navigation.goBack()}>
                            <Text style={styles.nexttext}>Back</Text>
                        </TouchableHighlight>
                    </View>
                }
            />
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
        width: 400,
        height: 44,
        top: 50,
        fontFamily: "Montserrat",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: 50,
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
        top: 0,
        backgroundColor: '#87B258',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    backButtonSelected: {
        flex: 1,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        height: 40,
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
    }, centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    },
})

AppRegistry.registerComponent('default', () => ScanScreen);

export default Scan;