import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  Image
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
      <View style={{flex: 1}}>

        <View style={[styles.container, {flex: 1, justifyContent:"space-between"}]}>
          <Text style={[styles.title, {marginTop:50}]}>Welcome!</Text>
          
          <View style={{backgroundColor:'#C4D9B3', borderRadius: 16, height : 300}}>
          <Text style={styles.title}>Level {this.state.userLevel.level}</Text>

          <ProgressChart
          data={[this.state.userLevel.points / 3000]}
          width={Dimensions.get('window').width - 16}
          height={250}
          radius={100}
          hideLegend={true}
          chartConfig={{
            backgroundGradientFrom: '#C4D9B3',
            backgroundGradientTo: '#C4D9B3',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
            
          //  height:"50px",
          }}
        />
        {this.state.userLevel.level !== 10 ? 
        <Text style={styles.title}>You need {3000 - this.state.userLevel.points} more points
         to move to Level {this.state.userLevel.level + 1}</Text> : null}

  </View>
</View>

        
          <RadarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            chartDescription={{text: ''}}
            legend={{enabled:false}}
            rotationEnabled = {false}
            yAxis={{drawLabels:false, axisMinimum:0, axisMaximum:8}}
            drawWeb={true}
            highlightPerTapEnabled={false}
            
          />
        

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
  }
});

export default Home;