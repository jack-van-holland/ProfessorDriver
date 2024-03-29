import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  Image,
  TouchableHighlight,
  ScrollView,
  FlatList,
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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { RadarChart } from 'react-native-charts-wrapper';


class Skills extends React.Component {

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
    console.log("mounted");
    firestore().collection('users').doc(auth().currentUser.uid).get().then((data) => {
      console.log(data._data);
      const userSkills = [Number(data._data.statistics.goodSkills.lane), Number(data._data.statistics.goodSkills.mirrors),
      Number(data._data.statistics.goodSkills.speed), Number(data._data.statistics.goodSkills.signal)];
      const userChallenges = [Number(data._data.statistics.badSkills.parking), Number(data._data.statistics.badSkills.distractions),
      Number(data._data.statistics.badSkills.merging), Number(data._data.statistics.badSkills.left)];
      console.log(userSkills);
      console.log(userChallenges);
      this.setState({
        skillsData: {
          labels: ["Lane Centering", "Mirrors", "Speed Control", "Signals"],
          datasets: [
            {
              data: userSkills,
            }
          ]
        },
        challengesData: {
          labels: ["Parking", "Distractions", "Merging", "Left Turns"],
          datasets: [
            {
              data: userChallenges,
            }
          ]
        },
      });
    });}});


  }


  render() {

    return (
      this.state.skillsData ?
        <View style={{ flex: 1 }}>

          <View style={[styles.container, { flex: 1, justifyContent: "space-between" }]}>
            <View style={{ flex: 0, flexDirection: "row", backgroundColor: "#C4D9B3" }}>
              <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'Roads' }], }); }} style={styles.topStartButton}>
                <View>
                  <Image style={styles.image} source={require("../../assets/images/road.png")}></Image>
                  <Text style={styles.topStartText}>Roads</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'Progress' }], }); }} style={styles.topStartButton}>
                <View>
                  <Image style={styles.image} source={require("../../assets/images/progress.png")}></Image>
                  <Text style={styles.topStartText}>Progress</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'ReportsMain' }], }); }} style={styles.topStartButton}>
                <View>
                  <Image style={styles.image} source={require("../../assets/images/learning.png")}></Image>
                  <Text style={styles.topStartText}>Tips</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
                onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'Safety' }], }); }} style={styles.topStartButton}>
                <View>
                  <Image style={styles.image} source={require("../../assets/images/car.png")}></Image>
                  <Text style={styles.topStartText}>Safety</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)" disabled={true}
                onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'Skills' }], }); }} style={styles.topStartButtonSelected}>
                <View>
                  <Image style={styles.image} source={require("../../assets/images/skills.png")}></Image>
                  <Text style={styles.topStartText}>Skills</Text>
                </View>
              </TouchableHighlight>
            </View>
            <Text style={[styles.title,]}>Based on your reflections, we've identified these skills:</Text>

            <Text style={[styles.subtitle,]}>Your Strengths</Text>


            <BarChart
              style={styles.chart}
              data={this.state.skillsData}
              width={screenWidth - 50}
              height={200}
              yAxisLabel={{}}

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
                flex: 0,
                marginLeft: 25,
                paddingRight: 25,


                //  height:"50px",
              }}
              withHorizontalLabels={false}

            //verticalLabelRotation={30}
            />
            <Text style={[styles.subtitle,]}>Your Challenges</Text>

            <BarChart
              style={styles.chart}
              data={this.state.challengesData}
              width={screenWidth - 50}
              height={200}

              chartConfig={{
                backgroundGradientFrom: '#FFCCCB',
                backgroundGradientTo: '#FFCCCB',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(187, 113, 111, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              withHorizontalLabels={false}
              style={{
                marginVertical: 8,
                borderRadius: 16,
                flex: 0,
                marginLeft: 25,
                paddingRight: 25,
                paddingBottom: 15

                //  height:"50px",
              }}
            //verticalLabelRotation={30}
            />
          </View>





          <View style={{ flex: 0, flexDirection: "row" }}>
            <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
              onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'Home' }], }); }} style={styles.startButton}>
              <View>
                <Image style={styles.image} source={require("../../assets/images/home.png")}></Image>
                <Text style={styles.startText}>Home</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight disabled={true} underlayColor="rgba(95, 128, 59, .5)"
              onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'ReportsMain' }], }); }} style={styles.startButtonSelected}>
              <View>
                <Image style={styles.image} source={require("../../assets/images/chart.png")}></Image>
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
                <Image style={styles.image} source={require("../../assets/images/turning.png")}></Image>
                <Text style={styles.startText}>Drive</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
              onPress={() => { this.props.navigation.navigate("Log") }} style={styles.startButton}>
              <View>
                <Image style={styles.image} source={require("../../assets/images/diary.png")}></Image>
                <Text style={styles.startText}>Log</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor="rgba(95, 128, 59, .5)"
              onPress={() => { this.props.navigation.reset({ index: 0, routes: [{ name: 'Account' }], }); }} style={styles.startButton}>
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
            <Image style={styles.logo} source={require("../../assets/images/icon.png")} />
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
  }, title: {
    fontFamily: "Montserrat",
    color: "black",
    fontWeight: "bold",
    fontSize: 22,
    paddingTop: 10,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center"

  },
  subtitle: {
    fontFamily: "Montserrat",
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
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
    marginTop: 200,
    height: 100,
    //backgroundColor: '#C4D9B3',
    borderRadius: 16,
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
});

export default Skills;