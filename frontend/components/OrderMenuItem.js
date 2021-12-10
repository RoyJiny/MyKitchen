import React, {useState} from 'react';
import {View,Text,TouchableOpacity,Image,StyleSheet, ActivityIndicator} from 'react-native';

import Colors from '../globals/Colors';
import ShadowCard from './ShadowCard';

const OrderMenuItem = ({itemName,price,description,count,setCount,imgLink}) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <View style={{justifyContent: 'center'}}>
    <View style={{
      flexDirection:'row',
      justifyContent:'space-between',
      marginHorizontal:16,
      alignItems: 'center'
    }}>

      <View style={{width: 70, height: 70, borderRadius: 10, alignContent:'center'}}>
        <Image style={{width: 70, height: (isLoading ? 0 : 70), borderRadius: 10}} source={{uri:imgLink}} onLoadEnd={ ()=>{{setIsLoading(false);}}}/>
        <ActivityIndicator style={{ marginTop:20 ,alignSelf: 'center', display: (isLoading ? 'flex' : 'none') }} size={30} color="black" />
      </View>

      <View>
        <Text style={styles.title}>{itemName}</Text>
        <Text numberOfLines={2} style={[styles.description,{ width: 150 }]}>{description}</Text>
      </View>

      <Text style={styles.price}>₪{price}</Text>

      <ShadowCard>
        <View style={{flexDirection: 'row',alignItems:'center'}}>
          <TouchableOpacity onPress={() => setCount(-1)}>
            <Text style={styles.setCountText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.countText}>{count}</Text>
          <TouchableOpacity onPress={() => setCount(1)}>
            <Text style={styles.setCountText}>+</Text>
          </TouchableOpacity>
        </View>
      </ShadowCard>

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
    borderRadius: 10
  },
  setCountText: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 16
  },
  countText: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14
  },
  title: {
    fontSize: 16
  },
  price: {
    fontSize: 14
  },
  description: {
    fontSize: 12,
    color: Colors.lightGray
  }
});

export default OrderMenuItem;