import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../globals/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import ShadowCard from './ShadowCard';

const OrderCard = ({ onClick, orderNumber, orderStatus, orderDate, customer, price }) => {
  return (
    <TouchableOpacity onPress={onClick} style={{ marginHorizontal: 4 }}>
      <ShadowCard>
        <View style={{ padding: 4,flexDirection: "row", flex:1,marginHorizontal: 4, alignItems:"center" }}>
          <View style={{ flex:6}}>
            <View style={{ flexDirection: "row", justifyContent:"space-between", alignItems:'center' }}>
              <View>
                <Text style={styles.numberReady}>{"Order #" + orderNumber}</Text>
                <Text style={styles.date}>{orderDate}</Text>
                <Text style={styles.customer}>{customer}</Text>
              </View>
              <Text style={getTextStyle(orderStatus)}>{"  "+orderStatus}</Text>
              <Text style={styles.price}>{"$" + price}</Text>
            </View>
          </View>
          <View style={{flex:1}}></View>
          <Icon
            name="angle-right"
            size={40}
            color="black"
            underlayColor="blue"
            style={{marginRight:4}}
            >
          </Icon>
        </View>
      </ShadowCard>
    </TouchableOpacity>
  );
};
getTextStyle = (stat) => {
  if (stat == "Ready") {
    return {
      color: Colors.green,
      textAlign: 'left',
      fontSize: 20,
      fontWeight: 'bold',
    }
  } else {
    return {
      color: Colors.orange,
      textAlign: 'left',
      fontSize: 20,
      fontWeight: 'bold',
    }
  }
}
const styles = StyleSheet.create({
  numberReady: {
    color: "black",
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',

  },
  numberWaiting: {
    color: Colors.orange,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',

  },
  date: {
    color: Colors.lightGray,
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
  },

  customer: {
    color: Colors.black,
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    color: Colors.black,
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderCard;
