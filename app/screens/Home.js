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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
var ztable = require('ztable');

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { RadarChart } from 'react-native-charts-wrapper';
import { Alert } from 'react-native';


class Home extends React.Component {

  constructor() {
    super();

    this.state = {};
  }



  componentDidMount() {
    console.log("mounted");
    console.log(this.state.userLevel);

    firestore().collection('users').doc(auth().currentUser.uid).get().then((userData) => {
      if (userData._data.newReport) {
        Alert.alert("New Driving report available!");
        this.props.navigation.navigate("EndDrive", {startDrive: userData._data.newReport});
        return;
      }
      else {
        firestore().collection('users').doc(auth().currentUser.uid).get().then((data) => {
          firestore().collection('statistics').doc(String(data._data.level)).get().then((statData) => {
            const minDate = String(Date.now() - 604800000);
            firestore().collection('users').doc(auth().currentUser.uid).collection('reports').where(firestore.FieldPath.documentId(), '>=', minDate).get().then((reportData) => {
              const statMean = (Number(statData._data.accelMean) + Number(statData._data.turnMean) +
                Number(statData._data.phoneMean) + Number(statData._data.brakeMean) + Number(statData._data.speedMean)) / 5;
              const count = Number(statData._data.count);
              const stdMean = (Math.sqrt(Number(statData._data.accelM2) / count) + Math.sqrt(Number(statData._data.turnM2) / count) +
                Math.sqrt(Number(statData._data.phoneM2) / count) + Math.sqrt(Number(statData._data.brakeM2) / count)
                + Math.sqrt(Number(statData._data.speedM2) / count)) / 5;
              let userMean = 0;
              let userCount = 0;
              reportData._docs.forEach(element => {
                const thisMean = (Number(element._data.accel) + Number(element._data.phone) + Number(element._data.turn)
                  + Number(element._data.brake) + Number(element._data.speed)) / 5;
                userMean += thisMean;
                userCount += 1;
              });
              if (userCount == 0) {
                this.setState({ week: false });
              } else {
                userMean /= userCount;
                const z = (userMean - statMean) / stdMean;
                const percentile = ztable(z);
                this.setState({ week: true, percentile: (percentile * 100).toFixed(0) });
              }
            });
          });
          this.setState({
            userLevel: { points: data._data.points.toFixed(0), level: data._data.level, }
          }, () => { console.log(this.state.userLevel); });
        });
      }
    })
  }

  render() {

    return (
      this.state.userLevel ?
        <View style={[styles.container, { flex: 1, justifyContent: "space-between" }]}>
          <Text style={[styles.title, { marginTop: 50, flex: 0 }]}>Professor Driver</Text>
          <Text style={[styles.subtitle, { flex: 1 }]}>Welcome!</Text>

          <View style={{ backgroundColor: '#E1F6D0', borderRadius: 16, marginBottom: 70, marginHorizontal: 10, flex: 5 }}>
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
                flex: 0

                //  height:"50px",
              }}
            />
            {this.state.userLevel.level !== 10 ?
              <Text style={[styles.text, { flex: 0 }]}>You need {3000 - this.state.userLevel.points} more points to level up! </Text> : null}
            {this.state.percentile ?
              <Text style={[styles.text, { flex: 0 }]}>This week you drove more safely than {this.state.percentile}% of drivers at your level. </Text> :
              <Text style={[styles.text, { flex: 0 }]}>You haven't practiced driving yet this week. </Text>}

          </View>
          <View style={{ flex: 0, flexDirection: "row", backgroundColor: "#C4D9B3" }}>
            <TouchableHighlight disabled={true} underlayColor="rgba(95, 128, 59, .5)"
              onPress={() => { navigation.reset({ index: 0, routes: [{ name: 'Home' }], }); }} style={styles.startButtonSelected}>
              <View>
                <Image style={styles.image} source={require("../assets/images/home.png")}></Image>
                <Text style={styles.startText}>Home</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
              onPress={() => { this.props.navigation.navigate("ReportsMain") }} style={styles.startButton}>
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
            <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
              onPress={() => { this.props.navigation.navigate("Account") }} style={styles.startButton}>
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
            <Image style={styles.logo} source={require("../assets/images/icon.png")} />
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

  }, background: {
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
    borderTopColor: "#F3F3F5",
    borderBottomColor: "#C4D9B3",
    paddingBottom: 15,
    paddingTop: 15,
    flex: 1,
    borderWidth: 1,
    height: 90,
    alignItems: "center",
    justifyContent: "center"
  }, startButtonSelected: {
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
  logo: {
    width: 150,
    height: 123
  },
  chart: {
    flex: 4,
    marginTop: 200,
    height: 100,
    //backgroundColor: '#C4D9B3',
    borderRadius: 16,
  }
});

export default Home;