/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
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

import auth from '@react-native-firebase/auth';

auth()
  .signInAnonymously()
  .then(() => {
    console.log('User signed in anonymously');
  })
  .catch(error => {
    if (error.code === 'auth/operation-not-allowed') {
      console.log('Enable anonymous in your firebase console.');
    }

    console.error(error);
  });

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

function LoginApp() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}

class App extends React.Component {



  state = {
    accel: 0,
    baseline: 0,
  }
  onPress = () => {
  accelerometer.subscribe(({x, y, z, time}) => {
    let curr = Platform.OS === 'ios' ? Math.sqrt(x * x + y * y + z * z) * 9.8 : Math.sqrt(x * x + y * y + z * z);
    if (!this.state.baseline) {
      this.setState({baseline: curr});
    }
    let base = this.state.baseline;
    console.log({ x, y, z, time, base, curr})
    this.setState({ accel: curr});
  });
  }
  render() {
    return (
      <View style = {{flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',}} >
      <LoginApp />
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
