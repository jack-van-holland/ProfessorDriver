import React, { useState, useEffect } from 'react';
import {StyleSheet, View, ScrollView, Text, processColor, TouchableHighlight, Image} from "react-native";

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
import {PieChart, RadarChart} from 'react-native-charts-wrapper';
import { Dimensions } from "react-native";


const LogStats = ({ navigation, route}) => {

    // read report from db
    const [log, setLog] = useState();
    const {uid} = auth().currentUser;

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
    const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800'];

    return (
      <View style={styles.background}>
        <View style={{flex: 12, padding: 20}}>
          <View style={{flex: 0.5}} />
          <View style={[styles.container, {flex: 10}]}>
            <Text style={styles.title}>{route.params.timestamp}</Text>

            <ScrollView contentContainerStyle={{alignItems: "center", justifyContent: "center"}}>

            {
              log ? [
              <Text style={styles.logText}>Score: {log.score.toFixed(0)}</Text>,
              <Text style={styles.logText}>
                  Duration: {
                  ((new Date(log.endDate*1)-new Date(log.startDate*1))/1000/60).toFixed(2)
                  } mins
              </Text>,
              <Text style={styles.logText}>Start: {new Date(log.startDate * 1).toUTCString()}</Text>,
              <Text style={styles.logText}>End: {new Date(log.endDate * 1).toUTCString()}</Text>,
              <Text style={styles.logText}>Max Velocity: {log.maxVel.toFixed(2)} km/h</Text>,
              <Text style={styles.logText}>Velocity</Text>,
              <Text style={styles.logText}>Acceleration</Text>,

              // <View>
                // <PieChart
                  
                // />

              <PieChart
            
                style={styles.chart}
                data={
                  {
                    label: 'Pie dataset',
                    dataSets: [{
                      values: [{value: 45, label: 'Residential'},
                        {value: 22, label: 'Highway'},
                        {value: 10, label: 'Rural'},
                        {value: 9, label: 'Interstate'},
                        {value: 15, label: 'City'}],
                      config: {
                        colors: [processColor('#699249'), processColor('#75a351'), processColor('#8fb86f'), processColor('#a9c891'), processColor('#c4d9b3'),],
                        valueTextSize: 0,
                        valueTextColor: 0,
                      }, label: "Roads"
                    }],
                  }
                }
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
              
              />,

              ]

              : <Text>Loading</Text>
            }

            </ScrollView>
          </View>
          </View>
      
        <View style={[styles.startContainer, {flex: 1}]}>
            {/* <View style={styles.startButton}>
                <Text style={styles.startText}>Start Driving</Text>
            </View> */}
        </View>

      </View>
    );
  }

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#E5E5E5",
        flexDirection: "column",
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
        fontSize: 30,
        paddingTop: 10
    },
    note: {
        fontFamily: "Montserrat-Italic",
        color: "black",
        fontSize: 18,
        paddingTop: 5
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
        fontFamily: "Montserrat",
        color: "black",
        fontSize: 18,
        //paddingTop: 10
    },
    chart: {
      flex: 4,
      marginTop:200, 
      height:100,
      //backgroundColor: '#C4D9B3',
      borderRadius:16,
    },
})

export default LogStats;