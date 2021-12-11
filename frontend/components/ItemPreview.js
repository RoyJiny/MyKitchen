import React from 'react';
import {Text,View,StyleSheet,Image} from 'react-native';

import Colors from '../globals/Colors';

const ItemPreview = ({OrderName,number}) => {
  return (
    <View style={{flexDirection:"row", justifyContent:"space-between",marginBottom:8}}>
      <View style={{flexDirection:"row"}}>
        {/* <Image style={styles.image} source={{ uri: imgLink }}/> */}
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
    height: 50,
    width: 50,
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
