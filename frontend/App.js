import React, {useState,useEffect,useRef} from 'react';
import {StatusBar, View, I18nManager, ActivityIndicator} from 'react-native';

import { NavigationContainer,DefaultTheme  } from '@react-navigation/native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';

import { UserContext } from "./contexts/UserContext";
import { SellerContext } from "./contexts/SellerContext";
import { LocationContext } from "./contexts/LocationContext";

import Colors from './globals/Colors';
import {LoginStack,CustomerTabsNavigator,SellerTabsNavigator} from './screens/stacks'

import { getAuthToken, deleteAuthToken } from './api/async_storage';
import { send_get_request,send_post_request } from './utils/requests';

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

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

export default APP = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);  

  const [location, setLocation] = useState({
    longitude: 34.798571,
    latitude: 32.059999
  });

  const [user, setUser] = useState({});
  const [seller, setSeller] = useState({});

  const init_contexts = () => {
    setUser({
      email: '',
      name: '',
      imgUrl: '',
      isSeller: false,
      googleId: '',
      addresses: [],
      favorites: []
    });
    setSeller({
      user: {
        email: '',
        name: '',
        imgUrl: '',
        isSeller: false,
        googleId: '',
        addresses: [],
        favorites: []
      },
      kitchen: {}
    });
  }

  useEffect(() => {
    init_contexts();

    Location.requestForegroundPermissionsAsync()
      .then(data => {
        if (data.status !== 'granted') {
          console.log('Permission to access location was denied');
        } else {
          Location.getCurrentPositionAsync({})
            .then(loc => setLocation({latitude: loc.coords.latitude, longitude: loc.coords.longitude}))
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))

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

  const [state, setState] = useState({isLoggedIn: false, isCustomer: false});
  const [isLoading, setIsLoading] = useState(true);

  const loginCB = (isSeller) => {
    if (expoPushToken != '') {
      send_post_request('users/notification_token',{expo_token: expoPushToken})
        .then(()=>{})
        .catch(err => console.log("Failed to send notification token:",err));
    }
    setState({isLoggedIn: true, isCustomer: !isSeller});
  };
  const signoutCB = () => {
    send_get_request("users/signout")
      .then(() => {
        deleteAuthToken()
          .then(() => {
            setState({isLoggedIn: false, isCustomer: true});
            init_contexts();
          })
          .catch(err => console.log(err))       
      })
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
    getAuthToken()
    .then(auth_token => {
      if (auth_token) {
          send_get_request('users/me')
            .then(user_data => {
              setUser({...user, ...user_data});
              loginCB(user_data.isSeller);
              setIsLoading(false);
            })
            .catch(err => {console.log(err);setIsLoading(false);})
        }
      else{setIsLoading(false);}
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
      <SellerContext.Provider value={{seller, setSeller}}>
      <LocationContext.Provider value={{location, setLocation}}>
        <NavigationContainer theme={AppTheme}>
          {state.isLoggedIn
            ? (state.isCustomer ? CustomerTabsNavigator(signoutCB) : SellerTabsNavigator(signoutCB))
            : LoginStack(loginCB)
          }
        </NavigationContainer>
      </LocationContext.Provider>
      </SellerContext.Provider>
      </UserContext.Provider>
    </View>
  );
};
