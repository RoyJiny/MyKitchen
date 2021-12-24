import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

import { Chat,BackButton } from '../../components';

const ChatScreen = ({navigation,route}) => {
  const {customer_id,customer_name,kitchen_id,kitchen_name,isCustomer} = route.params;

  return <View style={styles.container}>
    <View style={{alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', marginLeft: 4, marginBottom: 4}}>
      <BackButton onClick={() => navigation.goBack()}/>
      <Text style={styles.title}>Chat with {isCustomer ? kitchen_name : customer_name}</Text>
      
    </View>
    <Chat customer_id={customer_id} kitchen_id={kitchen_id} isCustomer={isCustomer}/>
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