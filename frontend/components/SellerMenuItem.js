import React from 'react';
import {View,Text,TouchableOpacity,Image,StyleSheet, Dimensions} from 'react-native';

import Colors from '../globals/Colors';
import ShadowCard from './ShadowCard';

const SellerMenuItem = ({itemName,price,description,imgLink}) => {
  return (
    <View style={{justifyContent: 'center'}}>
    <View style={{
      flexDirection:'row',
      justifyContent:'space-between',
      marginHorizontal:16,
      alignItems: 'center'
    }}>
        <View style={{flexDirection:"row", alignItems:"center"}}>
            <Image style={styles.image} source={{uri:imgLink}}/>
            <View>
                <Text style={styles.title}>{itemName}</Text>
                <Text numberOfLines={2} style={styles.description}>{description}</Text>
            </View>
        </View>
        <View style={{alignSelf: 'center'}}>
            <Text style={styles.price}>${price}</Text>
        </View>
    
    </View>

    <View style={{
      borderColor: Colors.lightGray,
      borderWidth:0.25,
      height:1,
      marginHorizontal: 16,
      marginVertical: 8
    }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 16,
  },
  title: {
    fontSize: 20
  },
  price: {
    fontSize: 16,
    textAlign: 'right',
  },
  description: {
    fontSize: 16,
    color: Colors.lightGray,
    width: 200
  }
});

export default SellerMenuItem;