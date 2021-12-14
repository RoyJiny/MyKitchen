import React, { useState, useEffect} from 'react'
import { View, StyleSheet, ScrollView, RefreshControl, Dimensions } from 'react-native'

import {Tag,Backdrop,OrderCard,BlankDivider} from '../../components';
import Colors from '../../globals/Colors';

import { send_get_request } from '../../utils/requests';

const SellerOrdersScreen = ({ navigation }) => {
  const [tagList, setTagList] = useState([]);

  const addTag = (text) => {
    setTagList([...tagList, text])
  }

  const removeTag = (text) => {
    setTagList(tagList.filter(t => t !== text))
  }
  const [Items, setItems] = useState([])
  
  const get_data_from_server = () => {
    send_get_request('orders/seller/get_orders')
      .then(data => setItems(data))
      .catch(err => {console.log(err);setItems([])});
  }
  
  useEffect(get_data_from_server, []);

  const [Refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true);
    get_data_from_server();
    setRefreshing(false);
  }

  return (
    <View>
      <View>
        <Backdrop text='Orders' height={80} />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.tags}>
          <Tag text="Pending Approval" textColor="black" add={addTag} remove={removeTag} />
          <Tag text="Waiting For Payment" textColor="black" add={addTag} remove={removeTag} />
          <Tag text="In the Making" textColor="black" add={addTag} remove={removeTag} />
          <Tag text="Ready for Customer" textColor="black" add={addTag} remove={removeTag} />
          <Tag text="Done" textColor="black" add={addTag} remove={removeTag} />
        </ScrollView>
      </View>
      <ScrollView vertical={true}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={true}
        style={styles.scroll}
        refreshControl={<RefreshControl refreshing={Refreshing} onRefresh={onRefresh} />}>
        {
          Items.slice().reverse().filter(item => tagList.includes(item.status) || tagList.length == 0).map((item, index) => {
            return (
                <View style={styles.order} key={index}>
                  <OrderCard
                    onClick={() => navigation.navigate("OrderPreview", {item})}
                    orderNumber={item._id}
                    orderStatus={item.status}
                    orderDate={item.date}
                    customer={item.customer.name}
                    price={item.price}
                  />
                  <View style={{ height: 1, borderWidth: 0.5, borderColor: Colors.lightGray, marginVertical: 16 }} />
                </View>
            )
          })
        }
        <BlankDivider height={16}/>
      </ScrollView>
    </View>
  )

};

SellerOrdersScreen.navigationOptions = (props) => {
  return {};
};


const styles = StyleSheet.create({
  tags: {
    marginBottom: 8,
    height: 40,
    marginHorizontal: 8
  },

  order: {
  },

  scroll: {
    paddingTop: 4,
    maxHeight: Dimensions.get('window').height * 0.77,
    paddingHorizontal: 8,
  }

});

export default SellerOrdersScreen;