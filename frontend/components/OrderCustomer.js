import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import Colors from '../globals/Colors';
import {ServerBase} from '../globals/globals';
import ImageWithIndicator from './ImageWithIndicator';

const OrderCustomer = ({order}) => {
    return (
      <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8}}>
        <View style={{flexDirection: 'row'}}>
          <ImageWithIndicator imageStyle={{height: 55, width: 55, borderRadius: 10, marginRight: 16}} imgLink={`${ServerBase}/images/${order.kitchen.bio.coverImg}`}/>
          <View style={{ /* decide width? or make more robust */}}>
            <Text style={{fontSize: 18}}>{order.kitchen.bio.name}</Text>
            <Text style={{fontSize: 14}}>{order.status}</Text>
          </View>
        </View>
  
        <View style={{alignSelf: 'center', marginRight: 12}}>
          <Text style={{textAlign: 'right', fontSize: 14}}>₪{order.price}</Text>
          <Text style={{textAlign: 'right', fontSize: 14, color: Colors.lightGray}}>{order.dueDate}</Text>
        </View>
      </View>
  
      <View style={{height:1, borderColor: Colors.lightGray, borderWidth: 0.5}}/>
      </View>
    );
  };

  export default OrderCustomer;