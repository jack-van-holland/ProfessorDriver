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
    baseline: 0,
  }
  onPress = () => {
  accelerometer.subscribe(({x, y, z, time}) => {
    if (!this.state.baseline) {
      this.setState({baseline: Math.abs(x) + Math.abs(y) + Math.abs(z)});
    }
    let base = this.state.baseline;
    let curr = Math.abs(x) + Math.abs(y) + Math.abs(z);
    console.log({ x, y, z, time, base, curr})
    this.setState({ accel: curr});
  });
  }
  render() {
    return (
      <View style = {{flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',}} >
      <Button
          title="Use Sensor"
          style={styles.button}
          onPress={() => this.onPress()}
          color="#FFD433"
          
        />
        <Text style={styles.sectionTitle}>
        Accelerometer value: {this.state.accel}
        </Text>
        <Text style={styles.sectionTitle}>
        Safe? {Math.abs(this.state.accel - this.state.baseline) < 0.47 ? "yes" : "no"}
        </Text>
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
