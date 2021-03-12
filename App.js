/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  Logo,
  Button,
  StatusBar,
  Outset,
  Platform
} from 'react-native';

import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes
} from "react-native-sensors";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import BootstrapStyleSheet from 'react-native-bootstrap-styles';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

class App extends React.Component {
  state = {
    accel: 0,
    xhistory: [],
    yhistory: [],
    zhistory: [],
    pressed: false,
    calibrating: false,
    ready: false,
    xbase: 0,
    ybase: 0,
    zbase: 0,
    time: 0,
  }
  
  onPress = () => {
    this.setState({calibrating:true})
    //wait a minute to exclude button press acceleration
    setTimeout(() => {
      //listen to the acceleromter
      accelerometer.subscribe(({x, y, z, time}) => {

        //scale based on platform
        x = Platform.OS === 'ios' ? x * 9.8: x;
        y = Platform.OS === 'ios' ? y * 9.8: y;
        z = Platform.OS === 'ios' ? z * 9.8: z;
        
        //scale from calibration
        x = x - this.state.xbase;
        y = y - this.state.ybase;
        z = z - this.state.zbase;
  
        //calculate total accel
        let curr = Math.sqrt(x * x + y * y + z * z);

        //record this
        this.setState(prevState => ({
          accel: curr,
          xhistory: [...prevState.xhistory, x],
          yhistory: [...prevState.yhistory, y],
          zhistory: [...prevState.zhistory, z],
        }))
      });
      //spend 5 seconds calibrating
      setTimeout(() => {
        this.setState(prevState => ({
          //find the averages of each axis
          xbase: prevState.xhistory.reduce((a,b) => a + b) / prevState.xhistory.length,
          ybase: prevState.yhistory.reduce((a,b) => a + b) / prevState.yhistory.length,
          zbase: prevState.zhistory.reduce((a,b) => a + b) / prevState.zhistory.length,
          ready: true,
        }))
      }, 5000);
    }, 1000);
  }
  render() {
    return (
      
      <View style = {{flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',}} >
      {/*display certain text/buttons depending on state*/}
      { //if ready, display acceleration and whether this is safe
        this.state.ready ? (<><Text style={styles.sectionTitle}>
        Accelerometer value: {this.state.accel} 
        </Text>
        <Text style={styles.sectionTitle}>
        Safe? {Math.abs(this.state.accel) < .47 ? "Yes" : "No"} 
        </Text>
        </>
        ) 
        //otherwise, if calibrating, display for the user to wait.
        : this.state.calibrating ? <Text style={styles.sectionTitle}>
          Calibrating, please wait.
        </Text> 
        //otherwise, if ready to calibrate, let user click when ready
        : this.state.pressed ?  <Button title="Please place in a stable spot and press here to calibrate"
        style={styles.button}
        onPress={() => this.onPress()}
        color="#FFD433">
        </Button> 
        //otherwise, just let user click when ready to start
        : 
          <Button
          title="Start Drive"
          style={styles.button}
          onPress={() => this.setState({pressed:true})}
          color="#FFD433"
          
        />
        }
      
        
        </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
