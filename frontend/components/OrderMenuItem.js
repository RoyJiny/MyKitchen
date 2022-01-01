import React,{useState} from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';

import Colors from '../globals/Colors';
import ShadowCard from './ShadowCard';
import ImageWithIndicator from './ImageWithIndicator';


const OrderMenuItem = ({itemName,price,description,count,setCount,imgLink}) => {
  const [expand, setExpand] = useState(false);
  const [numOfLines, setNumOfLines] = useState(2);

  const handleTextLayout = e => {
    setNumOfLines(e.nativeEvent.lines.length);
  };

  return (
    <View style={{justifyContent: 'center'}}>
      <View style={{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:16
      }}>

        <ImageWithIndicator imageStyle={{width: 70, height:  70, borderRadius: 10}} imgLink={imgLink}/>

        <View style={{marginLeft: 4}}>
          <Text numberOfLines={1} style={styles.title}>{itemName}</Text>
          <Text numberOfLines={expand ? 0 : 2} onTextLayout={handleTextLayout} style={styles.description}>
            {description}
          </Text>
          {
            numOfLines > 2 ?
            <TouchableOpacity onPress={() => {setExpand(e => !e)}} >
              <Text style={styles.expand}>Show {expand ? 'Less' : 'More'}</Text>
            </TouchableOpacity>
            : null
          }
        </View>

        <View style={{alignItems:'center', flexDirection: 'row', height: 50, marginTop: 10}}>
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
    fontSize: 16,
    width: 170
  },
  price: {
    fontSize: 14
  },
  description: {
    fontSize: 12,
    color: Colors.lightGray,
    width: 150
  },
  expand: {
    fontSize: 12,
    color: Colors.lightGray,
    fontWeight: 'bold'
  }
});

export default OrderMenuItem;