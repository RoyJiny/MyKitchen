import React from 'react';

import * as Icons from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Colors from '../../globals/Colors';

import LoginScreen from '../login/LoginScreen';
import SellerSigninScreen from '../login/SellerSigninScreen'
import KitchenBioScreen from '../login/KitchenBioScreen'
import AddDishesScreen from '../login/AddDishesScreen'
import LogisticsScreen from '../login/LogisticsScreen'
import ExploreScreen from '../customer/ExploreScreen'
import MyProfileScreen from '../customer/MyProfileScreen';
import SearchScreen from '../customer/SearchScreen';
import OrderScreen from '../customer/OrderScreen';
import KitchenPageScreen from '../customer/KitchenPage';
import MyKitchenScreen from '../seller/MyKitchenScreen';
import SellerOrdersScreen from '../seller/SellerOrdersScreen';
import KitchenPreviewScreen from '../seller/KitchenPreviewScreen';
import OrderPreviewScreen from '../seller/OrderPreviewScreen';
import EditBioScreen from '../seller/EditBioScreen';
import EditMenuScreen from '../seller/EditMenuScreen';
import EditLogisticsScreen from '../seller/EditLogisticsScreen';
import SellerChatsScreen from '../seller/SellerChatsScreen';
import ChatScreen from '../common/ChatScreen';

const Stack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator();

const getTabIcon = (route,color) => {
  const size = 20;
  switch(route.name) {
    case 'Explore':
      return <Icons.FontAwesome5 name='wpexplorer' size={size} color={color}/>
    case 'MyProfile':
      return <Icons.AntDesign name='user' size={size} color={color}/>
    case 'My Kitchen':
      return <Icons.Entypo name='shop' size={size} color={color}/>
    case 'Orders':
      return <Icons.FontAwesome5 name='clipboard-list' size={size} color={color}/>
    case 'Search':
      return <Icons.Feather name='search' size={size} color={color}/>
    case 'Messages':
      return <Icons.Entypo name='chat' size={size} color={color}/>
    default:
      return null
  }
}

// LOGIN

export const LoginStack = (loginCB) => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login">
        {props => <LoginScreen loginCB={loginCB} {...props}/>}
      </Stack.Screen>
      <Stack.Screen name="SellerSignin" component={SellerSigninScreen}/>
      <Stack.Screen name="KitchenBio" component={KitchenBioScreen}/>
      <Stack.Screen name="AddDishes" component={AddDishesScreen}/>
      <Stack.Screen name="Logistics">
        {props => <LogisticsScreen loginCB={() => loginCB(true)} {...props}/>}
      </Stack.Screen>
    </Stack.Navigator>
  )
};

// CUSTOMER

const CustomerSearchStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SearchInternal"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="SearchInternal" component={SearchScreen}/>
      <Stack.Screen name="KitchenPage" component={KitchenPageScreen}/>
      <Stack.Screen name="Chat" component={ChatScreen}/>
      <Stack.Screen name="Order" component={OrderScreen}/>
    </Stack.Navigator>
  );
};

const CustomerExploreStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ExploreInternal"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="ExploreInternal" component={ExploreScreen}/>
      <Stack.Screen name="KitchenPage" component={KitchenPageScreen}/>
      <Stack.Screen name="Chat" component={ChatScreen}/>
      <Stack.Screen name="Order" component={OrderScreen}/>
    </Stack.Navigator>
  );
};

const CustomerProfileStack = (signoutCB) => {
  return (
    <Stack.Navigator
      initialRouteName="MyProfileInternal"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Chat" component={ChatScreen}/>
      <Stack.Screen name="MyProfileInternal">
      {props => <MyProfileScreen signoutCB={signoutCB} {...props}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export const CustomerTabsNavigator = (signoutCB) => {
  return (
    <Tabs.Navigator
      initialRouteName="Explore"
      activeColor={"white"}
      inactiveColor={Colors.lightGray}
      barStyle={{
        backgroundColor: Colors.black,
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
        tabBarIcon: ({color}) => getTabIcon(route,color),
        unmountOnBlur: true
      })}
    >
      <Tabs.Screen name="Search" component={CustomerSearchStack} />
      <Tabs.Screen name="Explore" component={CustomerExploreStack} />
      <Tabs.Screen name="MyProfile" options={{tabBarLabel: 'My Profile'}}>
        {props => <CustomerProfileStack signoutCB={signoutCB} {...props}/>}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};

// SELLER

const SellerKitchenStack = ({signoutCB}) => {
  return (
    <Stack.Navigator
      initialRouteName="MyKitchenInternal"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="MyKitchenInternal" options={{tabBarLabel: 'My Profile'}}>
        {props => <MyKitchenScreen signoutCB={signoutCB} {...props}/>}
      </Stack.Screen>
      <Stack.Screen name="KitchenPreview" component={KitchenPreviewScreen}/>
      <Stack.Screen name="EditBio" component={EditBioScreen}/>
      <Stack.Screen name="EditMenu" component={EditMenuScreen}/>
      <Stack.Screen name="EditLogistics" component={EditLogisticsScreen}/>
    </Stack.Navigator>
  );
};

const SellerOrdersStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="OrdersInternal"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="OrdersInternal" component={SellerOrdersScreen}/>
      <Stack.Screen name="OrderPreview" component={OrderPreviewScreen}/>
    </Stack.Navigator>
  );
};

const SellerChatsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ChatsInternal"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="ChatsInternal" component={SellerChatsScreen}/>
      <Stack.Screen name="Chat" component={ChatScreen}/>
    </Stack.Navigator>
  );
};

export const SellerTabsNavigator = (signoutCB) => {
  return (
    <Tabs.Navigator
      initialRouteName="Orders"
      activeColor={"white"}
      inactiveColor={Colors.lightGray}
      barStyle={{
        backgroundColor: Colors.black,
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
      <Tabs.Screen name="My Kitchen">
        {props => <SellerKitchenStack signoutCB={signoutCB} {...props}/>}
      </Tabs.Screen>
      <Tabs.Screen name="Orders" component={SellerOrdersStack} />
      <Tabs.Screen name="Messages" component={SellerChatsStack} />
    </Tabs.Navigator>
  );
};
