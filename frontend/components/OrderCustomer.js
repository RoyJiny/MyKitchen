import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import Colors from '../globals/Colors';
import {ServerBase} from '../globals/globals';

const OrderCustomer = ({order,setRatingState,setShowRating, setLinksState,setShowLinks,setNavigationState,setShowNavigation}) => {
    return (
      <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8}}>
        <View style={{flexDirection: 'row'}}>
          <Image style={{ height: 80, width: 80, borderRadius: 10, marginRight: 16}} source={{uri: `${ServerBase}/images/${order.kitchen.bio.coverImg}`}}/>
          
          <View style={{ /* decide width? or make more robust */}}>
            <Text numberOfLines={1} style={{width: 150, fontSize: 18}}>{order.kitchen.bio.name}</Text>
            {order.status != 'Pending Approval' && order.status != 'Done'? 
            <TouchableOpacity onPress={() => {setNavigationState(order.kitchen.bio.street+', '+order.kitchen.bio.city);setShowNavigation(true);}} >
              <Text style={{fontSize: 14, color:'#0066CC', fontWeight:'bold'}}>show address</Text>
            </TouchableOpacity> : null}
            {order.items.length > 0 ? <Text numberOfLines={1} style={{width: 150, fontSize: 14, color: Colors.lightGray}}>{order.items[0].name}   x{order.items[0].quantity}</Text> : null}
            {order.items.length > 1 ? <Text numberOfLines={1} style={{width: 150, fontSize: 14, color: Colors.lightGray}}>{order.items[1].name}   x{order.items[1].quantity}</Text> : null}
            {order.items.length > 2 ? <Text numberOfLines={1} style={{width: 150, fontSize: 14, color: Colors.lightGray}}>...</Text> : null}
          </View>
        </View>
  
        <View style={{alignSelf: 'center' /* decide width? or make more robust */}}>
          {order.status !== null ? <Text style={{textAlign: 'center', fontSize: 12}}>{order.status}</Text> : null}
          <Text style={{textAlign: 'center', fontSize: 14}}>${order.price}</Text>
          <Text style={{textAlign: 'center', fontSize: 14, color: Colors.lightGray}}>{order.dueDate}</Text>
          {order.status == 'Waiting For Payment'? 
          <TouchableOpacity onPress={() => {setLinksState(order.kitchen.logistics.paymentLinks);setShowLinks(true);}} >
            <Text style={{textAlign: 'center', fontSize: 14, color:'#0066CC', fontWeight:'bold'}}>payment links</Text>
          </TouchableOpacity> : null}
          {order.rated == false && order.status == "Done" ?
          <TouchableOpacity onPress={() => {setRatingState({id: order._id, rating: 3});setShowRating(true);}} >
            <Text style={{textAlign: 'center', fontSize: 14, color:'#0066CC', fontWeight:'bold'}}>rate seller</Text>
          </TouchableOpacity> : null}
        </View>
      </View>
  
      <View style={{height:1, borderColor: Colors.lightGray, borderWidth: 0.5}}/>
      </View>
    );
  };

  export default OrderCustomer;