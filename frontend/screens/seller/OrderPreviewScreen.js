import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../globals/Colors';
import {BlankDivider,ItemPreview} from '../../components';

const OrderPreviewScreen = ({ navigation, route }) => {
  const { order, items } = route.params;

  return (
    <ScrollView style={{marginHorizontal: 16}} showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.body}>
          <Icon style={{ marginLeft: 16, marginRight: 16, marginTop: 8, }}
            name="angle-left"
            size={40}
            color="black"
            underlayColor="blue"
            onPress={() => navigation.goBack()}>
          </Icon>
          <Text style={styles.orderNum}>{"Order #" + order.key}</Text>
        </View>
        
        <View>
          <View style={{ marginBottom: 20 }}>
            
            <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
              <Text style={styles.title}>Order:</Text>
              <Text style={styles.date}>{order.date}</Text>
            </View>
          </View>
          <ScrollView>{
            order.items.map((item,index) => {
              return (
                <ItemPreview key={index} OrderName={item.name} number={item.amount} imgLink={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPPVgeegVDlt8YwrzQDHsno8GY0cQ4LV0eMQ&usqp=CAU"}/>
              )
            })
          }
          </ScrollView>
          
          <Text style={styles.title}>Notes:</Text>
          <View>
            <Text style={{padding:4, }}>{order.customer.notes}</Text>
          </View>
          <View style={{height:1, borderWidth:0.5, borderColor:Colors.lightGray, marginVertical:16}}/>
          
          <Text style={styles.title}>Customer Info:</Text>
          <Text style={{fontSize: 16}}>Name: {order.customer.name}</Text>
          <Text style={{fontSize: 16}}>Address: {order.customer.address}</Text>
          <Text style={{fontSize: 16}}>Phone: {order.customer.phone}</Text>
          
          <View style={{height:1, borderWidth:0.5, borderColor:Colors.lightGray, marginVertical:16}}/>
          
          <Text style={styles.title}>Delivery Date:</Text>
          <Text style={{fontWeight:"bold", fontSize: 16}}>{order.ddate}</Text>
          
          <View style={{height:1, borderWidth:0.5, borderColor:Colors.lightGray, marginVertical:16}}/>
          
          <Text style={styles.title}>Status:</Text>
          <Text style={{fontSize: 16, fontWeight:"bold", color:Colors.green}}>Waiting For Approval</Text>
          <Text style={{fontSize: 16, fontWeight:"bold", color:Colors.green}}>Waiting For Payment</Text>
          <Text style={{fontSize: 16, fontWeight:"bold", color:Colors.orange}}>In The Oven</Text>
          <Text style={{fontSize: 16, fontWeight:"bold", color:Colors.lightGray}}>Delivered</Text>
        </View>
      </View>
      <BlankDivider height={16} />
    </ScrollView>
  )
};

OrderPreviewScreen.navigationOptions = (props) => {
  return {};
};

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',

  },
  orderNum: {
    fontSize: 40,
    marginLeft: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    alignSelf: "flex-start",
  },
  date: {
    color: "#808080",
    alignSelf: 'flex-end',
    fontSize: 24,
  }
});

export default OrderPreviewScreen;