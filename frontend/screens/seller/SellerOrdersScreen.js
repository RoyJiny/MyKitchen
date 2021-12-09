import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Text, RefreshControl, Dimensions } from 'react-native'
import Tag from '../../components/Tag';
import Backdrop from '../../components/Backdrop';
import OrderCard from '../../components/OrderCard';
import Colors from '../../globals/Colors';
import BlankDivider from '../../components/BlankDivider';


const SellerOrdersScreen = ({ navigation }) => {
  const [tagList, setTagList] = useState([]);

  const addTag = (text) => {
    setTagList([...tagList, text])
  }

  const removeTag = (text) => {
    setTagList(tagList.filter(t => t !== text))
  }
  const [Items, setItems] = useState([
    {order:{ id: "109090", kitchen:"My Kitchen", price:60, comments:"bgbg1", isPickup:false, deliveryAddress:"nowhere", status:"Done", items:[{ name: "cakes", quantity: 1 }, {name:"brownies", quantity:5}, {name:"cookies", quantity:7}], dueDate:"12/10/10", date:"10/10/10"}, customer:{ name: "Bgbg", phone: "0502222222"}},
    {order:{ id: "2", kitchen:"My Kitchen", price:60, comments:"bgbg2", isPickup:false, deliveryAddress:"here", status:"Waiting For Payment", items:[{ name: "cakes", quantity: 1 }], dueDate:"12/10/10", date:"10/10/10"}, customer:{ name: "Bgbg", phone: "0502222222"}},
    {order:{ id: "3", kitchen:"My Kitchen", price:60, comments:"bgbg3", isPickup:false, deliveryAddress:"there", status:"Pending Approval", items:[{ name: "cakes", quantity: 1 }], dueDate:"12/10/10", date:"10/10/10"}, customer:{ name: "Bgbg", phone: "0502222222"}},
    {order:{ id: "4", kitchen:"My Kitchen", price:60, comments:"bgbg4", isPickup:false, deliveryAddress:"home", status:"In the Making", items:[{ name: "cakes", quantity: 1 }], dueDate:"12/10/10", date:"10/10/10"}, customer:{ name: "Bgbg", phone: "0502222222"}},
    {order:{ id: "5", kitchen:"My Kitchen", price:60, comments:"bgbg5", isPickup:false, deliveryAddress:"Office", status:"Ready for Customer", items:[{ name: "cakes", quantity: 1 }], dueDate:"12/10/10", date:"10/10/10"}, customer:{ name: "Bgbg", phone: "0502222222"}},
    {order:{ id: "6", kitchen:"My Kitchen", price:50, comments:"bgbg6", isPickup:false, deliveryAddress:"nonon", status:"Waiting For Payment", items:[{ name: "cakes", quantity: 1 }], dueDate:"12/10/10", date:"10/10/10"}, customer:{ name: "Bgbg", phone: "0502222222"}},

  ])

  const [Refreshing, setRefreshing] = useState(false)
  const onRefresh = () => {
    setRefreshing(true);
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
          Items.filter(item => tagList.includes(item.order.status) || tagList.length == 0).map((item, index) => {
            return (
                <View style={styles.order} key={index}>
                  <OrderCard
                    onClick={() => navigation.navigate("OrderPreview", {item})}
                    orderNumber={item.order.id}
                    orderStatus={item.order.status}
                    orderDate={item.order.date}
                    customer={item.customer.name}
                    price={item.order.price}
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