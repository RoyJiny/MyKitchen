import React from 'react';
import {StatusBar, View} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import Colors from './globals/Colors';

const Stack = createStackNavigator();
const createStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen}/>
    </Stack.Navigator>
  )
};

export default function APP() {
  return (
    <View style={{flex:1}}>
      <View style={{ height: StatusBar.currentHeight, backgroundColor: Colors.black }} />
      <ExpoStatusBar style="light" />
      <NavigationContainer>
        {createStack()}
      </NavigationContainer>
    </View>
  );
};
