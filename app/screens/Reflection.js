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
    const [text, onChangeText] = React.useState(null);
  
    return (
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Write any notes here ..."
        />
      </SafeAreaView>
    );
  };


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
                “Your responce won’t be shared with your parents!!!”
                </Text>

                <View style={{flex: 0, flexDirection:"row"}}>
                    <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                    onPress={() => Alert.alert('Right button pressed')} style={styles.moodButton}>
                        <View>
                        <Image style={styles.image} source={require("../assets/images/HappyFace.png")}></Image>
                        <Text style={styles.startText}>Good</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                    onPress={() => Alert.alert('Right button pressed')} style={styles.moodButton}>
                        <View>
                        <Image style={styles.image} source={require("../assets/images/NeutralFace.png")}></Image>
                        <Text style={styles.startText}>Neutral</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                    onPress={() => Alert.alert('Right button pressed')} style={styles.moodButton}>
                        <View>
                        <Image style={styles.image} source={require("../assets/images/SadFace.png")}></Image>
                        <Text style={styles.startText}>Bad</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View> 
            


            <View style={{ flex: 1}}>
                <Text style={styles.heading}> What did you do well? </Text>
                    <View style={{flex: 0, flexDirection:"column"}}>
                        <View style={{flex: 0, flexDirection:"row"}}>
                            <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                            onPress={() => Alert.alert('Right button pressed')} style={styles.startButton}>
                                <View>
                                <Text style={styles.startText}>Turn Signal</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                            onPress={() => Alert.alert('Right button pressed')} style={styles.startButton}>
                                <View>
                                <Text style={styles.startText}>Use Mirrors</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                            onPress={() => Alert.alert('Right button pressed')} style={styles.startButton}>
                                <View>
                                <Text style={styles.startText}>Stay in Lane</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={{flex: 0, flexDirection:"row"}}>
                            <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                            onPress={() => Alert.alert('Right button pressed')} style={styles.startButton}>
                                <View>
                                <Text style={styles.startText}>Speed Control</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                            onPress={() => Alert.alert('Right button pressed')} style={styles.startButton}>
                                <View>
                                <Text style={styles.startText}>Others</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                            onPress={() => Alert.alert('Right button pressed')} style={styles.startButton}>
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
                        onPress={() => Alert.alert('Right button pressed')} style={styles.startButton}>
                            <View>
                            <Text style={styles.startText}>Parking</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                        onPress={() => Alert.alert('Right button pressed')} style={styles.startButton}>
                            <View>
                            <Text style={styles.startText}>Distractions</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                        onPress={() => Alert.alert('Right button pressed')} style={styles.startButton}>
                            <View>
                            <Text style={styles.startText}>Left Turn</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{flex: 0, flexDirection:"row"}}>
                        <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                        onPress={() => Alert.alert('Right button pressed')} style={styles.startButton}>
                            <View>
                            <Text style={styles.startText}>Merging</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                        onPress={() => Alert.alert('Right button pressed')} style={styles.startButton}>
                            <View>
                            <Text style={styles.startText}>Others</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor="rgba(100, 128, 59, .5)"
                        onPress={() => Alert.alert('Right button pressed')} style={styles.startButton}>
                            <View>
                            <Text style={styles.startText}>None</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <TextInputBox />
                </View>
            </View>
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
        resizeMode: 'contain'
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
      },
})

export default Reflection;
