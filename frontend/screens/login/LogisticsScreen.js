import React,{useState, useContext} from 'react';
import {View,StyleSheet,Text,TouchableWithoutFeedback,Keyboard,ScrollView, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SellerContext } from "../../contexts/SellerContext";
import ToggleSwitch from 'toggle-switch-react-native'
import * as Animatable from 'react-native-animatable';

import { send_post_request, upload_image } from '../../utils/requests';
import { saveAuthToken } from '../../api/async_storage';

import {BackButton,Button2,BlankDivider,ShadowCard2,ToggleText,YesNoChoice,FormInput} from '../../components';

const LogisticsScreen = ({navigation,loginCB}) => {
  const {seller, setSeller} = useContext(SellerContext);
  const [operatingDays, setOperatingDays] = useState({preorderOnly: false, Sunday:{isActive:false, startTime:'08:00', endTime:'16:00'},Monday:{isActive:false, startTime:'08:00', endTime:'16:00'},Thuesday:{isActive:false, startTime:'08:00', endTime:'16:00'},Wednesday:{isActive:false, startTime:'08:00', endTime:'16:00'},Thursday:{isActive:false, startTime:'08:00', endTime:'16:00'},Friday:{isActive:false, startTime:'08:00', endTime:'16:00'},Saturday:{isActive:false, startTime:'08:00', endTime:'16:00'}});
  const [delivery, setDelivery] = useState({support: false, distance: ''});
  const [payLinks, setPayLinks] = useState(['','']);
  const [firstTime, setfirstTime] = useState(true);

  const submit_data = async (newSellerData) => {
    // upload information
    const data = await send_post_request("users/seller/register",newSellerData,false);
    if (data == undefined) throw new Error("Failed to send data");
    await saveAuthToken(data.token);
    
    // upload images
    var upload_promises = newSellerData.kitchen.menu.map(async (dish,idx) => {
      await upload_image(dish.imgLink, 'dishImg', data.kitchen_id, data.dishes_ids[idx]);
    });
    
    upload_promises.push((async () => {
      await upload_image(newSellerData.kitchen.bio.coverImage, 'coverImg', data.kitchen_id);
    })());
    
    await Promise.all(upload_promises); // wait for all uploads
    setSeller(newSellerData);
  };

  const setPreorderOnly = (value) => {
    setOperatingDays({...operatingDays, preorderOnly: value})
  }

  const setDayState = (day,value) => {
    if (operatingDays.preorderOnly) {return}
    let copy = {...operatingDays}
    copy[day] = {...copy[day], isActive: value}
    setOperatingDays(copy)
  }

  const setDayStartTime = (day,value) => {
    let copy = {...operatingDays}
    copy[day] = {...copy[day], startTime: value}
    setOperatingDays(copy)
  }

  const setDayEndTime = (day,value) => {
    let copy = {...operatingDays}
    copy[day] = {...copy[day], endTime: value}
    setOperatingDays(copy)
  }

  const setDeliverySupport = (value) => {
    setDelivery({...delivery, support: value})
  }

  const changeDistance = (value) => {
    setDelivery({...delivery, distance: value})
  }

  const changePayLink = (index,text) => {
    let copy = [...payLinks];
    copy[index]=text;
    setPayLinks(copy)
  }

  return (
    <KeyboardAwareScrollView style={{flex:1, paddingTop: 16, marginHorizontal: 8}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
          <View style={{ flexDirection:'row'}}>
            <BackButton onClick={navigation.goBack}/>
          </View>
          <BlankDivider height={8}/>
          <Text style={{fontSize: 20, marginLeft: 24}}>And Now Some Logistics</Text>
          <BlankDivider height={8}/>

          <ShadowCard2>
            <Text style={{fontSize: 18, marginLeft: 8}}>Operating days:</Text>
            <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems:'center', marginVertical:4}}>
              <Text style={{fontSize: 16, marginLeft: 16}}>Preorders only:</Text>
              <ToggleSwitch style={{marginRight: 16}}
                isOn={operatingDays.preorderOnly}
                onColor='#7CC0FA'
                offColor="lightgray"
                size="small"
                onToggle={(isOn) => setPreorderOnly(isOn)}
              />
            </View>
            <ToggleText text ="Sunday" isSelected={operatingDays.Sunday.isActive && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('Sunday',value)} startTime ={operatingDays.Sunday.startTime} setStartTime={(value) => setDayStartTime('Sunday',value)} endTime ={operatingDays.Sunday.endTime} setEndTime={(value) => setDayEndTime('Sunday',value)}/>
            <ToggleText text ="Monday" isSelected={operatingDays.Monday.isActive && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('Monday',value)} startTime ={operatingDays.Monday.startTime} setStartTime={(value) => setDayStartTime('Monday',value)} endTime ={operatingDays.Monday.endTime} setEndTime={(value) => setDayEndTime('Monday',value)}/>
            <ToggleText text ="Thuesday" isSelected={operatingDays.Thuesday.isActive && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('Thuesday',value)} startTime ={operatingDays.Thuesday.startTime} setStartTime={(value) => setDayStartTime('Thuesday',value)} endTime ={operatingDays.Thuesday.endTime} setEndTime={(value) => setDayEndTime('Thuesday',value)}/>
            <ToggleText text ="Wednesday" isSelected={operatingDays.Wednesday.isActive && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('Wednesday',value)} startTime ={operatingDays.Wednesday.startTime} setStartTime={(value) => setDayStartTime('Wednesday',value)} endTime ={operatingDays.Wednesday.endTime} setEndTime={(value) => setDayEndTime('Wednesday',value)}/>
            <ToggleText text ="Thursday" isSelected={operatingDays.Thursday.isActive && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('Thursday',value)} startTime ={operatingDays.Thursday.startTime} setStartTime={(value) => setDayStartTime('Thursday',value)} endTime ={operatingDays.Thursday.endTime} setEndTime={(value) => setDayEndTime('Thursday',value)}/>
            <ToggleText text ="Friday" isSelected={operatingDays.Friday.isActive && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('Friday',value)} startTime ={operatingDays.Friday.startTime} setStartTime={(value) => setDayStartTime('Friday',value)} endTime ={operatingDays.Friday.endTime} setEndTime={(value) => setDayEndTime('Friday',value)}/>
            <ToggleText text ="Saturday" isSelected={operatingDays.Saturday.isActive && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('Saturday',value)} startTime ={operatingDays.Saturday.startTime} setStartTime={(value) => setDayStartTime('Saturday',value)} endTime ={operatingDays.Saturday.endTime} setEndTime={(value) => setDayEndTime('Saturday',value)}/>
            <BlankDivider height={8}/>
          </ShadowCard2>
          <BlankDivider height={16}/>

          <ShadowCard2>
            <Text style={{fontSize: 18, marginLeft: 8}}>Do you support delivery?</Text>
            <YesNoChoice category = "Maximum Distance:" units = "km" Ncomment = "(pickup only)" number = {delivery.distance} onChangeNumber = {changeDistance} isSelected = {delivery.support} setIsSelected = {setDeliverySupport}/>
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
          <TouchableOpacity onPress={()=>{setfirstTime(false)}}>
          <Button2
            onClick={async () => {
              var logistics_obj = {operationDays: [{day:"Sunday",...operatingDays.Sunday},{day:"Monday",...operatingDays.Monday},{day:"Thuesday",...operatingDays.Thuesday},{day:"Wednesday",...operatingDays.Wednesday},{day:"Thursday",...operatingDays.Thursday},{day:"Friday",...operatingDays.Friday},{day:"Saturday",...operatingDays.Saturday}], isSupportDelivery: delivery.support, paymentLinks: payLinks, isOnlyFutureDelivery: operatingDays.preorderOnly}
              if (delivery.support) logistics_obj.maxDeliveryDistance = parseInt(delivery.distance);
              const newSellerData = {...seller, kitchen: {...seller.kitchen, logistics: logistics_obj} };
              await submit_data(newSellerData);
            }}
            asyncCB={() => loginCB(true)}
            borderColor = "black"
            fillColor = "white"
            text ="Finish"
            textColor = "black"
            disable = { payLinks[0].length > 0 ? false : true }
          />
          </TouchableOpacity>
          <BlankDivider height={16}/>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
  )
};

LogisticsScreen.navigationOptions = (props) => {
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

export default LogisticsScreen;