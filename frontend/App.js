import React, {useState,useEffect,useRef} from 'react';
import {StatusBar, View, I18nManager, ActivityIndicator} from 'react-native'

import { NavigationContainer,DefaultTheme  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import * as Icons from '@expo/vector-icons'
import * as Notifications from 'expo-notifications';

import { UserContext } from "./contexts/UserContext";

import Colors from './globals/Colors';

import { getAuthToken, deleteAuthToken } from './api/async_storage';

import LoginScreen from './screens/login/LoginScreen';
import SellerSigninScreen from './screens/login/SellerSigninScreen'
import KitchenBioScreen from './screens/login/KitchenBioScreen'
import AddDishesScreen from './screens/login/AddDishesScreen'
import LogisticsScreen from './screens/login/LogisticsScreen'
import ExploreScreen from './screens/customer/ExploreScreen'
import MyProfileScreen from './screens/customer/MyProfileScreen';
import SearchScreen from './screens/customer/SearchScreen';
import OrderScreen from './screens/customer/OrderScreen';
import KitchenPageScreen from './screens/customer/KitchenPage';
import MyKitchenScreen from './screens/seller/MyKitchenScreen';
import SellerOrdersScreen from './screens/seller/SellerOrdersScreen';
import KitchenPreviewScreen from './screens/seller/KitchenPreviewScreen';
import OrderPreviewScreen from './screens/seller/OrderPreviewScreen';
import EditBioScreen from './screens/seller/EditBioScreen';
import EditMenuScreen from './screens/seller/EditMenuScreen';
import EditLogisticsScreen from './screens/seller/EditLogisticsScreen';

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);
const Stack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

const registerForPushNotificationsAsync = async () => {
  let token;
  
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    console.log('Failed to get push token - need permissions');
    return;
  }
  token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('MyKitchen', {
      name: 'MyKitchen',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250]
    });
  }

  return token;
}

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
    default:
      return null
  }
}

const LoginStack = (customerLoginCB,sellerLoginCB) => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login">
        {props => <LoginScreen loginCB={customerLoginCB} {...props}/>}
      </Stack.Screen>
      <Stack.Screen name="SellerSignin" component={SellerSigninScreen}/>
      <Stack.Screen name="KitchenBio" component={KitchenBioScreen}/>
      <Stack.Screen name="AddDishes" component={AddDishesScreen}/>
      <Stack.Screen name="Logistics">
        {props => <LogisticsScreen loginCB={sellerLoginCB} {...props}/>}
      </Stack.Screen>
    </Stack.Navigator>
  )
};

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
      <Stack.Screen name="Order" component={OrderScreen}/>
    </Stack.Navigator>
  );
};

const CustomerTabsNavigator = (signoutCB) => {
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
        {props => <MyProfileScreen signoutCB={signoutCB} {...props}/>}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};

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

const SellerTabsNavigator = (signoutCB) => {
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
    </Tabs.Navigator>
  );
};

export default APP = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('response:',response);
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  console.log(expoPushToken);
  
  const [state, setState] = useState({isLoggedIn: false, isCustomer: false});
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const customerLoginCB = () => {
    setState({isLoggedIn: true, isCustomer: true});
  };
  const sellerLoginCB = () => {
    setState({isLoggedIn: true, isCustomer: false});
  };
  const signoutCB = () => {
    deleteAuthToken()
      .then(() => setState({isLoggedIn: false, isCustomer: true}))
      .catch(err => console.log(err));
    ;
  };

  const AppTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFFFFF'
    }
  };

  if (isLoading) {
    // try to sign in with existing token
    getAuthToken()
      .then(auth_token => {
        if (auth_token) {
          // send request to /users/me with the token to verify

          // test if returned a user back
          // if yes, test if seller or customer

          isSeller = false; // tmp
          if(true) { // if res status == 200
            if (!isSeller) { // user.isSeller
              customerLoginCB();
            }
          }
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }
  
  if (isLoading) {
    return <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color='black' style={{alignSelf: 'center'}} size={50}/>
    </View>;
  }

  return (
    <View style={{flex:1}}>
      <View style={{ height: StatusBar.currentHeight, backgroundColor: Colors.black }} />
      <ExpoStatusBar style="light" />
      <UserContext.Provider value={{user, setUser}}>
        <NavigationContainer theme={AppTheme}>
          {state.isLoggedIn
            ? (state.isCustomer ? CustomerTabsNavigator(signoutCB) : SellerTabsNavigator(signoutCB))
            : LoginStack(customerLoginCB,sellerLoginCB)
          }
        </NavigationContainer>
      </UserContext.Provider>
    </View>
  );
};
