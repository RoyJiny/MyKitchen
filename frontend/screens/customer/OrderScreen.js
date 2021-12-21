import React,{useState,useContext, useEffect} from 'react'
import {View,StyleSheet,Text, ScrollView} from 'react-native'
import { RadioButton } from 'react-native-paper';

import Colors from '../../globals/Colors';

import {BackButton,ShadowCard,MultilineInput,ExpantionArrow,Button,BlankDivider,PickerDate} from '../../components';
import {send_post_request} from '../../utils/requests';
import { UserContext } from '../../contexts/UserContext';


const SingleOrder = (name,count,price) => {  
  return (
    <View key={name}>
    <View style={[styles.rowView, {justifyContent: 'space-between'}]}>
      <View style={{flexDirection:'row', alignItems: 'center'}}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.count}>x{count}</Text>
      </View>
      <Text style={styles.price}>₪{price*count}</Text>
    </View>
    <View style={{
      borderColor: Colors.lightGray,
      borderWidth:0.25,
      height:1,
      marginHorizontal: 16,
      marginBottom: 4
    }}/>
    </View>
  );
};

const OrderScreen = ({navigation, route}) => {
  const items = route.params.params.itemCounts;
  const kitchen = route.params.params.kitchen;
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let sum = 0;
    kitchen.menu.map(dish => {sum = sum + items[dish._id].price*items[dish._id].count});
    setTotalPrice(sum);
  }, [route]);

  const {user,setUser} = useContext(UserContext);
  const [comments, setComments] = useState("");
  const [addresses, setAddresses] = useState([]);
  useEffect(() => 
    send_post_request('users/customer/addressesWithCanDeliver', {kitchenID: kitchen._id})
      .then(answer => setAddresses(answer["adderessesWithCanDeliver"]))
      .catch(error => console.log(error)), []);
  const deliveryOptions =  [...addresses, {name: "Pickup", address: "Pickup", canDeliver: true}];
  const [selectedDelivery, setSelectedDelivery] = useState("Pickup");
  const [selectedDateOption, setSelectedDateOption] = useState(route.params.params.isClosed? "Future Delivery":"ASAP");

  const [showDelivery, setShowDelivery] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const [date, setDate] = useState(new Date());

  const get_address_delivery = (name) => {
    var selected_address = "Pickup";
    addresses.forEach(location => {
      if(location.name === name){
        selected_address = location.address;
      }
    });
    return selected_address;
  }

  const get_items = () => {
    let new_items = [];
    kitchen.menu.forEach(dish => {
      if (items[dish._id].count > 0){new_items = [...new_items,{"name": dish.name ,"quantity": items[dish._id].count}]}
    });
    
    return new_items;
  }

  const send_order = async () => {
    try{
      const current_date = new Date();
      const new_order = {
        "kitchen": kitchen._id,
        "price": totalPrice,
        "costumer":user._id,
        "comments": comments,
        "isPickup": selectedDelivery == "Pickup",
        "deliveryAddress": get_address_delivery(selectedDelivery),
        "status": "Pending Approval",
        "items": get_items(),
        "date": current_date.getDate()+"/"+(current_date.getMonth()+1)+"/"+current_date.getFullYear(),
        "dueDate": selectedDateOption == "ASAP" ? "ASAP" : date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
      }
      const answer = await send_post_request('order/submit',new_order);
      if (answer == undefined) throw new Error("Failed to send data");
    } catch(err){
      console.log(err);
    }
  };
  
  return (
    <View style={{flex:1}}>
      <View style={[styles.rowView, {marginBottom: 32}]}>
        <BackButton onClick={navigation.goBack}/>
        <Text style={styles.title}>Order Summary</Text>
      </View>
      <ScrollView style={{marginBottom:20}}>
      <View style={{marginHorizontal: 20}}>
      <BlankDivider height={8}/>
      <ShadowCard>
        <View style={{paddingHorizontal: 8}}>
          {
            kitchen.menu.map((dish,idx) => items[dish._id].count > 0? SingleOrder(`${dish.name}`,items[dish._id].count,items[dish._id].price) : null)
          }
          <View style={[styles.rowView, {justifyContent: 'space-between'}]}>
            <Text style={styles.totalPrice}>Total</Text>
            <Text style={styles.totalPrice}>₪{totalPrice}</Text>
          </View>
        </View>
      </ShadowCard>      
      </View>

      <View style={{marginHorizontal: 20, marginVertical: 32}}>
        <Text style={styles.comments}>Comments</Text>
        <MultilineInput
          onSubmit={() => {}}
          updateOriginalValue={setComments}
        />
      </View>

      <View style={[styles.rowView, {justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20}]}>
        <Text style={styles.deliveryTitle}>Delivery</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.deliveryTitle}>{selectedDelivery}</Text>
          <ExpantionArrow isInitaialyExpanded={false} onClick={() => setShowDelivery(!showDelivery)}/>
        </View>
      </View>

      {showDelivery
        ? deliveryOptions.map((delivery,index) =>
          <View key={index} style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 28}}>
            <RadioButton
              status={ selectedDelivery == delivery.name ? 'checked' : 'unchecked' }
              color="black"
              onPress= {() => setSelectedDelivery(delivery.name)}
              disabled={!delivery.canDeliver}
            />
            <Text style={{color: delivery.canDeliver? 'black' : Colors.lightGray}}>{delivery.name}</Text>
            {delivery.name !== "Pickup"
              ? <Text style={{color: Colors.lightGray}}> ({delivery.address})</Text>
              : null
            }
            {delivery.canDeliver
            ? null
            : <Text style={{color: Colors.lightGray, textAlign:'center'}}> - too far for delivery</Text>
          }
          </View>
        )
        // add option to add one time delivery address - pressing send order will need to validate the distance of this address TODO
        : null
      }

      <BlankDivider height={32}/>

      <View style={[styles.rowView, {justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20}]}>
        <Text style={styles.deliveryTitle}>Delivery Date</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.deliveryTitle}>{selectedDateOption}</Text>
          <ExpantionArrow isInitaialyExpanded={false} onClick={() => setShowDate(!showDate)}/>
        </View>
      </View>

      {showDate
        ? <>
          <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 28}}>
            <RadioButton
              status={ selectedDateOption == 'ASAP' ? 'checked' : 'unchecked' }
              color="black"
              onPress= {() => setSelectedDateOption('ASAP')}
              disabled={route.params.params.isClosed}
            />
            <Text style={{marginRight: 10, color: route.params.params.isClosed? Colors.lightGray : 'black'}}>{route.params.params.isClosed? "ASAP - can't place ASAP order, kitchen is closed" : 'ASAP'}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 28}}>
            <RadioButton
              status={ selectedDateOption == 'Future Delivery' ? 'checked' : 'unchecked' }
              color="black"
              onPress= {() => setSelectedDateOption('Future Delivery')}
            />
            <Text style={{marginRight: 10}}>{'Future Delivery'}</Text>
            <View>
              <PickerDate date={date} setDate={setDate} textColor="black" isActive={true}/>
            </View>
          </View>
          </>
        : null
      }

      <BlankDivider height={32}/>
      <Button
        onClick={() => {send_order().then(() => navigation.navigate("ExploreInternal")).catch(error => console.log(error));}}
        borderColor="black"
        fillColor="white"
        text="Send Order"
        textColor={Colors.lightGray}
        height={35}
        width={120}
      />
      <BlankDivider height={24}/>
      </ScrollView>
    </View>
  )
};

OrderScreen.navigationOptions = (props) => {
  return {};  
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 16
  },
  rowView: {
    flexDirection: 'row',
    marginLeft: 8,
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 8
  },
  itemName: {
    fontSize: 16,
    marginRight: 8
  },
  count: {
    color: Colors.lightGray
  },
  price: {
    fontSize: 16
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  comments: {
    fontWeight: 'bold',
    color: Colors.lightGray,
    fontSize: 18
  },
  deliveryTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 8
  }
});

export default OrderScreen;