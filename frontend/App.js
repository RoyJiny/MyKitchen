import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();
const createStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen}/>
    </Stack.Navigator>
  )
};

export default function APP() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {createStack()}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
