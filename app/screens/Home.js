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
import colors from "../config/colors";

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import {RadarChart} from 'react-native-charts-wrapper';


class Home extends React.Component {

  constructor() {
    super();

    this.state = {
      userPerformance: {}, performanceChart: {},
    };
  }

  componentDidMount() {
    console.log("mounted");
    console.log(this.state.userLevel);
    this.setState({
      userLevel: {points: 2132, level: 6,}
  }, () => {console.log(this.state.userLevel);});
    
    
    
    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [{
              values: [1, 1, 1, 1, 1],
              label: 'DS 1',
              config: {
                color: processColor('#FF8C9D'),
                drawFilled: true,
                drawValues: false,
                fillColor: processColor('#FF8C9D'),
                fillAlpha: 100,
                lineWidth: 2
              }
            }, {
              values: [1, 2, 3, 4, 5],
              label: 'DS 2',
              config: {
                color: processColor('#C0FF8C'),

                drawFilled: true,
                drawValues: false,
                fillColor: processColor('#C0FF8C'),
                fillAlpha: 150,
                lineWidth: 1.5
              }
            }, {
              values: [6, 10, 2, 5, 4],
              label: 'DS 3',
              config: {
                color: processColor('#8CEAFF'),
                drawValues: false,
                drawFilled: true,
                fillColor: processColor('#8CEAFF')
              }
            }],
          }
        },
        xAxis: {
            
          $set: {
            fontFamily: "Montserrat",
            valueFormatter: ['Acceleration', 'Phone Use', 'Turning', 'Speed', 'Braking']
          }
        }
      })
    );
  }

  handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
    }

    console.log(event.nativeEvent)
  }

  render() {
    
    return (
      this.state.userLevel ?
        <View style={[styles.container, {flex:1, justifyContent:"space-between"}]}>
          <Text style={[styles.title, {marginTop:50, flex:0}]}>Welcome!</Text>
          
          <View style={{backgroundColor:'#E1F6D0', borderRadius: 16, height : 400}}>
          <Text style={styles.subtitle}>Level {this.state.userLevel.level}</Text>
          <Text style={styles.subtitle}>{this.state.userLevel.points} points</Text>


          <ProgressChart
          data={[this.state.userLevel.points / 3000]}
          width={Dimensions.get('window').width - 16}
          height={250}
          radius={100}
          hideLegend={true}
          chartConfig={{
            backgroundGradientFrom: '#E1F6D0',
            backgroundGradientTo: '#E1F6D0',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(95, 128, 59, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            flex:0
            
          //  height:"50px",
          }}
        />
        {this.state.userLevel.level !== 10 ? 
        <Text style={[styles.text, {flex:0}]}>You need {3000 - this.state.userLevel.points} more points to level up! </Text> : null}

  </View>
  <View style={{flex: 0, flexDirection:"row", paddingBottom: 15, backgroundColor: "#C4D9B3"}}>
                <TouchableHighlight onPress={() => {this.props.navigation.navigate("Reports Main")}} style={styles.startButton}>
                    <View>
                    <Image style={styles.image} source={require("../assets/images/history.png")}></Image>
                    <Text style={styles.startText}>Reports</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {this.props.navigation.navigate("EndDrive")}} style={styles.startButton}>
                  <View>
                  <Image style={styles.image} source={require("../assets/images/turning.png")}></Image>
                  <Text style={styles.startText}>Drive</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => {this.props.navigation.navigate("Account")}} style={styles.startButton}>
                <View>
                  <Image style={styles.image} source={require("../assets/images/account.png")}></Image>
                  <Text style={styles.startText}>Account</Text>
                </View>
                </TouchableHighlight>
  </View>
</View>


        

    :
      <View style={styles.background}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/images/icon.png")}/>
                <Text style={styles.name}>Professor Driver</Text>
            </View>
      </View>
    );
  
  }
}

const styles = StyleSheet.create({
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
    fontSize: 38,
    paddingTop: 10,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center"
},
subtitle: {
  fontFamily: "Montserrat",
  color: "black",
  fontSize: 30,
  paddingTop: 10,
  justifyContent: "center",
  textAlign: "center",
  alignItems: "center"

},
text: {
  fontFamily: "Montserrat",
  color: "black",
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
    backgroundColor: "#C4D9B3",
    borderRightColor: "#F3F3F5",
    borderLeftColor: "#F3F3F5",
    borderTopColor:"#F3F3F5",
    borderBottomColor:"#C4D9B3",

    flex: 1,
    borderWidth: 1,
    height: 64, 
    alignItems: "center", 
    justifyContent: "center"
},
logo: {
    width: 150,
    height: 123
},
  chart: {
    flex: 4,
    marginTop:200, 
    height:100,
    //backgroundColor: '#C4D9B3',
    borderRadius:16,
  }
});

export default Home;