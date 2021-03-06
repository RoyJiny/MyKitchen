import React, {useState,useEffect,useRef} from 'react';
import {StatusBar, View, I18nManager, ActivityIndicator} from 'react-native';

import { NavigationContainer,DefaultTheme  } from '@react-navigation/native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import {Restart} from 'fiction-expo-restart';

import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import axios from 'axios';

import { UserContext } from "./contexts/UserContext";
import { SellerContext } from "./contexts/SellerContext";
import { generalContext } from "./contexts/generalContext";
import { chatContext } from "./contexts/chatContext";

import Colors from './globals/Colors';
import {LoginStack,CustomerTabsNavigator,SellerTabsNavigator} from './screens/stacks'
import {NetworkErrorAlert} from './components';

import { getAuthToken, deleteAuthToken } from './api/async_storage';
import { send_get_request,send_post_request } from './utils/requests';
import { remote_log} from './utils/debug_log';

const SEND_REMOTE_LOGS = false;

I18nManager.allowRTL(false);  
I18nManager.forceRTL(false); 

console.reportErrorsAsExceptions = false;

// for debug only
if (SEND_REMOTE_LOGS) {
  var native_log = console.log;
  console.log = (...texts) => {
    const text = ''.concat(texts);
    if (text.indexOf('Running "main" with') === -1) remote_log(text,'<log-server-address>');
    native_log(text);
  }
}

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
  console.reportErrorsAsExceptions = false;
  
  const [expoPushToken, setExpoPushToken] = useState('');
  const responseListener = useRef();
  const navigationRef = useRef();
  const [user, setUser] = useState({});
  const [seller, setSeller] = useState({});
  const [state, setState] = useState({isLoggedIn: false, isCustomer: false});
  const [isLoading, setIsLoading] = useState(true);
  const [activeChat, setActiveChat] = useState(undefined);
  const [generalData, setGeneralData] = useState({
    location: undefined,
    notification_data: undefined,
    networkError: false,
    unpaidShown: false
  });

  axios.interceptors.response.use((response) => {
    return response;
  }, (err) => {
    if(err.response.status !== 401 && err.response.data.err !== 'Phone number is invalid') setGeneralData({...generalData, networkError: true})
    return Promise.reject(err);
  });

  useEffect(() => {
    if(I18nManager.isRTL) 
    {
      I18nManager.allowRTL(false);  
      I18nManager.forceRTL(false); 
      Restart();
    }
  },[]);


  const init_user_contexts = () => {
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

  const handleNotificationData = data => {
    if (state.isLoggedIn && navigationRef.current) {
      if (data.type === 'Order') {
        if (state.isCustomer) {
          navigationRef.current.navigate('MyProfile',{
            screen: 'MyProfileInternal',
            params: {orderData: data.order}
          })
        } else {
          navigationRef.current.navigate('Orders',{
            screen: 'OrderPreview',
            params: {item: data.order}
          })
        }
      } else if (data.type === 'Chat') {
        if (state.isCustomer) {
          navigationRef.current.navigate('MyProfile',{
            screen: 'Chat',
            params: {...data.chatData},
            initial: false
          })
        } else {
          navigationRef.current.navigate('Messages',{
            screen: 'Chat',
            params: {...data.chatData}
          })
        }
      } else {
        console.log('Error: bad notification type:',data.type);
      }      
    } else {
      setGeneralData({...generalData, notification_data: data});
    }
  }

  const isNotificationFromActiveChat = (notification,activeChat) => {
    if (notification.request.content.data.type !== 'Chat') return false;
    if (activeChat == undefined || notification.request.content.data.chatData == undefined) return false;
    const isCustomer = notification.request.content.data.chatData.isCustomer;
    const chat = !isCustomer ? notification.request.content.data.chatData.customer_id : notification.request.content.data.chatData.kitchen_id;
    return chat === activeChat;
  }

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async (notification) => {
        const shouldNotify = !isNotificationFromActiveChat(notification,activeChat);
        return {
          shouldShowAlert: shouldNotify,
          shouldPlaySound: shouldNotify,
          shouldSetBadge: shouldNotify
        }
      },
      handleError: err => console.log(`notification handling error: ${err}`)
    });
  },[activeChat]);

  useEffect(() => {
    init_user_contexts();
    
    Location.requestForegroundPermissionsAsync()
      .then(data => {
        if (data.status !== 'granted') {
          console.log('Permission to access location was denied');
        } else {
          Location.getCurrentPositionAsync({})
            .then(loc => setGeneralData({
              ...generalData
              ,location: {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude
              }
            }))
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))

    registerForPushNotificationsAsync().then(token => setExpoPushToken(token)).catch(err => console.log('Failed to register for push notifications,',err));
  },[]);
  
  useEffect(() => {
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      handleNotificationData(response.notification.request.content.data)
    });

    const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';
    TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data, error, executionInfo }) => {
      handleNotificationData(data)
    });
    Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  },[state]);

  useEffect(() => {
    if (state.isLoggedIn && expoPushToken !== '') {
      send_post_request('users/notification_token',{expo_token: expoPushToken})
        .then(()=>{})
        .catch(err => console.log(`Failed to send notification token: ${err}`));
    }
  },[expoPushToken]);

  const loginCB = (isSeller) => {
    if (expoPushToken !== '') {
      send_post_request('users/notification_token',{expo_token: expoPushToken})
        .then(()=>{})
        .catch(err => console.log(`Failed to send notification token: ${err}`));
    }
    setState({isLoggedIn: true, isCustomer: !isSeller});
  };

  const signoutCB = async () => {
    await send_get_request("users/signout");
    await deleteAuthToken();      
    setState({isLoggedIn: false, isCustomer: true});
    init_user_contexts();
    setGeneralData({...generalData, unpaidShown: false});
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
                setIsLoading(false);
                setUser({...user, ...user_data});
                loginCB(user_data.isSeller);
              })
              .catch(err => {
                setIsLoading(false);
                console.log(err);
              })
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
      <View style={{ height: StatusBar.currentHeight, backgroundColor: generalData.networkError ? Colors.alertRed :Colors.black }} />
      {generalData.networkError ? <NetworkErrorAlert dismiss={() => setGeneralData({...generalData, networkError: false})}/> : null}
      <ExpoStatusBar style="light" />
      <UserContext.Provider value={{user, setUser}}>
      <SellerContext.Provider value={{seller, setSeller}}>
      <generalContext.Provider value={{generalData, setGeneralData}}>
      <chatContext.Provider value={{activeChat, setActiveChat}}>
        <NavigationContainer theme={AppTheme} ref={navigationRef}>
          {state.isLoggedIn
            ? (state.isCustomer ? CustomerTabsNavigator(signoutCB) : SellerTabsNavigator(signoutCB))
            : LoginStack(loginCB)
          }
        </NavigationContainer>
      </chatContext.Provider>
      </generalContext.Provider>
      </SellerContext.Provider>
      </UserContext.Provider>
    </View>
  );
};
