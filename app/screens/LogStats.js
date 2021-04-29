import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, processColor, TouchableHighlight, Image } from "react-native";

import colors from "../config/colors";

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { TabRouter } from '@react-navigation/native';

import {
  LineChart,
  BarChart,
  // PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { PieChart, RadarChart } from 'react-native-charts-wrapper';
import { Dimensions } from "react-native";


const LogStats = ({ navigation, route }) => {

  // read report from db
  const [log, setLog] = useState();
  const { uid } = auth().currentUser;

  const getLog = async () => {
    try {
      const snap = await firestore()
        .collection(`users/${uid}/reports`)
        .doc(`${route.params.timestamp}`)
        .get();
      setLog(snap.data());
    } catch {
      console.error("cant access firestore");
    }
  };

  useEffect(() => {
    getLog();
  }, []);

  const chart_wh = 250;
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800'];

  return (
    log ?
      <View style={{ flex: 1 }}>
        <View style={[styles.background, { flex: 2, paddingTop: 50 }]}>
          <View style={[styles.container, { flex: 1 }]}>
            <Text style={styles.title}>{new Date(route.params.timestamp * 1).toUTCString()}</Text>

            <Text style={styles.logText}>Score: {log.score.toFixed(0)}</Text>
            <Text style={styles.logText}>
              Duration: {
                ((new Date(log.endDate * 1) - new Date(log.startDate * 1)) / 1000 / 60).toFixed(2)
              } mins
              </Text>
            <Text style={styles.logText}>Start: {new Date(log.startDate * 1).toUTCString()}</Text>
            <Text style={styles.logText}>End: {new Date(log.endDate * 1).toUTCString()}</Text>
            <Text style={styles.logText}>Max Velocity: {log.maxVel.toFixed(2)} km/h</Text>
            <Text style={styles.logText}>Velocity</Text>
            <Text style={styles.logText}>Acceleration</Text>

          </View>
        </View>

        <PieChart

          style={styles.chart}
          data={
            {
              label: 'Pie dataset',
              dataSets: [{
                values: [{ value: 45, label: 'Residential' },
                { value: 22, label: 'Highway' },
                { value: 10, label: 'Rural' },
                { value: 9, label: 'Interstate' },
                { value: 15, label: 'City' }],
                config: {
                  colors: [processColor('#699249'), processColor('#75a351'), processColor('#8fb86f'), processColor('#a9c891'), processColor('#c4d9b3'),],
                  valueTextSize: 0,
                  valueTextColor: 0,
                }, label: "Roads"
              }],
            }
          }
          legend={{ enabled: false }}
          highlightPerTapEnabled={false}
          extraOffsets={{ left: 5, right: 5, }}
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
        <TouchableHighlight onPress={() => { navigation.goBack(); }}
          style={styles.backButtonSelected}>
          <Text style={styles.nexttext}>Back</Text>
        </TouchableHighlight>
      </View>

      :
      <View style={styles.bottomBackground}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../assets/images/icon.png")} />
          <Text style={styles.name}>Professor Driver</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#F3F3F5",
    flexDirection: "column",
  },
  bottomBackground: {
    flex: 1,
    backgroundColor: "#F3F3F5",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 19,
    alignItems: "center",
    //justifyContent: "center"
  },
  startContainer: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Montserrat",
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    paddingTop: 10
  },
  note: {
    fontFamily: "Montserrat-Italic",
    color: "black",
    fontSize: 18,
    paddingTop: 5
  },
  name: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 33,
    lineHeight: 100,
    letterSpacing: 0.015
  },
  historyContainer: {
    backgroundColor: "white",
    width: 300,
    borderRadius: 5,
    borderColor: colors.PDgreen,
    borderWidth: 1,
    alignItems: "center",
    //paddingTop: 10
  },
  logText: {
    flex: 1,
    fontFamily: "Montserrat",
    color: "black",
    fontSize: 18,
  },
  chart: {
    flex: 5,
    height: 100,
    //backgroundColor: '#C4D9B3',
    borderRadius: 16,
  },
  backButtonSelected: {
    width: 121,
    height: 40,
    left: 125,
    marginBottom: 25,
    backgroundColor: '#87B258',
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  nexttext: {
    fontFamily: "Montserrat",
    color: "#F3F3F5",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  }, logo: {
    width: 150,
    height: 123
  }, logoContainer: {
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
})

export default LogStats;