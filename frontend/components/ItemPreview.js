import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,Dimensions} from 'react-native';

import Colors from '../globals/Colors';

import BlankDivider from './BlankDivider'

const ItemPreview = ({OrderName,number,imgLink}) => {
  return (
    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
      <View style={{flexDirection:"row"}}>
        <Image style={styles.image} source={{ uri: imgLink }}/>
        
        <View style={{marginLeft:16}}>
            <Text style={styles.name}>{OrderName}</Text>
            <Text style={styles.subtitle}>x{number}</Text>
        </View>
      </View>
        
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 60,
    width: 60,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  name: {
    color: Colors.black,
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.lightGray,
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 'bold',
  }
});

export default ItemPreview;
