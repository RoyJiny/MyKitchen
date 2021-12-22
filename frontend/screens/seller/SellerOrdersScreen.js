import React, { useState, useEffect,useContext} from 'react'
import { View, StyleSheet, ScrollView, RefreshControl, Dimensions,ActivityIndicator } from 'react-native';
import { generalContext } from "../../contexts/generalContext";

import {Tag,Backdrop,OrderCard,BlankDivider} from '../../components';
import Colors from '../../globals/Colors';

import { send_get_request } from '../../utils/requests';

const SellerOrdersScreen = ({ navigation }) => {
  const {generalData, setGeneralData} = useContext(generalContext);

  const [tagList, setTagList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      .catch(err => {console.log(err);setItems([])})
      .finally(() => setIsLoading(false));
  }
  
  useEffect(get_data_from_server, []);

  useEffect(() => {
    if (generalData.notification_data !== undefined) {
      navigation.navigate('OrderPreview',{item: data.order});
      setGeneralData({...generalData, notification_data: undefined});
    }
  },[]);

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
      { isLoading
        ? <ActivityIndicator size={40} color="black" style={{alignSelf: 'center'}}/>
        : <ScrollView vertical={true}
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={true}
            style={styles.scroll}
            refreshControl={<RefreshControl refreshing={Refreshing} onRefresh={onRefresh} />}>
            {
              Items.slice().reverse().map((item, index) => {
                if (tagList.includes(item.status) || tagList.length == 0) {
                  return (
                    <View style={styles.order} key={index}>
                      <OrderCard
                        onClick={() => navigation.navigate("OrderPreview", {item, display_id: Items.length-index})}
                        orderNumber={Items.length-index}
                        orderStatus={item.status}
                        orderDate={item.date}
                        customer={item.customer.name}
                        price={item.price}
                      />
                      <View style={{ height: 1, borderWidth: 0.5, borderColor: Colors.lightGray, marginVertical: 16 }} />
                    </View>
                  )
                }
              })
            }
            <BlankDivider height={16}/>
          </ScrollView>
      }      
    </View>
  )

};

SellerOrdersScreen.navigationOptions = (props) => {
  return {};
};


const styles = StyleSheet.create({
  tags: {
    marginBottom: 8,
    marginHorizontal: 8
  },

  scroll: {
    paddingTop: 4,
    maxHeight: Dimensions.get('window').height * 0.77,
    paddingHorizontal: 8,
  }

});

export default SellerOrdersScreen;