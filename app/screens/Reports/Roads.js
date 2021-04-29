import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  Image,
  TouchableHighlight,
} from 'react-native';
import update from 'immutability-helper';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import colors from "../../config/colors";

import {
    LineChart,
    BarChart,
   
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import {PieChart, RadarChart} from 'react-native-charts-wrapper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Gradient from "javascript-color-gradient";

class Roads extends React.Component {

  constructor() {
    super();

    this.state = {};
    }
  
    componentDidMount() {
      firestore().collection('users').doc(auth().currentUser.uid).get().then((data) => {
        const roadMap = [];
        let zeroes = 0;
        for (const [key, value] of Object.entries(data._data.statistics.roads)) {
          if (value > 0) {
          roadMap.push({value: value, label: key});
          } else {
            zeroes += 1;
          }
        }
        const colorGradient = new Gradient();
        colorGradient.setMidpoint(roadMap.length);
        colorGradient.setGradient('#3f7810', '#c4d9b3');
        let colorArray = colorGradient.getArray();
        for (let i = 0; i < colorArray.length; i++) {
          colorArray[i] = processColor(colorArray[i]);
        }

        this.setState({
          empty: zeroes === 5,
          data: {
            label: 'Pie dataset',
            dataSets: [{
              values: roadMap,
              config: {
                colors: colorArray,
                valueTextSize: 0,
                valueTextColor: 0,
                //sliceSpace: 5,
                //selectionShift: 13,
                // xValuePosition: "OUTSIDE_SLICE",
                // yValuePosition: "OUTSIDE_SLICE",
                //valueFormatter: "#.#'%'",
                //valueLineColor: processColor('green'),
                //valueLinePart1Length: 0.5
              }, label: "Roads"
            }],
          },
        });        

      });
      
    }

  render() {
    
    return (
      this.state.data ? !this.state.empty ? 
      <View style={{flex: 1}}>

        <View style={[styles.container, {flex: 1, justifyContent:"space-between"}]}>
        <View style={{flex: 0, flexDirection:"row", backgroundColor: "#C4D9B3"}}>
        <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" disabled={true}
                 onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'Roads'}],});}} style={styles.topStartButtonSelected}>
                  <View>
                  <Image style={styles.image} source={require("../../assets/images/road.png")}></Image>
                  <Text style={styles.topStartText}>Roads</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" 
                onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'Progress'}],});}} style={styles.topStartButton}>
                <View>
                  <Image style={styles.image} source={require("../../assets/images/progress.png")}></Image>
                  <Text style={styles.topStartText}>Progress</Text>
                </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" 
                onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'ReportsMain'}],});}} style={styles.topStartButton}>
                    <View>
                    <Image style={styles.image} source={require("../../assets/images/learning.png")}></Image>
                    <Text style={styles.topStartText}>Tips</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                 onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'Safety'}],});}} style={styles.topStartButton}>
                  <View>
                  <Image style={styles.image} source={require("../../assets/images/car.png")}></Image>
                  <Text style={styles.topStartText}>Safety</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'Skills'}],});}} style={styles.topStartButton}>
                <View>
                  <Image style={styles.image} source={require("../../assets/images/skills.png")}></Image>
                  <Text style={styles.topStartText}>Skills</Text>
                </View>
                </TouchableHighlight>
  </View>
          <Text style={[styles.text, {marginTop:25}]}>Here is your experience on each different road type. Frequently practicing in different environments will improve your skills as a driver.</Text>
          
    </View>

        

        
          <PieChart
            
            style={styles.chart}
            data={this.state.data}
            legend={{enabled:false}}
            highlightPerTapEnabled={false}
            extraOffsets={{left: 5, right: 5,}}
            entryLabelColor={processColor('black')}
            entryLabelTextSize={20}
            entryLabelFontFamily={'Montserrat-Black'}
           
            drawEntryLabels={true}
            
            rotationEnabled={false}
            //rotationAngle={45}
            usePercentValues={false}
            
            //styledCenterText={{text:'Your Experience on these Road Types', color: processColor('pink'), fontFamily: 'Arial-Medium', size: 20}}
            centerTextRadiusPercent={100}
            holeRadius={40}
            holeColor={processColor('#f0f0f0')}
            transparentCircleRadius={0}
            //transparentCircleColor={processColor('#f0f0f088')}
            
          />

        
        <View style={{flex: 0, flexDirection:"row"}}>
                <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'Home'}],});}} style={styles.startButton}>
                  <View>
                  <Image style={styles.image} source={require("../../assets/images/home.png")}></Image>
                  <Text style={styles.startText}>Home</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight disabled={true} underlayColor="rgba(95, 128, 59, .5)"
                 onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'ReportsMain'}],});}} style={styles.startButtonSelected}>
                    <View>
                    <Image style={styles.image} source={require("../../assets/images/chart.png")}></Image>
                    <Text style={styles.startText}>Reports</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                onPress={() => {firestore().collection('users').doc(auth().currentUser.uid).get().then((data) => {
                  if (data._data.status && data._data.status.type) {
                      this.props.navigation.navigate("DriveAlert", {alert: data._data.status});
                  } else {
                    this.props.navigation.navigate("Checklist");
                  }
              });}} style={styles.startButton}>
                  <View>
                  <Image style={styles.image} source={require("../../assets/images/turning.png")}></Image>
                  <Text style={styles.startText}>Drive</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                onPress={() => {this.props.navigation.navigate("Log")}} style={styles.startButton}>
                <View>
                  <Image style={styles.image} source={require("../../assets/images/diary.png")}></Image>
                  <Text style={styles.startText}>Log</Text>
                </View>
                </TouchableHighlight>
                <TouchableHighlight  underlayColor="rgba(95, 128, 59, .5)"
                onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'Account'}],});}} style={styles.startButton}>
                <View>
                  <Image style={styles.image} source={require("../../assets/images/account.png")}></Image>
                  <Text style={styles.startText}>Account</Text>
                </View>
                </TouchableHighlight>
                </View>

      </View>

:

<View style={[{flex: 1, justifyContent:"space-evenly"}]}>
    <View style={{flex: 0, flexDirection:"row", backgroundColor: "#C4D9B3"}}>
    <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" disabled={true}
             onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'Roads'}],});}} style={styles.topStartButtonSelected}>
              <View>
              <Image style={styles.image} source={require("../../assets/images/road.png")}></Image>
              <Text style={styles.topStartText}>Roads</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
            onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'Progress'}],});}} style={styles.topStartButton}>
            <View>
              <Image style={styles.image} source={require("../../assets/images/progress.png")}></Image>
              <Text style={styles.topStartText}>Progress</Text>
            </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" 
            onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'ReportsMain'}],});}} style={styles.topStartButton}>
                <View>
                <Image style={styles.image} source={require("../../assets/images/learning.png")}></Image>
                <Text style={styles.topStartText}>Tips</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" 
             onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'Safety'}],});}} style={styles.topStartButton}>
              <View>
              <Image style={styles.image} source={require("../../assets/images/car.png")}></Image>
              <Text style={styles.topStartText}>Safety</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
            onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'Skills'}],});}} style={styles.topStartButton}>
            <View>
              <Image style={styles.image} source={require("../../assets/images/skills.png")}></Image>
              <Text style={styles.topStartText}>Skills</Text>
            </View>
            </TouchableHighlight>
</View>
<View style={[styles.background, {flex: 3}]}>
        <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../../assets/images/icon.png")}/>
            <Text style={styles.title}>Looks like you haven't practiced driving yet. Go on some drives and we'll show you what types of roads you drive on.</Text>
        </View>
  </View>

<View style={{flex: 0, flexDirection:"row"}}>
<TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'Home'}],});}} style={styles.startButton}>
<View>
<Image style={styles.image} source={require("../../assets/images/home.png")}></Image>
<Text style={styles.startText}>Home</Text>
</View>
</TouchableHighlight>
<TouchableHighlight disabled={true} underlayColor="rgba(95, 128, 59, .5)"
onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'ReportsMain'}],});}} style={styles.startButtonSelected}>
<View>
<Image style={styles.image} source={require("../../assets/images/chart.png")}></Image>
<Text style={styles.startText}>Reports</Text>
</View>
</TouchableHighlight>
<TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
onPress={() => {firestore().collection('users').doc(auth().currentUser.uid).get().then((data) => {
  if (data._data.status && data._data.status.type) {
      this.props.navigation.navigate("DriveAlert", {alert: data._data.status});
  } else {
    this.props.navigation.navigate("Checklist");
  }
});}} style={styles.startButton}>
<View>
<Image style={styles.image} source={require("../../assets/images/turning.png")}></Image>
<Text style={styles.startText}>Drive</Text>
</View>
</TouchableHighlight>
<TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
onPress={() => {this.props.navigation.navigate("Log")}} style={styles.startButton}>
<View>
<Image style={styles.image} source={require("../../assets/images/diary.png")}></Image>
<Text style={styles.startText}>Log</Text>
</View>
</TouchableHighlight>
<TouchableHighlight  underlayColor="rgba(95, 128, 59, .5)"
onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'Account'}],});}} style={styles.startButton}>
<View>
<Image style={styles.image} source={require("../../assets/images/account.png")}></Image>
<Text style={styles.startText}>Account</Text>
</View>
</TouchableHighlight>
</View>
</View>

    :
      <View style={styles.background}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../../assets/images/icon.png")}/>
                <Text style={styles.name}>Professor Driver</Text>
            </View>
      </View>
    );
  
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 19,
        alignItems: "center",
        //justifyContent: "center"
    },title: {
    fontFamily: "Montserrat",
    color: "black",
    fontWeight: "bold",
    fontSize: 22,
    paddingTop: 10,
    paddingHorizontal:20,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center"

},background: {
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
note: {
    fontFamily: "Montserrat-Italic",
    color: "black",
    fontSize: 18,
    paddingTop: 5
},
startButton: {
    backgroundColor: "#FD917E",
    borderRadius: 8,
    width: 160,
    height: 64, 
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
logo: {
    width: 150,
    height: 123
},
text: {
    fontFamily: "Montserrat",
    textAlign: "center",
    paddingHorizontal: 25, 
    paddingVertical:0,
    fontSize: 18
},
  chart: {
    flex: 4,
    marginTop:200, 
    height:100,
    //backgroundColor: '#C4D9B3',
    borderRadius:16,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  startText: {
    fontFamily: "Montserrat",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    //paddingTop: 10
  },
  topStartText: {
    fontFamily: "Montserrat",
    color: "white",
    //fontWeight: "bold",
    fontSize: 20,
    //paddingTop: 10
  },
  container: {
          backgroundColor: "white",
          borderRadius: 19,
          alignItems: "center",
          //justifyContent: "center"
    },
    topStartButton: {
        backgroundColor: "#C4D9B3",
        borderRightColor: "#F3F3F5",
        borderLeftColor: "#F3F3F5",
        borderTopColor:"#F3F3F5",
        borderBottomColor:"#C4D9B3",
        paddingBottom: 15,
        paddingTop:50,
        flex: 1,
        borderWidth: 1,
        height: 150, 
        alignItems: "center", 
        justifyContent: "center"
    },
    topStartButtonSelected: {
        backgroundColor: "rgba(95, 128, 59,255)",
        borderRightColor: "#F3F3F5",
        borderLeftColor: "#F3F3F5",
        borderTopColor:"#F3F3F5",
        borderBottomColor:"rgba(95, 128, 59, 255)",
        paddingBottom: 15,
        paddingTop:50,
        flex: 1,
        borderWidth: 1,
        height: 150, 
        alignItems: "center", 
        justifyContent: "center"
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
});

export default Roads;