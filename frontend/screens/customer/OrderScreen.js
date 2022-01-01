import React,{useState,useContext, useEffect} from 'react'
import {View,StyleSheet,Text, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import { RadioButton } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

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
  
  useEffect(() => 
    send_post_request('users/customer/addressesWithCanDeliver', {kitchenID: kitchen._id})
      .then(answer => setAddresses(answer["adderessesWithCanDeliver"]))
      .catch(error => console.log(error))
  , []);

  const {user,setUser} = useContext(UserContext);
  const [comments, setComments] = useState("");
  const [addresses, setAddresses] = useState([]);
  const deliveryOptions =  [...addresses, {name: "Pickup", address: "Pickup", canDeliver: true},{name: "Custom Address", address: "Custom Address", canDeliver: true}];
  const [selectedDelivery, setSelectedDelivery] = useState("Pickup");
  const [selectedCustomAddress, setSelectedCustomAddress] = useState("");
  const [selectedDateOption, setSelectedDateOption] = useState((route.params.params.isClosed || kitchen.logistics.isOnlyFutureDelivery)? "Future Delivery":"ASAP");
  const [checkValid, setCheckValid] = useState(false);
  const [deliveryDistance, setDeliveryDistance] = useState(true);

  const [showDelivery, setShowDelivery] = useState(false);
  const [showDate, setShowDate] = useState(false);

  var dayMap = {
    Monday: 1,
    Thuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };
  const getInactiveDays = () => {
    let arr = [];
    kitchen.logistics.operationDays.forEach((day) => {
      if (!day.isActive){
        arr.push(dayMap[day.day]);
      }
    });
    return arr;
  };
  const inactiveDays = kitchen.logistics.isOnlyFutureDelivery? [] : getInactiveDays();
  const current_date = new Date();
  const getFirstValidDate = () => {
    let date = current_date;
    date.setDate(date.getDate() + 1);
    for (let i = 0; i < 7; i++) {
      if (date.getDay() == 0){
        if (!inactiveDays.includes(7)){
          return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        }
      }else{
        if (!inactiveDays.includes(date.getDay())){
          return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        }
      }
      date.setDate(date.getDate() + 1);
    }
    return current_date.getDate()+"/"+(current_date.getMonth()+1)+"/"+current_date.getFullYear();
  };
  const [date, setDate] = useState(getFirstValidDate());

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
      const new_order = {
        "kitchen": kitchen._id,
        "price": totalPrice,
        "costumer":user._id,
        "comments": comments,
        "isPickup": selectedDelivery == "Pickup",
        "deliveryAddress": selectedDelivery !== "Custom Address" ? get_address_delivery(selectedDelivery) : selectedCustomAddress,
        "status": "Pending Approval",
        "items": get_items(),
        "date": current_date.getDate()+"/"+(current_date.getMonth()+1)+"/"+current_date.getFullYear(),
        "dueDate": selectedDateOption == "ASAP" ? "ASAP" : date
      }
      const answer = await send_post_request('order/submit',new_order);
      if (answer == undefined) throw new Error("Failed to send data");
    } catch(err){
      console.log(err);
    }
  };

  const checkCanDeliver = async () => {
    const address = {
      "address": selectedCustomAddress,
      "kitchenID": kitchen._id
    }

    send_post_request('users/customer/addressCanDeliver', address)
      .then(answer => setDeliveryDistance(answer))
      .catch(error => console.log(error));
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
          <ExpantionArrow
            text={selectedDelivery}
            fontSize={18}
            isInitaialyExpanded={false}
            onClick={() => setShowDelivery(!showDelivery)}
          />
        </View>
      </View>

      {showDelivery
        ? kitchen.logistics.isSupportDelivery // if doesnt support delivery - show only pickup option
          ? deliveryOptions.map((delivery,index) =>
              <View key={index} style={{marginHorizontal: 28}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton
                    status={ selectedDelivery == delivery.name ? 'checked' : 'unchecked' }
                    color="black"
                    onPress= {() => {setCheckValid(false); if(delivery.name !== "Custom Address"){setSelectedDelivery(delivery.name); setSelectedCustomAddress("");setDeliveryDistance(true)} else {setSelectedDelivery(delivery.name);}}}
                    disabled={!delivery.canDeliver}
                  />
                  <Text style={{color: delivery.canDeliver? 'black' : Colors.lightGray}}>{delivery.name}</Text>
                  {delivery.name !== "Pickup" && delivery.name !== "Custom Address"
                    ? <Text style={{color: Colors.lightGray}}> ({delivery.address})</Text>
                    : null
                  }
                  {delivery.name === "Custom Address"
                    ?
                    <View style={styles.wrapper}>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={() => {}}
                        placeholder={"e.g. 1 Hashalom, Tel Aviv"}
                        color={Colors.black}
                        onChangeText={(address) => setSelectedCustomAddress(address)}
                        onEndEditing={() => {
                          checkCanDeliver();
                        }}
                      />
                    </View>
                    : null
                  }
                </View>
                {delivery.canDeliver || selectedDelivery === "Custom Address"
                  ? null
                  : <Text style={{color: Colors.lightGray, marginLeft: 36}}>This address is beyond1 {kitchen.bio.name}'s delivery distance</Text>
                }
                {!deliveryDistance && delivery.name === "Custom Address" && selectedDelivery === "Custom Address"
                  ? <Text style={{color: Colors.lightGray, marginLeft: 36}}>This address is beyond {kitchen.bio.name}'s delivery distance</Text>
                  : null
                }
              </View>
            )
          : <>
              <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 28}}>
                <RadioButton
                  status={ selectedDelivery == "Pickup" ? 'checked' : 'unchecked' }
                  color="black"
                  onPress= {() => setSelectedDelivery("Pickup")}
                />
                <Text style={{color:'black'}}>Pickup</Text>
              </View>
              <Text style={{color: Colors.lightGray, alignSelf: 'center'}}>{kitchen.bio.name} doesn't support delivery</Text>
            </>
        : null
      }

      <BlankDivider height={32}/>

      <View style={[styles.rowView, {justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20}]}>
        <Text style={styles.deliveryTitle}>Delivery Date</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ExpantionArrow
            text={selectedDateOption == 'ASAP' ? 'ASAP' : date}
            fontSize={18}
            isInitaialyExpanded={false}
            onClick={() => setShowDate(!showDate)}
          />
        </View>
      </View>

      {showDate
        ? <>
          <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 28}}>
            <RadioButton
              status={ selectedDateOption == 'ASAP' ? 'checked' : 'unchecked' }
              color="black"
              onPress= {() => setSelectedDateOption('ASAP')}
              disabled={route.params.params.isClosed || kitchen.logistics.isOnlyFutureDelivery}
            />
            <Text style={{marginRight: 10, color: (route.params.params.isClosed || kitchen.logistics.isOnlyFutureDelivery)? Colors.lightGray : 'black'}}>{kitchen.logistics.isOnlyFutureDelivery? "ASAP - can't place ASAP order, only future orders" : route.params.params.isClosed? "ASAP - can't place ASAP order, kitchen is closed" : 'ASAP'}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 28}}>
            <RadioButton
              status={ selectedDateOption == 'Future Delivery' ? 'checked' : 'unchecked' }
              color="black"
              onPress= {() => setSelectedDateOption('Future Delivery')}
            />
            <Text style={{marginRight: 10}}>{'Future Delivery'}</Text>
            <View>
              <PickerDate date={date} setDate={setDate} textColor="black" isActive={true} inactiveDays={inactiveDays}/>
            </View>
          </View>
          </>
        : null
      }

      <BlankDivider height={16}/>
      { (checkValid == true && selectedDelivery === "Custom Address" && selectedCustomAddress === "" ) ? 
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.validation}>Please enter your address</Text>
        </Animatable.View>
        : null
      }
      { (checkValid == true && selectedDelivery === "Custom Address" && !deliveryDistance && selectedCustomAddress !== "") ? 
        <Animatable.View animation="fadeInLeft" duration={500}>
        <Text style={styles.validation}>This address is beyond1 {kitchen.bio.name}'s delivery distance</Text>
        </Animatable.View>
        : null
      }
      <TouchableOpacity>
        <Button
          onClick={() => {if(!(selectedDelivery === "Custom Address" && (selectedCustomAddress == "" || !deliveryDistance))){send_order().then(() => navigation.navigate("ExploreInternal")).catch(error => console.log(error))};setCheckValid(true);}}
          borderColor="black"
          fillColor="white"
          text="Send Order"
          textColor={Colors.lightGray}
          height={35}
          width={120}
          disabled = {selectedDelivery === "Custom Address" &&  (selectedCustomAddress == "" || !deliveryDistance) ? true : false}
        />
      </TouchableOpacity>
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
  },
  wrapper:{
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 0,
    marginLeft:5,
    borderColor: Colors.lightGray
  },
  textInput: {
    height: 30,
    width: 190,
    paddingHorizontal: 10,
  },
  validation: {
    color: "red",
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 25,
    marginBottom: 2,
  },
});

export default OrderScreen;