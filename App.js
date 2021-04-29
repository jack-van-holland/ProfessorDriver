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
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import BootstrapStyleSheet from 'react-native-bootstrap-styles';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import auth from '@react-native-firebase/auth';
import { WelcomeScreen, SignupRole, SignupContact, SignupExperience, 
  Scan, SignupGoals, Home, Login, ScanConfirm, Drive, 
 StartDrive, Reflection, ParentHome, Account, ParentAccount,
  ReportsMain, Safety, Skills, Roads, Progress, EndDrive, 
  Log, LogStats, Checklist, Accident, Mount, Level, Warning,
  Curfew, CurfewTime, Grounded,
} from './app/screens';

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;



const Stack = createStackNavigator();

class App extends React.Component {
  
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator 
          //initialRouteName={auth().currentUser ? "Home" : "WelcomeScreen"}
          initialRouteName="WelcomeScreen"

          screenOptions={{
            headerShown: false,
            animationEnabled: false,
          }}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="SignupRole" component={SignupRole} />
          <Stack.Screen name="SignupContact" component={SignupContact} />
          <Stack.Screen name="Scan" component={Scan} />
          <Stack.Screen name="SignupExperience" component={SignupExperience} />
          <Stack.Screen name="SignupGoals" component={SignupGoals} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ScanConfirm" component={ScanConfirm} />
          <Stack.Screen name="StartDrive" component={StartDrive} />
          <Stack.Screen name="Drive" component={Drive} />
          <Stack.Screen name="Reflection" component={Reflection}/>
          <Stack.Screen name="ParentHome" component={ParentHome}/>
          <Stack.Screen name="Account" component={Account}/>
          <Stack.Screen name="ParentAccount" component={ParentAccount}/>
          <Stack.Screen name="ReportsMain" component={ReportsMain}/>
          <Stack.Screen name="Skills" component={Skills}/>
          <Stack.Screen name="Progress" component={Progress}/>
          <Stack.Screen name="Roads" component={Roads}/>
          <Stack.Screen name="Safety" component={Safety}/>
          <Stack.Screen name="EndDrive" component={EndDrive}/>
          <Stack.Screen name="Log" component={Log}/>
          <Stack.Screen name="LogStats" component={LogStats}/>
          <Stack.Screen name="Checklist" component={Checklist}/>
          <Stack.Screen name="Accident" component={Accident}/>
          <Stack.Screen name="Mount" component={Mount}/>
          <Stack.Screen name="Level" component={Level}/>
          <Stack.Screen name="Warning" component={Warning}/>
          <Stack.Screen name="Curfew" component={Curfew}/>
          <Stack.Screen name="CurfewTime" component={CurfewTime}/>
          <Stack.Screen name="Grounded" component={Grounded}/>








        



        </Stack.Navigator>
      </NavigationContainer>
      );
    {/*

      <SafeAreaView style={styles.loginButton}>
        <Image source={require("./app/assets/icon.png")}/>
        <LoginApp />
      </SafeAreaView>
      -------------

      <View style = {{flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',}} >
       <Button
          title="Use Sensor"
      
      <View style = {{flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',}} >
      {/*display certain text/buttons depending on state*/}
      {/* //if ready, display acceleration and whether this is safe
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
      */}
    //);
  }
}

const styles = StyleSheet.create({
  loginButton: {
    flex: 1,
    backgroundColor: "#F3F3F5",
    justifyContent: "center",
    alignItems: "center",
  },
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
