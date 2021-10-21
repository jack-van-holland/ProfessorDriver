# ProfessorDriver

## Prototype Demo (turn on sound for narration)

https://user-images.githubusercontent.com/60764738/138349350-eacf9dc3-dcfc-4434-bb9f-01123352b620.mov

## About

Developed by Jack Van Holland, Sophia Xu, and Gongqi Huang

Professor Driver is a React Native app that tracks teenage driver’s driving behavior, providing feedback and evaluation to them and their parents to allow them to learn more safely and effectively. The app uses a smartphone’s built-in hardware devices, including GPS, accelerometers, and gyroscopes to detect dangerous driving habits including hard braking, excessive acceleration, and taking corners too quickly. In addition to the raw hardware data, GPS locations are reverse geocoded using the OpenStreetMap API to estimate the speed limit and any potential speeding.  

The app is designed for both student and parent accounts and is customized for both of these user types. Alerts and progress reports help keep parents informed of any patterns of unsafe behavior to help guide their children to secure habits or intervene in the case of repeated dangerous behaviors. Yet, student privacy is considered, informing students of what data is shared and providing parents with high-level statistics rather than specific location information. Additionally, Professor Driver is more than a simple risk assessment or monitoring tool, it is an educational tool that provides supplemental feedback and support for a learning driver, designed scientifically with teenage psychology in mind. A gamified design alongside intuitive analytics visualizations inspires students to continuously improve their safe driving. Students will be able to engage in self-reflection, examine their progress over time or compared with other drivers, and achieve the driving goals that they set. 

Alongside this prototype, we have developed a comprehensive business strategy and written business plan. We became finalists in the Johns Hopkins University Business Plan Competition after presenting our prototype and business plan. The full document can be accessed below.

https://docs.google.com/document/d/1Ifs7cfCeH8rvisHmA2yOPNyhI_yuE1SBmldvdWWjVJs/edit?usp=sharing

## Installing / Getting started

### Usage Limitations and Notes
This project is no longer maintained, and the Firebase backend no longer serves the app. 

Theoretically it could be easily extended to Android, but currently permissions and firebase is not configured to be supported in Android. Further, ios simulators should not be used, because they do not have hardware sensors.

### Built With
We are using React-native for our mobile app development.

### Prerequisites
    npm: 7.6.0,
    node: 15.11.0,
    watchman: 4.9.0,
    CocoaPods: 1.10.1,
    Xcode: 12.4
    
### Setup

A quick introduction of the minimal setup you need to get the app up & running.

```shell
git clone git@github.com:jack-van-holland/ProfessorDriver.git
cd ProfessorDriver

npm install 
npm install -g ios-deploy

cd ios
pod install

cd ..
npx react-native link

npx react-native start # on another terminal at the same directory

# to run it in the simulator
npx react-native run-ios

# to run it on a ios device
npx react-native run-ios --device "Your Phone"
```
