import React, {useState} from 'react';
import {StatusBar, View} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import * as Icons from '@expo/vector-icons'

import Colors from './globals/Colors';

import LoginScreen from './screens/LoginScreen';
import ExploreScreen from './screens/ExploreScreen'
import MyOrdersScreen from './screens/MyOrdersScreen';

const Stack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator();

const LoginStack = (loginCB) => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login">
        {props => <LoginScreen loginCB={loginCB}/>}
      </Stack.Screen>
    </Stack.Navigator>
  )
};

const getTabIcon = (route,color) => {
  const size = 20;
  switch(route.name) {
    case 'Explore':
      return <Icons.FontAwesome5 name='wpexplorer' size={size} color={color}/>
    case 'MyOrders':
      return <Icons.FontAwesome name='list' size={size} color={color}/>
    default:
      return null
  }
}

const TabsNavigator = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Explore"
      activeColor={Colors.black}
      inactiveColor={Colors.lightGray}
      barStyle={{
        backgroundColor: 'transparent',
        shadowColor: 'transparent',
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
            width: 0,
          },
          elevation: 0,
      }}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color}) => getTabIcon(route,color)
      })}
    >
        <Tabs.Screen
          name="Explore"
          component={ExploreScreen}
        />
        <Tabs.Screen
          name="MyOrders"
          component={MyOrdersScreen}
        />
    </Tabs.Navigator>
  );
};

export default function APP() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginCB = () => {setIsLoggedIn(true)};
  const signoutCB = () => {setIsLoggedIn(false)};
  
  return (
    <View style={{flex:1}}>
      <View style={{ height: StatusBar.currentHeight, backgroundColor: Colors.black }} />
      <ExpoStatusBar style="light" />
      <NavigationContainer>
        {isLoggedIn
          ? TabsNavigator()
          : LoginStack(loginCB)
        }
      </NavigationContainer>
    </View>
  );
};
