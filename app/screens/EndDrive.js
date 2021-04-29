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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const screenWidth = Dimensions.get("window").width;
import colors from "../config/colors";
import { CheckBox } from "react-native-elements";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { RadarChart } from 'react-native-charts-wrapper';


class EndDrive extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  initializeChart = (driveData, driveLength) => {
    this.setState({
      safetyData: { drive: driveData, }
    }, () => {
      console.log(this.state);
      this.setState((pastState) => {
        let score = 0;
        for (let i = 0; i < pastState.safetyData.drive.length; i++) {
          score += pastState.safetyData.drive[i];
        }
        score /= pastState.safetyData.drive.length;
        return {
          score: score,
          driveLength: driveLength,
          data: {
            dataSets: [{
              values: pastState.safetyData.drive,
              label: 'DS 1',
              config: {
                color: processColor('#FF8C9D'),
                drawFilled: true,
                drawValues: false,
                fillColor: processColor('#FF8C9D'),
                fillAlpha: 100,
                lineWidth: 2
              }
            },],
          },
          xAxis: {
            fontFamily: "Montserrat",
            valueFormatter: ['     Gentle\nAcceleration', '  Avoiding\nPhone Use', ' Slowing\nfor Turns', 'Proper\nSpeed', ' Gentle\nBraking'],
          }
        }
      }
        , () => {
          firestore().collection("users").doc(auth().currentUser.uid).get().then((data) => {
            let newPoints = Number(data._data.points) + this.state.score * this.state.driveLength;
            let level = false;
            if (newPoints > 3000) {
              newPoints -= 3000;
              firestore().collection("users").doc(auth().currentUser.uid).update({
                points: newPoints,
                level: data._data.level + 1,
              });
              this.setState({ levelUp: true, level: data._data.level + 1 });
            } else {
              firestore().collection("users").doc(auth().currentUser.uid).update({
                points: newPoints,
              });
            }

          }); console.log(this.state);
        });
    });
  };

  componentDidMount() {
    firestore().collection("users").doc(auth().currentUser.uid).collection("reports").doc(String(this.props.route.params.startDrive)).get().then(
      (data) => {
        console.log(String(this.props.route.params.startDrive));
        console.log(data);
        const driveData = [];
        driveData.push(data._data.accel);
        driveData.push(data._data.phone);
        driveData.push(data._data.turn);
        driveData.push(data._data.speed);
        driveData.push(data._data.brake);
        this.initializeChart(driveData, data._data.duration);
      }).catch(
        (error) => { console.log(error); this.setState({ driveLength: -1 }); });
  }

  render() {

    return (
      this.state.driveLength ? this.state.driveLength !== -1 ?
        <View style={{ flex: 1 }}>

          <View style={[styles.container, { flex: 0, justifyContent: "space-between", paddingTop: 50 }]}>

            <Text style={[styles.title,]}>Great practice!</Text>
            <Text style={[styles.text,]}>Here's how you did: </Text>



          </View>


          <RadarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            chartDescription={{ text: '' }}
            legend={{ enabled: false }}
            rotationEnabled={false}
            yAxis={{ drawLabels: false, axisMinimum: 0, axisMaximum: 8 }}
            drawWeb={true}
            highlightPerTapEnabled={false}

          />
          <View style={[styles.container, { flex: 1 }]}>
            <Text style={[styles.subtitle, { flex: 1 }]}>Drive Safety Score: {this.state.score.toFixed(2)}</Text>
            <Text style={[styles.text, { flex: 1 }]}>({this.state.driveLength} minutes) x ({this.state.score.toFixed(2)} driving score bonus)</Text>
            <Text style={[styles.subsubtitle, { flex: 1 }]}>+{Math.ceil(this.state.driveLength * this.state.score)} Points!</Text>

          </View>



          <View style={{ flex: 0, flexDirection: "row" }}>
            <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
              onPress={() => { firestore().collection('users').doc(auth().currentUser.uid).update( {
                newReport: false,
              }).then(() => { 
                if (this.state.levelUp) { this.props.navigation.navigate("Level", { level: this.state.level }); } else { this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }], }); } });}} style={styles.startButton}>
              <View>
                <Text style={styles.startText}>Done</Text>
              </View>
            </TouchableHighlight>
          </View>

        </View>

        : <View style={styles.background}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../assets/images/icon.png")} />
            <Text style={styles.name}>Whoops, something went wrong.</Text>
            <View style={{ flex: 0, flexDirection: "row" }}>
              <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                onPress={() => { firestore().collection('users').doc(auth().currentUser.uid).update( {
                  newReport: false,
                }).then(() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }], });}); }} style={styles.startButton}>
                <View>
                  <Text style={styles.startText}>Done</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View> :
        <View style={styles.background}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../assets/images/icon.png")} />
            <Text style={styles.name}>Professor Driver</Text>
          </View>
        </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    //borderRadius: 19,
    alignItems: "center",
    //justifyContent: "center"
  },
  title: {
    fontFamily: "Montserrat",
    color: "black",
    fontWeight: "bold",
    fontSize: 35,
    //paddingTop: 10,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center"

  }, subtitle: {
    fontFamily: "Montserrat",
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    //paddingTop: 10,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center"

  }, subsubtitle: {
    fontFamily: "Montserrat",
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    //paddingTop: 10,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center"

  },
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
    fontSize: 20,
    textAlign: "center",
    zIndex: 2,
  },
  chart: {
    flex: 4,
    //marginTop:200, 
    height: 100,
    backgroundColor: 'white',
    //borderRadius:16,
    zIndex: 1,
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
  topStartButton: {
    backgroundColor: "#C4D9B3",
    borderRightColor: "#F3F3F5",
    borderLeftColor: "#F3F3F5",
    borderTopColor: "#F3F3F5",
    borderBottomColor: "#C4D9B3",
    paddingBottom: 15,
    paddingTop: 50,
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
    borderTopColor: "#F3F3F5",
    borderBottomColor: "rgba(95, 128, 59, 255)",
    paddingBottom: 15,
    paddingTop: 50,
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
    borderTopColor: "#F3F3F5",
    borderBottomColor: "#C4D9B3",
    paddingBottom: 15,
    paddingTop: 0,
    flex: 1,
    borderWidth: 1,
    height: 80,
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
});

export default EndDrive;