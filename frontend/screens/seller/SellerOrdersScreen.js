import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, RefreshControl, Dimensions } from 'react-native'

import {Tag,Backdrop,OrderCard} from '../../components';

const SellerOrdersScreen = ({ navigation }) => {
  const [Items, setItems] = useState([
    { key: 1, order: { key: "1", ddate: "12/10/10", date: "10/10/10", status: "Ready", price: "60", items: [{ name: "cakes", amount: 1 }, { name: "cupcakes", amount: 5 }], special: true, customer: { name: "Ven", phone: "0502222222", address: "nowhere", notes:"bgbg"} } },
    { key: 2, order: { key: "2", ddate: "12/10/10", date: "10/10/10", status: "Ready", price: "60", items: [{ name: "cakes", amount: 1 }, { name: "cupcakes", amount: 5 }], special: false, customer: { name: "Ven", phone: "0502222222", address: "nowhere", notes:"bgbg" } } },
    { key: "3", order: { key: "3", ddate: "12/10/10", date: "10/10/10", status: "Waiting", price: "60", items: [{ name: "cakes", amount: 1 }, { name: "cupcakes", amount: 5 }], special: true, customer: { name: "Ven", phone: "0502222222", address: "nowhere", notes:"bgbg" } } },
    { key: "4", order: { key: "4", ddate: "12/10/10", date: "10/10/10", status: "Waiting", price: "60", items: [{ name: "cakes", amount: 1 }, { name: "cupcakes", amount: 5 }], special: false, customer: { name: "Ven", phone: "0502222222", address: "nowhere", notes:"bgbg" } } },
    { key: "5", order: { key: "5", ddate: "12/10/10", date: "10/10/10", status: "Waiting", price: "60", items: [{ name: "cakes", amount: 1 }, { name: "cupcakes", amount: 5 }], special: true, customer: { name: "Bgbg", phone: "0502222222", address: "nowhere", notes:"bgbg" } } },
    { key: "7", order: { key: "6", ddate: "12/10/10", date: "10/10/10", status: "Waiting", price: "60", items: [{ name: "cakes", amount: 1 }, { name: "cupcakes", amount: 5 }], special: false, customer: { name: "Bgbg", phone: "0502222222", address: "nowhere", notes:"bgbg" } } },
    { key: "8", order: { key: "7", ddate: "12/10/10", date: "10/10/10", status: "Waiting", price: "60", items: [{ name: "cakes", amount: 1 }, { name: "cupcakes", amount: 5 }], special: true, customer: { name: "Bgbg", phone: "0502222222", address: "nowhere", notes:"bgbg" } } },
    { key: "9", order: { key: "8", ddate: "12/10/10", date: "10/10/10", status: "Waiting", price: "60", items: [{ name: "cakes", amount: 1 }, { name: "cupcakes", amount: 5 }], special: false, customer: { name: "Bgbg", phone: "0502222222", address: "nowhere", notes:"bgbg" } } },
    { key: "10", order: { key: "9", ddate: "12/10/10", date: "10/10/10", status: "Waiting", price: "60", items: [{ name: "cakes", amount: 1 }, { name: "cupcakes", amount: 5 }], special: true, customer: { name: "Bgb0", phone: "0502222222", address: "nowhere", notes:"bgbg" } } },
    { key: "11", order: { key: "10", ddate: "12/10/10", date: "10/10/10", status: "Waiting", price: "60", items: [{ name: "cakes", amount: 1 }, { name: "cupcakes", amount: 5 }], special: false, customer: { name: "Bgb0", phone: "0502222222", address: "nowhere", notes:"bgbg" } } },
    { key: "12", order: { key: "11", ddate: "12/10/10", date: "10/10/10", status: "Waiting", price: "60", items: [{ name: "cakes", amount: 1 }, { name: "cupcakes", amount: 5 }], special: true, customer: { name: "Bgb0", phone: "0502222222", address: "nowhere", notes:"bgbg" } } },
    { key: "13", order: { key: "12", ddate: "12/10/10", date: "10/10/10", status: "Waiting", price: "60", items: [{ name: "cakes", amount: 1 }, { name: "cupcakes", amount: 5 }], special: false, customer: { name: "Bgb0", phone: "0502222222", address: "nowhere", notes:"bgbg" } } },
    { key: "14", order: { key: "13", ddate: "12/10/10", date: "10/10/10", status: "Waiting", price: "60", items: [{ name: "cakes", amount: 1 }, { name: "cupcakes", amount: 5 }], special: true, customer: { name: "Bgb0", phone: "0502222222", address: "nowhere", notes:"bgbg" } } },

  ])
  const [Refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true);
    // setItems([...Items, { key: "6", order: { date: "10/10/10", status: "waiting", price: "60", items: { 1:{name:"cakes",amount: 1}, 2:{name:"cupcakes",amount: 5}}, special: true, customer: "Bgb0" } }])
    setRefreshing(false);
  }
  return (
    <View>
      <View>
        <Backdrop text='Orders' height={80} />
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.tags}>
          <Tag text="All" textColor="black" />
          <Tag text="Waiting For Payment" textColor="black" />
          <Tag text="Placed Order" textColor="black" />
          <Tag text="Speacial Event" textColor="black" />
        </ScrollView>
      </View>
      <View style={{ marginBottom: 16 }}>
        <ScrollView vertical={true}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={true}
          style={styles.scroll}
          refreshControl={<RefreshControl refreshing={Refreshing} onRefresh={onRefresh} />}>
          {
            Items.map((order, index) => {
              return (
                <View style={styles.order} key={index}>
                  <OrderCard
                
                    onClick={() => navigation.navigate("OrderPreview", order, order.order.items)}
                    orderNumber={order.key}
                    orderStatus={order.order.status}
                    orderDate={order.order.date}
                    customer={order.order.customer.name}
                    price={order.order.price}
                  />
                </View>)
            })
          }
        </ScrollView>
      </View>
    </View>
  )
};

SellerOrdersScreen.navigationOptions = (props) => {
  return {};
};

const styles = StyleSheet.create({
  tags: {
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  order: {
  },
  scroll: {
    marginBottom: 20,
    maxHeight: Dimensions.get('window').height * 0.7,
    marginLeft: 8,
    marginRight: 8,
  }
});

export default SellerOrdersScreen;