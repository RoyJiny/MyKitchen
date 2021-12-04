import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

import Colors from '../globals/Colors';

const OrderCustomer = ({order,setRatingState,setShowRating, setLinksState,setShowLinks,setNavigationState,setShowNavigation}) => {
    return (
      <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8}}>
        <View style={{flexDirection: 'row'}}>
          <Image style={{ height: 80, width: 80, borderRadius: 10, marginRight: 16}} source={{uri: order.kitchen.bio.coverImg}}/>
          
          <View>
            <Text style={{fontSize: 18}}>{order.kitchen.bio.name}</Text>
            {order.status != 'Pending Approval' && order.status != null? 
            <TouchableOpacity onPress={() => {setNavigationState(order.kitchen.bio.street+', '+order.kitchen.bio.city);setShowNavigation(true);}} >
              <Text style={{fontSize: 14, color:'#0066CC', fontWeight:'bold'}}>show address</Text>
            </TouchableOpacity> : null}
            {order.items.length > 0 ? <Text numberOfLines={1} style={{width: 150, fontSize: 14, color: Colors.lightGray}}>{order.items[0].name}   x{order.items[0].quantity}</Text> : null}
            {order.items.length > 1 ? <Text numberOfLines={1} style={{width: 150, fontSize: 14, color: Colors.lightGray}}>{order.items[1].name}   x{order.items[1].quantity}</Text> : null}
            {order.items.length > 2 ? <Text numberOfLines={1} style={{width: 150, fontSize: 14, color: Colors.lightGray}}>...</Text> : null}
          </View>
        </View>
  
        <View style={{alignSelf: 'center'}}>
          {order.status !== null ? <Text style={{textAlign: 'center', fontSize: 14}}>{order.status}</Text> : null}
          <Text style={{textAlign: 'center', fontSize: 14}}>${order.price}</Text>
          <Text style={{textAlign: 'center', fontSize: 14, color: Colors.lightGray}}>{order.dueDate}</Text>
          {order.status == 'Waiting Payment'? 
          <TouchableOpacity onPress={() => {setLinksState(order.kitchen.logistics.paymentLinks);setShowLinks(true);}} >
            <Text style={{textAlign: 'center', fontSize: 14, color:'#0066CC', fontWeight:'bold'}}>payment links</Text>
          </TouchableOpacity> : null}
          {order.rated == false ?
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