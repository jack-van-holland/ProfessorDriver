import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  Image,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import update from 'immutability-helper';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
import colors from "../../config/colors";

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import {RadarChart} from 'react-native-charts-wrapper';


class Progress extends React.Component {

  constructor() {
    super();
    this.state = {
        accel: true,
        brake: false,
        turn: false,
        speed: false,
        phone: false,
        accelData: [Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,],
            brakeData: [Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,],
                accelData: [Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 10,],
            turnData: [Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 10,],
                speedData: [Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,
                    Math.random() * 10,],
                    phoneData: [Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,
                        Math.random() * 10,],
  }
  
  this.updateData = () => {
    this.setState((pastState) => {
        let dataChosen = [];
        if (pastState.accel) {
            dataChosen.push({data: pastState.accelData,color: (opacity = 1) => `rgba(0, 102, 51, ${opacity})`,});
        }
        if (pastState.brake) {
          dataChosen.push({data: pastState.brakeData,color: (opacity = 1) => `rgba(255, 51, 51, ${opacity})`,});
        }
        if (pastState.turn) {
          dataChosen.push({data: pastState.turnData,color: (opacity = 1) => `rgba(102, 0, 102, ${opacity})`});
        }
        if (pastState.speed) {
          dataChosen.push({data: pastState.speedData,color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,});
        }
        if (pastState.phone) {
          dataChosen.push({data: pastState.phoneData,color: (opacity = 1) => `rgba(0, 153, 204, ${opacity})`});
        }
        return {data: {
          labels: ["1/17","1/24","1/31","2/7","2/14","2/21","2/28", "3/7", "3/14", "3/21", "3/28", "4/4"],
          datasets: dataChosen,
        }}; 
      
    });
}
}
componentDidMount() {
    this.updateData();
}
    
    
  render() {
    
    return (
      this.state.data ?
        <View style={[styles.container, {flex: 1, justifyContent:"space-between"}]}>
        <View style={{flex: 0, flexDirection:"row", backgroundColor: "#C4D9B3"}}>
        <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                 onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'Roads'}],});}} style={styles.topStartButton}>
                  <View>
                  <Image style={styles.image} source={require("../../assets/images/road.png")}></Image>
                  <Text style={styles.topStartText}>Roads</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" disabled={true}
                onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'Progress'}],});}} style={styles.topStartButtonSelected}>
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
          <Text style={[styles.title, {marginTop:50}]}>View your progress over time for each safety habit</Text>
          

        

  <ScrollView
horizontal={true}
contentOffset={{ x: 900 - Dimensions.get("window").width, y: 0 }} // i needed the scrolling to start from the end not the start
showsHorizontalScrollIndicator={false}
style={{flex:1}} // to hide scroll bar
>
  <LineChart
    data={this.state.data}
    width={900}
    height={250}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
    backgroundGradientFrom: '#E6E6E6',
    backgroundGradientTo: '#E6E6E6',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(95, 128, 59, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
      style: {
        borderRadius: 16
      },
      
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
  </ScrollView>
  <View style={{flex: 0, flexDirection:"row"}}>
            <TouchableHighlight onPress={() => {this.setState((pastState) => {
              if (!(pastState.accel && !pastState.brake && !pastState.turn && !pastState.speed && !pastState.phone)){
              return {accel: !pastState.accel};} else {return null;}}, () => {this.updateData();});}}
            style={this.state.accel ? styles.greenButtonSelected :styles.greenButtonUnselected}
            underlayColor="rgba(135, 178, 88, 0.2)">
                <Text style={styles.greenText}>Gentle Acceleration</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => {this.setState((pastState) => {
              if (!(!pastState.accel && pastState.brake && !pastState.turn && !pastState.speed && !pastState.phone)){
              return {brake: !pastState.brake};} else {return null;}}, () => {this.updateData();});}}
            style={this.state.brake ? styles.redButtonSelected : styles.redButtonUnselected}
            underlayColor="rgba(135, 178, 88, 0.2)">
                <Text style={styles.redText}>Gentle Braking</Text>
            </TouchableHighlight>
            </View>
            <View style={{flex: 0, flexDirection:"row"}}>
            <TouchableHighlight underlayColor="rgba(135, 178, 88, 0.2)"
            onPress={() => {this.setState((pastState) => {
              if (!(!pastState.accel && !pastState.brake && pastState.turn && !pastState.speed && !pastState.phone)){
              return {turn: !pastState.turn};} else {return null;}}, () => {this.updateData();});}}
            style={this.state.turn ? styles.purpleButtonSelected : styles.purpleButtonUnselected}>
                <Text style={styles.purpleText}>Slowing for Turns</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="rgba(135, 178, 88, 0.2)"
            onPress={() => {this.setState((pastState) => {
              if (!(!pastState.accel && !pastState.brake && !pastState.turn && pastState.speed && !pastState.phone)){
              return {speed: !pastState.speed};} else {return null;}}, () => {this.updateData();});}}
            style={this.state.speed ? styles.yellowButtonSelected : styles.yellowButtonUnselected}>
                <Text style={styles.yellowText}>Proper Speed</Text>
            </TouchableHighlight>
            </View>
            <TouchableHighlight underlayColor="rgba(135, 178, 88, 0.2)"
            onPress={() => {this.setState((pastState) => {
              if (!(!pastState.accel && !pastState.brake && !pastState.turn && !pastState.speed && pastState.phone)){
              return {phone: !pastState.phone};} else {return null;}}, () => {this.updateData();});}}
            style={this.state.phone ? styles.blueButtonSelected : styles.blueButtonUnselected}>
                <Text style={styles.blueText}>Avoiding Phone Use</Text>
            </TouchableHighlight>
        
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
                onPress={() => {this.props.navigation.navigate("Checklist");}} style={styles.startButton}>
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
    },
    title: {
    fontFamily: "Montserrat",
    color: "black",
    fontWeight: "bold",
    fontSize: 22,
    paddingTop: 10,
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
    color: colors.PDgreen,
    fontWeight: "bold",
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
    buttonUnselected: {
      padding: 5,
      margin: 10,
      backgroundColor: "#F3F3F5",
      borderColor: "rgba(0, 102, 51, 1)",
      borderWidth: 1.5,
      borderRadius: 10,
  },
  buttonSelected: {
      padding: 5,
      margin: 10,
      backgroundColor: "rgba(204, 255, 204, 0.2)",
      borderColor: "rgba(0, 102, 51, 1)",
      borderWidth: 1.5,
      borderRadius: 10,
  },
    greenButtonUnselected: {
        padding: 5,
        margin: 10,
        backgroundColor: "#F3F3F5",
        borderColor: "rgba(0, 102, 51, 1)",
        borderWidth: 1.5,
        borderRadius: 10,
    },
    greenButtonSelected: {
        padding: 5,
        margin: 10,
        backgroundColor: "rgba(204, 255, 204, .5)",
        borderColor: "rgba(0, 102, 51, 1)",
        borderWidth: 1.5,
        borderRadius: 10,
    },greenText: {
      fontFamily: "Montserrat",
      color: "rgba(0, 102, 51, 1)",
      fontWeight: "bold",
      fontSize: 18
  },
    redButtonUnselected: {
      padding: 5,
      margin: 10,
      backgroundColor: "#F3F3F5",
      borderColor: "rgba(255, 51, 51, 1)",
      borderWidth: 1.5,
      borderRadius: 10,
  },
  redButtonSelected: {
      padding: 5,
      margin: 10,
      backgroundColor: "rgba(255, 204, 204, 0.5)",
      borderColor: "rgba(255, 51, 51, 1)",
      borderWidth: 1.5,
      borderRadius: 10,
  },
  redText: {
    fontFamily: "Montserrat",
    color: "rgba(255, 51, 51, 1)",
    fontWeight: "bold",
    fontSize: 18
},purpleButtonUnselected: {
  padding: 5,
  margin: 10,
  backgroundColor: "#F3F3F5",
  borderColor: "rgba(102, 0, 102, 1)",
  borderWidth: 1.5,
  borderRadius: 10,
},
purpleButtonSelected: {
  padding: 5,
  margin: 10,
  backgroundColor: "rgba(255, 204, 255, .5)",
  borderColor: "rgba(102, 0, 102, 1)",
  borderWidth: 1.5,
  borderRadius: 10,
},purpleText: {
fontFamily: "Montserrat",
color: "rgba(102, 0, 102, 1)",
fontWeight: "bold",
fontSize: 18
},yellowButtonUnselected: {
  padding: 5,
  margin: 10,
  backgroundColor: "#F3F3F5",
  borderColor: "rgba(255, 215, 0, 1)",
  borderWidth: 1.5,
  borderRadius: 10,
},
yellowButtonSelected: {
  padding: 5,
  margin: 10,
  backgroundColor: "rgba(255, 255, 153, .5)",
  borderColor: "rgba(255, 215, 0, 1)",
  borderWidth: 1.5,
  borderRadius: 10,
},yellowText: {
fontFamily: "Montserrat",
color: "rgba(255, 215, 0, 1)",
fontWeight: "bold",
fontSize: 18
},blueButtonUnselected: {
  padding: 5,
  margin: 10,
  backgroundColor: "#F3F3F5",
  borderColor: "rgba(0, 153, 204, 1)",
  borderWidth: 1.5,
  borderRadius: 10,
},
blueButtonSelected: {
  padding: 5,
  margin: 10,
  backgroundColor: "rgba(153, 204, 204, .5)",
  borderColor: "rgba(0, 153, 204, 1)",
  borderWidth: 1.5,
  borderRadius: 10,
},blueText: {
fontFamily: "Montserrat",
color: "rgba(0, 153, 204, 1)",
fontWeight: "bold",
fontSize: 18
},
});

export default Progress;