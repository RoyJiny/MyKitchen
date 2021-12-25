import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

import { Chat,BackButton } from '../../components';
import { send_post_request } from '../../utils/requests';

const ChatScreen = ({navigation,route}) => {
  const {customer_id,customer_name,kitchen_id,kitchen_name,isCustomer} = route.params;
  
  const notify_on_message = (text) => {
    send_post_request('chats/sent_message',{customer_id,customer_name,kitchen_id,kitchen_name,isCustomer,text})
      .then(() => {})
      .catch(err => console.log(err));
  }

  return <View style={styles.container}>
    <View style={{alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', marginLeft: 4, marginBottom: 4}}>
      <BackButton onClick={() => {
        if (isCustomer) navigation.navigate('MyProfileInternal');
        else navigation.navigate('ChatsInternal');
      }}/>
      <Text style={styles.title}>Chat with {isCustomer ? kitchen_name : customer_name}</Text>      
    </View>
    <Chat customer_id={customer_id} kitchen_id={kitchen_id} isCustomer={isCustomer} notify_on_message={notify_on_message}/>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4,
    marginTop: 12
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
  }
});

export default ChatScreen;