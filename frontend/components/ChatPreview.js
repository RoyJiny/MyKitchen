import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import * as Icons from '@expo/vector-icons'

import Colors from '../globals/Colors';

const ChatPreview = ({username,last_message,navigateToChat}) => {
  
  return (
    <TouchableOpacity onPress={navigateToChat} style={{marginBottom: 8}}>
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{username}</Text>
          <Text style={styles.message} numberOfLines={1}>
            {last_message.isFromCustomer ? username : "You"}
            {":  " + last_message.text}
          </Text>
        </View>

        <Icons.FontAwesome
          name="angle-right"
          size={36}
          color="black"
          underlayColor="blue"
          style={{ marginRight: 4 }}
        />
      </View>
      <View style={{height:1,borderColor:Colors.lightGray,borderWidth:0.5,marginTop:8}}/>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  message: {
    fontSize: 16,
    color: Colors.lightGray,
    width: Dimensions.get('window').width * 0.7
  }
});

export default ChatPreview;