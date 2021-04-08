import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor
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


class ParentHome extends React.Component {

  constructor() {
    super();

    this.state = {
      data: {},
      legend: {
        enabled: true,
        textSize: 14,
        form: 'CIRCLE',
        wordWrapEnabled: true
      }
    };
  }

  componentDidMount() {
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

      <View style={{flex: 1}}>

        <View style={[styles.container]}>
                    <Text style={styles.title}>Before You Drive</Text>
                    <Text style={styles.note}>“Here is a quick reminder of your reflection from last time”</Text>
                   
        </View>

        <View>
  <Text>Bezier Line Chart</Text>
  <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>

        
          <RadarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            chartDescription={{text: ''}}
            legend={{enabled:false}}
            rotationEnabled = {false}
            yAxis={{drawLabels:false, axisMinimum:0, axisMaximum:7}}
            drawWeb={true}
            highlightPerTapEnabled={false}
            
          />
        

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
    flex: 4
  }
});

export default ParentHome;