# Demo Branch

This branch has a frontend with pre-populated data for a demo of the app. Sign in/sign up and drive log still connects to the, but drives and reports are only frontend, demo versions.

# ProfessorDriver

Professor Driver is an app that tracks teenage driver’s driving behavior, providing feedback and evaluation to them and their parents to allow them to learn more safely and effectively. The app will use a smartphone’s built-in hardware devices, including GPS, accelerometers, and gyroscopes to detect dangerous driving habits including hard braking, speeding, excessive acceleration, and taking corners too quickly. The app will also help keep parents informed of any patterns of unsafe behavior to help guide their children to secure habits. However, rather than a simple risk assessment or monitoring tool, Professor Driver is an educational tool that provides supplemental feedback and support for a learning driver, designed scientifically with teenage psychology in mind. Students will be able to engage in self-reflection, examine their progress over time or compared with other drivers, and achieve the driving goals that they set. 

The figma design is in Link [https://www.figma.com/file/fCGYuvnQ6OmFSPfHq5UqlM/Prof.-Driver?node-id=0%3A1]

## Installing / Getting started

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
