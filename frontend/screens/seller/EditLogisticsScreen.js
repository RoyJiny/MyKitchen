import React,{useState, useContext, useEffect} from 'react';
import {View,StyleSheet,Text,TouchableWithoutFeedback,Keyboard,ScrollView, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SellerContext } from "../../contexts/SellerContext";
import ToggleSwitch from 'toggle-switch-react-native'
import * as Animatable from 'react-native-animatable';

import {BackButton,Button2,BlankDivider,ShadowCard2,ToggleText,YesNoChoice,FormInput} from '../../components';
import { send_post_request, send_get_request } from '../../utils/requests';

const EditLogisticsScreen = ({navigation}) => {

  const {seller, setSeller} = useContext(SellerContext);

  useEffect(() => {
    send_get_request("users/me/seller")
      .then(data => {setSeller(data);})
      .catch(err => {console.log(err);});
  },[]);

  const [isOnlyFutureDelivery, setIsOnlyFutureDelivery] = useState(seller.kitchen.logistics.isOnlyFutureDelivery);
  const [operationDays, setOperationDays] = useState(seller.kitchen.logistics.operationDays);
  const [isSupportDelivery, setIsSupportDelivery] = useState(seller.kitchen.logistics.isSupportDelivery);
  const [distance, setDistance] = useState(String(seller.kitchen.logistics.maxDeliveryDistance));
  const [payLinks, setPayLinks] = useState(seller.kitchen.logistics.paymentLinks);
  const [firstTime, setfirstTime] = useState(true);
  
  const setDayState = (index,value) => {
    if (isOnlyFutureDelivery) {return}
    let copy = [...operationDays]
    copy[index] = {...copy[index], isActive: value}
    setOperationDays(copy)
  }

  const setDayStartTime = (index,value) => {
    let copy = [...operationDays]
    copy[index] = {...copy[index], startTime: value}
    setOperationDays(copy)
  }

  const setDayEndTime = (index,value) => {
    let copy = [...operationDays]
    copy[index] = {...copy[index], endTime: value}
    setOperationDays(copy)
  }

  const changePayLink = (index,text) => {
    let copy = [...payLinks];
    copy[index]=text;
    setPayLinks(copy)
  }

  return (
    <KeyboardAwareScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex:1, marginTop: 16, marginHorizontal: 8}}>
          <View style={{ flexDirection:'row', justifyContent: 'space-between', alignContent: 'center', paddingRight: 16 }}>
            <BackButton onClick={navigation.goBack}/>
            <TouchableOpacity onPress={()=>{console.log(payLinks), setfirstTime(false)}}>
            <Button2
              onClick={async () => {
                var logistics_obj = {operationDays: operationDays, isSupportDelivery: isSupportDelivery, paymentLinks: payLinks, isOnlyFutureDelivery: isOnlyFutureDelivery}
                if (isSupportDelivery) logistics_obj.maxDeliveryDistance = parseInt(distance);
                await send_post_request("users/seller/edit/logistics",{id: seller.kitchen._id, logistics: logistics_obj});
              }}  
              asyncCB = {() => {
                var logistics_obj = {operationDays: operationDays, isSupportDelivery: isSupportDelivery, paymentLinks: payLinks, isOnlyFutureDelivery: isOnlyFutureDelivery}
                if (isSupportDelivery) logistics_obj.maxDeliveryDistance = parseInt(distance);
                setSeller({
                  ...seller,
                  kitchen: {...seller.kitchen, logistics: logistics_obj}
                });
                navigation.navigate("MyKitchenInternal");
              }}
              borderColor = "black"
              fillColor = "white"
              text ="Save"
              textColor = "black"
              disable = { payLinks[0].length > 0 ? false : true }
            />
            </TouchableOpacity>
          </View>
          <BlankDivider height={8}/>
          <Text style={{fontSize: 20, marginLeft: 24}}>Edit your kitchen's Logistics:</Text>
          <BlankDivider height={8}/>

          <ShadowCard2>
            <Text style={{fontSize: 18, marginLeft: 8}}>Operating days:</Text>
            <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems:'center', marginVertical:4}}>
              <Text style={{fontSize: 16, marginLeft: 16}}>Preorders only:</Text>
              <ToggleSwitch style={{marginRight: 16}}
                isOn={isOnlyFutureDelivery}
                onColor='#7CC0FA'
                offColor="lightgray"
                size="small"
                onToggle={setIsOnlyFutureDelivery}
              />
            </View>
            <ToggleText text ="Sunday" isSelected={operationDays[0].isActive && !isOnlyFutureDelivery} setIsSelected={(value) => setDayState(0,value)} startTime ={operationDays[0].startTime} setStartTime={(value) => setDayStartTime(0,value)} endTime ={operationDays[0].endTime} setEndTime={(value) => setDayEndTime(0,value)}/>
            <ToggleText text ="Monday" isSelected={operationDays[1].isActive && !isOnlyFutureDelivery} setIsSelected={(value) => setDayState(1,value)} startTime ={operationDays[1].startTime} setStartTime={(value) => setDayStartTime(1,value)} endTime ={operationDays[1].endTime} setEndTime={(value) => setDayEndTime(1,value)}/>
            <ToggleText text ="Thuesday" isSelected={operationDays[2].isActive && !isOnlyFutureDelivery} setIsSelected={(value) => setDayState(2,value)} startTime ={operationDays[2].startTime} setStartTime={(value) => setDayStartTime(2,value)} endTime ={operationDays[2].endTime} setEndTime={(value) => setDayEndTime(2,value)}/>
            <ToggleText text ="Wednesday" isSelected={operationDays[3].isActive && !isOnlyFutureDelivery} setIsSelected={(value) => setDayState(3,value)} startTime ={operationDays[3].startTime} setStartTime={(value) => setDayStartTime(3,value)} endTime ={operationDays[3].endTime} setEndTime={(value) => setDayEndTime(3,value)}/>
            <ToggleText text ="Thursday" isSelected={operationDays[4].isActive && !isOnlyFutureDelivery} setIsSelected={(value) => setDayState(4,value)} startTime ={operationDays[4].startTime} setStartTime={(value) => setDayStartTime(4,value)} endTime ={operationDays[4].endTime} setEndTime={(value) => setDayEndTime(4,value)}/>
            <ToggleText text ="Friday" isSelected={operationDays[5].isActive && !isOnlyFutureDelivery} setIsSelected={(value) => setDayState(5,value)} startTime ={operationDays[5].startTime} setStartTime={(value) => setDayStartTime(5,value)} endTime ={operationDays[5].endTime} setEndTime={(value) => setDayEndTime(5,value)}/>
            <ToggleText text ="Saturday" isSelected={operationDays[6].isActive && !isOnlyFutureDelivery} setIsSelected={(value) => setDayState(6,value)} startTime ={operationDays[6].startTime} setStartTime={(value) => setDayStartTime(6,value)} endTime ={operationDays[6].endTime} setEndTime={(value) => setDayEndTime(6,value)}/>
            <BlankDivider height={8}/>
          </ShadowCard2>
          <BlankDivider height={16}/>

          <ShadowCard2>
            <Text style={{fontSize: 18, marginLeft: 8}}>Do you support delivery?</Text>
            <YesNoChoice category = "Maximum Distance:" units = "km" Ncomment = "(pickup only)" number = {distance} onChangeNumber = {setDistance} isSelected = {isSupportDelivery} setIsSelected = {setIsSupportDelivery}/>
            <BlankDivider height={8}/>
          </ShadowCard2>
          <BlankDivider height={16}/>
          
          <ShadowCard2>
            <Text style={{fontSize: 18, marginLeft: 8}}>How do you recieve payments?</Text>
            <FormInput
              placeholder="payment link"
              additionalStyle={{marginLeft: 16, marginRight: 48}}
              textInit={payLinks[0]}
              setState={(text) => changePayLink(0,text)}
            />
            <FormInput
              placeholder="2nd payment link (optional)"
              additionalStyle={{marginLeft: 16, marginRight: 48}}
              textInit={payLinks[1]}
              setState={(text) => changePayLink(1,text)}
            />
            { firstTime==true || payLinks[0].length > 0 ? null :
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.validation}>Please add at least one payment method</Text>
              </Animatable.View>
            }
          </ShadowCard2>
          
          <BlankDivider height={16}/>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
  )
};

EditLogisticsScreen.navigationOptions = (props) => {
  return {};  
};

const styles = StyleSheet.create({
  validation: {
    color: "red",
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 25,
    marginTop: 2,
  },
});

export default EditLogisticsScreen;