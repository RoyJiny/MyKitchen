import React,{useState} from 'react'
import {View,StyleSheet,Text, ScrollView} from 'react-native'
import { RadioButton } from 'react-native-paper';

import Colors from '../../globals/Colors';

import {BackButton,ShadowCard,MultilineInput,ExpantionArrow,Button,BlankDivider,PickerDate} from '../../components';

const SingleOrder = (name,amount,price) => {  
  return (
    <View key={name}>
    <View style={[styles.rowView, {justifyContent: 'space-between'}]}>
      <View style={{flexDirection:'row', alignItems: 'center'}}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.amount}>x{amount}</Text>
      </View>
      <Text style={styles.price}>₪{price}</Text>
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

const OrderScreen = ({navigation}) => {
  const items = [{name:'Birthday Cake',amount: 2,price: 120},{name:'Birthday Cake',amount: 2,price: 120},{name:'Birthday Cake',amount: 2,price: 120}]
  var totalPrice = 0;
  items.map(item => {totalPrice = totalPrice + item.price});

  const [comments, setComments] = useState("");

  const deliveryOptions = ["Home","Office", "Pickup"];
  const dateOptions = ["ASAP","Future Delivery"];
  const [selectedDelivery, setSelectedDelivery] = useState("Home");
  const [selectedDateOption, setSelectedDateOption] = useState("ASAP");
  const [selectedDate, setSelectedDate] = useState(null);

  const [showDelivery, setShowDelivery] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const [date, setDate] = useState(new Date());

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
            items.map((item,idx) => SingleOrder(`${item.name}${idx}`,item.amount,item.price))
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
        ? deliveryOptions.map(delivery =>
          <View key={delivery} style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 28}}>
            <RadioButton
              status={ selectedDelivery == delivery ? 'checked' : 'unchecked' }
              color="black"
              onPress= {() => setSelectedDelivery(delivery)}
            />
            <Text>{delivery}</Text>
          </View>
        )
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
        ? dateOptions.map(opt =>
          <View key={opt} style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 28}}>
            <RadioButton
              status={ selectedDateOption == opt ? 'checked' : 'unchecked' }
              color="black"
              onPress= {() => setSelectedDateOption(opt)}
            />
            <Text style={{marginRight : 10}}>{opt}</Text>
            <View>
              {
                opt == "Future Delivery" ? <PickerDate date={date} setDate={setDate} textColor="black" isActive={true}/> : null
              }
            </View>
          </View>
        )
        : null
      }

      <BlankDivider height={32}/>
      <Button
        onClick={() => console.log('sending order...')}
        borderColor="black"
        fillColor="white"
        text="Send Order"
        textColor="#7CC0FA"
        height={30}
        width={100}
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
  amount: {
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