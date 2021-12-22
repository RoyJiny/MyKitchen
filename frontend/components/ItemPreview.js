import React from 'react';
import {Text,View,StyleSheet,Image} from 'react-native';

import Colors from '../globals/Colors';

const ItemPreview = ({OrderName,number}) => {
  return (
    <View style={{flexDirection:"row", alignItems: 'center', marginBottom:8}}>
      <Text style={styles.name}>{OrderName}</Text>
      <Text style={styles.subtitle}>x{number}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    color: Colors.black,
    textAlign: 'left',
    fontSize: 16,
  },
  subtitle: {
    color: Colors.lightGray,
    textAlign: 'left',
    fontSize: 14,
    marginLeft: 8
  }
});

export default ItemPreview;
