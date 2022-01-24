import React, { useState, useEffect,useContext} from 'react'
import { View, StyleSheet, ScrollView, RefreshControl, Dimensions,ActivityIndicator,Text,TouchableOpacity } from 'react-native';
import CheckBox from 'expo-checkbox';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';

import { generalContext } from "../../contexts/generalContext";
import { SellerContext } from "../../contexts/SellerContext";

import {Tag,Backdrop,OrderCard,BlankDivider} from '../../components';
import Colors from '../../globals/Colors';

import { send_get_request } from '../../utils/requests';

const SellerOrdersScreen = ({ navigation }) => {
  const {generalData, setGeneralData} = useContext(generalContext);
  const {seller, setSeller} = useContext(SellerContext);
  
  const [useDateFilter, setUseDateFilter] = useState(false);
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [dateFilter, setDateFilter] = useState((new Date()).getDate()+'/'+((new Date()).getMonth()+1)+'/'+(new Date()).getFullYear())
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
      if (generalData.notification_data.type === 'Order') {
        navigation.navigate('Orders',{
          screen: 'OrderPreview',
          params: {item: generalData.notification_data.order}
        });
      } else if (generalData.notification_data.type === 'Chat') {
        navigation.navigate('Messages',{
          screen: 'Chat',
          params: {...generalData.notification_data.chatData}
        });
      } else {
        console.log('Error: bad notification type:',data.type);
      }
      setGeneralData({...generalData, notification_data: undefined});
    }
  },[]);

  useEffect(() => {
    send_get_request("users/me/seller")
      .then(data => {setSeller(data);})
      .catch(err => {console.log(err);});
  },[]);

  const [Refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true);
    get_data_from_server();
    setRefreshing(false);
  }

  const parseDate = (stringDate) => new Date(parseInt(stringDate.split('/')[2]),parseInt(stringDate.split('/')[1])-1,parseInt(stringDate.split('/')[0]))

  const onDateSelection = (date) => {
    setDateFilter(String(date.day)+"/"+String(date.month)+"/"+String(date.year));
    setShowDateSelector(false);
    setUseDateFilter(true);
  }

  const transformStringDate = (date) => {
    const dateInfo = date.split("/");
    return dateInfo[2]+"-"+("0"+dateInfo[1]).slice(-2)+"-"+("0"+dateInfo[0]).slice(-2);
  };
  const transformDate = (date) => {
    return date.getFullYear()+"-"+("0"+date.getMonth()+1).slice(-2)+"-"+("0"+date.getDate()).slice(-2);
  };
  
  return (
    <View style={{flex: 1}}>
      <View>
        <Backdrop text='Orders' height={80} />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.tags}>
          <Tag text="Pending Approval" textColor="black" add={addTag} remove={removeTag} />
          <Tag text="Waiting For Payment" textColor="black" add={addTag} remove={removeTag} />
          <Tag text="In the Making" textColor="black" add={addTag} remove={removeTag} />
          <Tag text="Ready for Customer" textColor="black" add={addTag} remove={removeTag} />
          <Tag text="Done" textColor="black" add={addTag} remove={removeTag} />
          <Tag text="Canceled" textColor="black" add={addTag} remove={removeTag} />
        </ScrollView>
        
        <View style={{marginLeft: 12, flexDirection: 'row', alignItems: 'center', marginVertical: 8}}>
          <CheckBox
            value={useDateFilter}
            onValueChange={setUseDateFilter}
            color={useDateFilter ? Colors.black : Colors.lightGray}
            style={{height: 18,  width: 18, marginRight: 8}}
          />
          <Text style={{color: useDateFilter ? 'black' : Colors.lightGray, fontSize: 14}}>Orders to fulfil by: </Text>
          <TouchableOpacity
            onPress={() => setShowDateSelector(true)}
            style={{
              borderRadius: 8,
              borderBottomColor: useDateFilter ? Colors.black : Colors.lightGray,
              borderBottomWidth: 1,
              alignItems: 'center',
            }}
          >
            <Text style={{fontSize: 14, paddingHorizontal: 12, color: useDateFilter ? Colors.black : Colors.lightGray}}>{dateFilter}</Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={showDateSelector} onBackdropPress={() => setShowDateSelector(false)}>
          <Calendar
            current={transformStringDate(dateFilter)}
            minDate={transformDate(new Date())}
            onDayPress={onDateSelection}
          />
        </Modal>

      </View>
      { isLoading
        ? <ActivityIndicator size={40} color="black" style={{alignSelf: 'center'}}/>
        : Items.length === 0
          ? <Text style={styles.noOrders}>You don't have any orders</Text>
          : <ScrollView
              style={{}}
              vertical={true}
              showsHorizontalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={Refreshing} onRefresh={onRefresh} />}
            >
              <View style={styles.scroll}>
                {
                  Items.slice().reverse().map((item, index) => {
                    if (!useDateFilter
                      || (item.dueDate === 'ASAP' && parseDate(item.date) <= parseDate(dateFilter))
                      || (parseDate(item.dueDate) <= parseDate(dateFilter))
                    ){
                      if (tagList.includes(item.status) || tagList.length == 0) {
                        return (
                          <View key={index}>
                            <OrderCard
                              onClick={() => navigation.navigate("OrderPreview", {item, display_id: Items.length-index})}
                              orderNumber={Items.length-index}
                              orderStatus={item.status}
                              orderDate={item.dueDate}
                              customer={item.customer.name}
                              price={item.price}
                            />
                            <View style={{ height: 1, borderWidth: 0.5, borderColor: Colors.lightGray, marginVertical: 16 }} />
                          </View>
                        )
                      }
                    }
                  })
                }
                <BlankDivider height={5}/>
              </View>
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
    paddingHorizontal: 8,
  },
  noOrders: {
    alignSelf: 'center',
    color: Colors.lightGray,
    marginTop: 40
  }

});

export default SellerOrdersScreen;