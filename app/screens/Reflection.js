import React, {useState, Component} from "react";
import {
    StyleSheet, 
    View, 
    Image, 
    CheckBox,  
    Text, 
    TextInput, 
    Button, 
    TouchableHighlight, 
    SafeAreaView, 
    Alert} from "react-native";

import colors from "../config/colors";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import sizeof from 'object-sizeof'; 
import { Swipeable } from "react-native-gesture-handler";

const Task = (props) => {
    const [isSelected, setSelection] = useState(false);
    return (
        <View style={styles.checkboxContainer}> 
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          <Text style={styles.text}>{props.item}</Text>
        </View>
    );
  }

  const TextInputBox = () => {
    const [text, onChangeText] = React.useState("");
  
    return (
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Write any notes here ..."
          placeholderTextColor='#D3D3D3' 
        />
      </SafeAreaView>
    );
  };


const Reflection = ({ navigation, route }) => {
    const [happy, setHappy] = useState(false);
    const [neutral, setNeutral] = useState(false);
    const [sad, setSad] = useState(false);
    const [signal, setSignal] = useState(false);
    const [mirrors, setMirrors] = useState(false);
    const [lane, setLane] = useState(false);
    const [speed, setSpeed] = useState(false);
    const [goodOthers, setGoodOthers] = useState(false);
    const [goodNone, setGoodNone] = useState(false);
    const [parking, setParking] = useState(false);
    const [distractions, setDistractions] = useState(false);
    const [left, setLeft] = useState(false);
    const [merging, setMerging] = useState(false);
    const [badOther, setBadOther] = useState(false);
    const [badNone, setBadNone] = useState(false);

    
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
                            // reflection 
                            });
                        }
                    }
                    else { 
                    const doc = firestore().collection('users').doc(auth().currentUser.uid).collection('drives').doc(String(route.params.startTime));

                    doc.set({
                    data: route.params.data, 
                    apiRequests: route.params.apiRequests
                    // reflection 
                });
            }
            navigation.navigate("StartDrive");
        };

    return (
        <View style={[styles.container, {flexDirection: "column"}]}>
            <View style={{ flex: 1}}>
                <Text style = {styles.heading}> 
                How was the drive? 
                </Text>
                <Text style={styles.quotes}> 
                Your responce won’t be shared with your parents!
                </Text>

                <View style={{flex: 1, flexDirection:"row"}}>
                    <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                    onPress={() => {if (!happy) {setHappy(true); setNeutral(false); setSad(false);}}} style={happy ? styles.moodButtonPressed : styles.moodButton}>
                        <View style={{flex:1}}>
                        <Image style={[styles.image, {tintColor:"green"}]} source={require("../assets/images/smile.png")}></Image>
                        <Text style={styles.startText}> Good </Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                    onPress={() => {if (!neutral) {setHappy(false); setNeutral(true); setSad(false);}}} style={neutral ? styles.moodButtonPressed : styles.moodButton}>
                        <View style={{flex:1}}>
                        <Image style={[styles.image, {tintColor:"gold"}]} source={require("../assets/images/neutral.png")}></Image>
                        <Text style={styles.startText}>Neutral</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={{flex:1}} underlayColor="rgba(100, 128, 59, .5)"
                    onPress={() => {if (!sad) {setHappy(false); setNeutral(false); setSad(true);}}} style={sad ? styles.moodButtonPressed : styles.moodButton}>
                        <View>
                        <Image style={[styles.image, {tintColor:"red"}]} source={require("../assets/images/frown.png")}></Image>
                        <Text style={styles.startText}>   bad   </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View> 
            


            <View style={{ flex: 1}}>
                <Text style={styles.heading}> What did you do well? </Text>
                    <View style={{flex: 0, flexDirection:"column"}}>
                        <View style={{flex: 0, flexDirection:"row"}}>
                            <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                            onPress={() => {setSignal(!signal);}} style={signal ? styles.startButtonSelected : styles.startButton}>
                                <View>
                                <Text style={styles.startText}>Turn Signal</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                            onPress={() => {setMirrors(!mirrors);}} style={mirrors ? styles.startButtonSelected : styles.startButton}>
                            <View>
                                <Text style={styles.startText}>Use Mirrors</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                            onPress={() => {setLane(!lane);}} style={lane ? styles.startButtonSelected : styles.startButton}>
                            <View>
                                <Text style={styles.startText}>Stay in Lane</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={{flex: 0, flexDirection:"row"}}>
                            <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                            onPress={() => {setSpeed(!speed);}} style={speed ? styles.startButtonSelected : styles.startButton}>
                            <View>
                                <Text style={styles.startText}>Speed Control</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                            onPress={() => {setGoodOthers(!goodOthers);}} style={goodOthers ? styles.startButtonSelected : styles.startButton}>
                            <View>
                                <Text style={styles.startText}>Others</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                            onPress={() => {setGoodNone(!goodNone);}} style={goodNone ? styles.startButtonSelected : styles.startButton}>
                            <View>
                                <Text style={styles.startText}>None</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>

                <TextInputBox />
            </View>

            <View style={{ flex: 1 }}>
                <Text style={styles.heading}> What was challenging? </Text> 
                <View style={{flex: 0, flexDirection:"column"}}>
                    <View style={{flex: 0, flexDirection:"row"}}>
                        <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                            onPress={() => {setParking(!parking);}} style={parking ? styles.startButtonSelected : styles.startButton}>
                            <View>
                            <Text style={styles.startText}>Parking</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                            onPress={() => {setDistractions(!distractions);}} style={distractions ? styles.startButtonSelected : styles.startButton}>
                            <View>
                            <Text style={styles.startText}>Distractions</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                            onPress={() => {setLeft(!left);}} style={left ? styles.startButtonSelected : styles.startButton}>
                            <View>
                            <Text style={styles.startText}>Left Turn</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 0, flexDirection:"row"}}>
                        <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                            onPress={() => {setMerging(!merging);}} style={merging ? styles.startButtonSelected : styles.startButton}>
                            <View>
                            <Text style={styles.startText}>Merging</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                            onPress={() => {setBadOther(!badOther);}} style={badOther ? styles.startButtonSelected : styles.startButton}>
                            <View>
                            <Text style={styles.startText}>Others</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                            onPress={() => {setBadNone(!badNone);}} style={badNone ? styles.startButtonSelected : styles.startButton}>
                            <View>
                            <Text style={styles.startText}>None</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <TextInputBox />
                </View>
            </View>
            <TouchableHighlight onPress={() => {navigation.navigate("EndDrive"); }}
                            disabled={(sad || happy || neutral) ? false : true}
                            style={(sad || happy || neutral) ? styles.nextButtonSelected : styles.nextButtonUnselected}
                        >
                            <Text style={styles.nexttext}>Submit</Text>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25,
        padding: 20,
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        tintColor: "black",
    },
    logo: {
        width: 150,
        height: 123
    },
    heading: {
        fontFamily: "Montserrat",
        color: 'black',
        fontWeight: "bold",
        fontSize: 24,
        textAlign: 'center',
        paddingVertical: 10,
    },
    quotes: {
        fontFamily: "Montserrat",
        color: 'black',
        fontWeight: "normal",
        fontStyle: "italic",
        fontSize: 16,
        padding: 5,
        paddingHorizontal: 20,
        paddingBottom:40,
        textAlign: 'center',
    },
    moodButton: {
        backgroundColor: "white",
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
    moodButtonPressed: {
        backgroundColor: "rgba(135, 178, 88, 0.2)",
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
    startButton: {
        backgroundColor: "white",
        borderRightColor: "#F3F3F5",
        borderLeftColor: "#F3F3F5",
        borderTopColor:"#F3F3F5",
        borderBottomColor:"#C4D9B3",
        paddingBottom: 15,
        paddingTop:15,
        flex: 1,
        borderWidth: 1,
        height: 50, 
        alignItems: "center", 
        justifyContent: "center"
    },
    startButtonSelected: {
        backgroundColor: "rgba(135, 178, 88, 0.2)",
        borderRightColor: "#F3F3F5",
        borderLeftColor: "#F3F3F5",
        borderTopColor:"#F3F3F5",
        borderBottomColor:"#C4D9B3",
        paddingBottom: 15,
        paddingTop:15,
        flex: 1,
        borderWidth: 1,
        height: 50, 
        alignItems: "center", 
        justifyContent: "center"
    },
    startText: {
        fontFamily: "Montserrat",
        color: "black",
        fontWeight: "normal",
        fontSize: 16,
        //paddingTop: 10
      },
    input: {
        fontFamily: "Montserrat",
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
      },nexttext: {
        fontFamily: "Montserrat",
        color: "#F3F3F5",
        fontWeight: "bold",
        fontSize: 18
    },
    nextButtonUnselected: {
        height: 40,
        backgroundColor: '#C4D9B3',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    nextButtonSelected: {
        height: 40,
        backgroundColor: '#87B258',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default Reflection;
