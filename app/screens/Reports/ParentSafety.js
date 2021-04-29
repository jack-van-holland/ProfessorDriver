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
import {CheckBox} from "react-native-elements";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import {RadarChart} from 'react-native-charts-wrapper';


class ParentSafety extends React.Component {

  constructor() {
    super();

    this.state = {
      userPerformance: {}, performanceChart: {}, allChecked: false, timeChecked: false,
    };
  }

  componentDidMount() {
    console.log("mounted");
    firestore().collection('users').doc(auth().currentUser.uid).get().then((parentData) => {
    firestore().collection('users').doc(parentData._data.currentChild).get().then((data) => {
      firestore().collection('statistics').doc(String(data._data.level)).get().then((statData) => {
        const minDate = String(Date.now() - 604800000);
        firestore().collection('users').doc(parentData._data.currentChild).collection('reports').where(firestore.FieldPath.documentId(), '>=', minDate).get().then((reportData) => {
          let userAccel = 0;
          let userPhone = 0;
          let userTurn = 0;
          let userBrake = 0;
          let userSpeed = 0;
          let userCount = 0;
          reportData._docs.forEach(element => {
            userAccel += Number(element._data.accel);
            userPhone += Number(element._data.phone);
            userTurn += Number(element._data.turn);
            userBrake += Number(element._data.brake);
            userSpeed += Number(element._data.speed);
            userCount += 1;
          });
          if (userCount == 0) {
            this.setState({hasData: false});
          } else {
            userAccel /= userCount;
            userPhone /= userCount;
            userTurn /= userCount;
            userBrake /= userCount;
            userSpeed /= userCount;
            const weekData = [userAccel, userPhone, userTurn, userSpeed, userBrake];
            const overallData = [Number(data._data.statistics.accel),Number(data._data.statistics.phone),
              Number(data._data.statistics.turn),Number(data._data.statistics.speed),Number(data._data.statistics.brake)];
            const allData = [statData._data.accelMean, statData._data.phoneMean,statData._data.turnMean,
              statData._data.speedMean,statData._data.brakeMean,]
            console.log(allData);
            this.setState({hasData:true, userLevel: data._data.level, safetyData: {week: weekData, overall: overallData, average: allData}}, () => {
              this.setState( (pastState) => { return {
                  data: {
                      dataSets: [{
                        values: pastState.safetyData.week,
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
                          values: pastState.safetyData.average,
                          label: 'DS 2',
                          config: {
                            color: 0,
            
                            drawFilled: true,
                            drawValues: false,
                            fillColor: 0,
                            fillAlpha: 255,
                            lineWidth: 0
                          }
                        }, {
                          values: pastState.safetyData.overall,
                          label: 'DS 3',
                          config: {
                            color: 0,
                            drawValues: false,
                            drawFilled: true,
                            fillColor: 0
                          }
                        }],
                  },
                  xAxis: {
                      fontFamily: "Montserrat",
                      valueFormatter: ['     Gentle\nAcceleration', '  Avoiding\nPhone Use', ' Slowing\nfor Turns', 'Proper\nSpeed', ' Gentle\nBraking'],
                  }
              }
          }
              , () => {console.log(this.state.data);});
            });
          }
        });
      });
    });});
    
    this.updateRadar = () => {
        console.log("hi");
        this.setState((pastState) => {
            const datasets = [];
            datasets.push({values: pastState.safetyData.week,
                label: 'DS 1',
                config: {
                  color: processColor('#FF8C9D'),
                  drawFilled: true,
                  drawValues: false,
                  fillColor: processColor('#FF8C9D'),
                  fillAlpha: 100,
                  lineWidth: 2
                }});
            if (pastState.allChecked) {
                datasets.push({
                    values: pastState.safetyData.average,
                    label: 'DS 2',
                    config: {
                      color: processColor('#C0FF8C'),
      
                      drawFilled: true,
                      drawValues: false,
                      fillColor: processColor('#C0FF8C'),
                      fillAlpha: 150,
                      lineWidth: 1.5
                    }
                  });
            } else {
                datasets.push({
                    values: pastState.safetyData.average,
                    label: 'DS 2',
                    config: {
                      color: 0,
      
                      drawFilled: true,
                      drawValues: false,
                      fillColor: 0,
                      fillAlpha: 255,
                      lineWidth: 0
                    }
                  });
            }
            if (pastState.timeChecked) {
                datasets.push( {
                    values: pastState.safetyData.overall,
                    label: 'DS 3',
                    config: {
                      color: processColor('#8CEAFF'),
                      drawValues: false,
                      drawFilled: true,
                      fillColor: processColor('#8CEAFF')
                    }
                  });
            } else {
                datasets.push( {
                    values: pastState.safetyData.overall,
                    label: 'DS 3',
                    config: {
                      color: 0,
                      drawValues: false,
                      drawFilled: true,
                      fillColor: 0
                    }
                  });
            }
            return {
                data: {dataSets: datasets}
            };
        }, () => {console.log(this.state.data)});
    };
    
}


  render() {
    
    return (
      this.state.hasData ? this.state.safetyData ? 
      <View style={{flex: 1}}>

        <View style={[styles.container, {flex: .75, justifyContent:"space-between"}]}>
        <View style={{flex: 0, flexDirection:"row", backgroundColor: "#C4D9B3"}}>
        <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" 
                 onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'ParentRoads'}],});}} style={styles.topStartButton}>
                  <View>
                  <Image style={styles.image} source={require("../../assets/images/road.png")}></Image>
                  <Text style={styles.topStartText}>Roads</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" 
                onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'ParentProgress'}],});}} style={styles.topStartButton}>
                <View>
                  <Image style={styles.image} source={require("../../assets/images/progress.png")}></Image>
                  <Text style={styles.topStartText}>Progress</Text>
                </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" 
                onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'ParentReportsMain'}],});}} style={styles.topStartButton}>
                    <View>
                    <Image style={styles.image} source={require("../../assets/images/learning.png")}></Image>
                    <Text style={styles.topStartText}>Tips</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" disabled={true}
                 onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'ParentSafety'}],});}} style={styles.topStartButtonSelected}>
                  <View>
                  <Image style={styles.image} source={require("../../assets/images/car.png")}></Image>
                  <Text style={styles.topStartText}>Safety</Text>
                  </View>
                </TouchableHighlight>
  </View>
          <Text style={[styles.text, {marginTop:25}]}>These are the most dangerous habits while driving. Here's how your student performed this week:</Text>
          

</View>

        
          <RadarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            chartDescription={{text: ''}}
            legend={{enabled:false}}
            rotationEnabled = {false}
            yAxis={{drawLabels:false, axisMinimum:0, /*axisMaximum:8*/}}
            drawWeb={true}
            highlightPerTapEnabled={false}
            
          />
        <Text style={styles.title}>Compare with...</Text>
        <View style={{flex:1.5}}>
        <CheckBox fontFamily='Montserrat' center title="Your Student's Overall Performance Over Time" onPress={() => {this.setState((pastState) => {return {timeChecked: !pastState.timeChecked}}, () => {this.updateRadar();});}}
  checked={this.state.timeChecked}></CheckBox>
  <CheckBox fontFamily='Montserrat' center title={'Average Level ' + this.state.userLevel + ' Drivers'} onPress={() => {this.setState((pastState) => {return {allChecked: !pastState.allChecked}}, () => {this.updateRadar();});}}
  checked={this.state.allChecked}></CheckBox>
  </View>

        <View style={{flex: 0, flexDirection:"row"}}>
                <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'ParentHome'}],});}} style={styles.startButton}>
                  <View>
                  <Image style={styles.image} source={require("../../assets/images/home.png")}></Image>
                  <Text style={styles.startText}>Home</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight disabled={true} underlayColor="rgba(95, 128, 59, .5)"
                 onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'ParentReportsMain'}],});}} style={styles.startButtonSelected}>
                    <View>
                    <Image style={styles.image} source={require("../../assets/images/chart.png")}></Image>
                    <Text style={styles.startText}>Reports</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight  underlayColor="rgba(95, 128, 59, .5)"
                onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'ParentAccount'}],});}} style={styles.startButton}>
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
                <Text style={styles.name}>Professor Drive</Text>
            </View>
      </View>

    :
    <View style={[{flex: 1, justifyContent:"space-evenly"}]}>
    <View style={{flex: 0, flexDirection:"row", backgroundColor: "#C4D9B3"}}>
    <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
             onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'Roads'}],});}} style={styles.topStartButton}>
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
            <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" disabled={true}
             onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'Safety'}],});}} style={styles.topStartButtonSelected}>
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
            <Text style={styles.title}>Practice driving this week to see your safety scores!</Text>
        </View>
  </View>

<View style={{flex: 0, flexDirection:"row"}}>
<TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'ParentHome'}],});}} style={styles.startButton}>
<View>
<Image style={styles.image} source={require("../../assets/images/home.png")}></Image>
<Text style={styles.startText}>Home</Text>
</View>
</TouchableHighlight>
<TouchableHighlight disabled={true} underlayColor="rgba(95, 128, 59, .5)"
onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'ParentReportsMain'}],});}} style={styles.startButtonSelected}>
<View>
<Image style={styles.image} source={require("../../assets/images/chart.png")}></Image>
<Text style={styles.startText}>Reports</Text>
</View>
</TouchableHighlight>
<TouchableHighlight  underlayColor="rgba(95, 128, 59, .5)"
onPress={() => {this.props.navigation.reset({index: 0,routes: [{name: 'ParentAccount'}],});}} style={styles.startButton}>
<View>
<Image style={styles.image} source={require("../../assets/images/account.png")}></Image>
<Text style={styles.startText}>Account</Text>
</View>
</TouchableHighlight>
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
    fontSize: 16,
    textAlign:"center",
    zIndex: 2,
},
  chart: {
    flex: 4,
    marginTop:200, 
    height:100,
    //backgroundColor: '#C4D9B3',
    borderRadius:16,
    zIndex:1,
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

export default ParentSafety;