import React,{useState, useContext} from 'react';
import {View,StyleSheet,Text,TouchableWithoutFeedback,Keyboard,ScrollView, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SellerContext } from "../../contexts/SellerContext";
import ToggleSwitch from 'toggle-switch-react-native'
import * as Animatable from 'react-native-animatable';

import {BackButton,Button2,BlankDivider,ShadowCard2,ToggleText,YesNoChoice,FormInput} from '../../components';

const EditLogisticsScreen = ({navigation,loginCB}) => {
  const {seller, setSeller} = useContext(SellerContext);
  const [operatingDays, setOperatingDays] = useState({preorderOnly: false, Sunday:{isActive:false, startTime:'08:00', endTime:'16:00'},Monday:{isActive:false, startTime:'08:00', endTime:'16:00'},Thuesday:{isActive:false, startTime:'08:00', endTime:'16:00'},Wednesday:{isActive:false, startTime:'08:00', endTime:'16:00'},Thursday:{isActive:false, startTime:'08:00', endTime:'16:00'},Friday:{isActive:false, startTime:'08:00', endTime:'16:00'},Saturday:{isActive:false, startTime:'08:00', endTime:'16:00'}});
  const [delivery, setDelivery] = useState({support: false, distance: ''});
  const [payLinks, setPayLinks] = useState(['','']);
  const [firstTime, setfirstTime] = useState(true);

  const setPreorderOnly = (value) => {
    setOperatingDays({...operatingDays, preorderOnly: value})
  }
  
  const setDayState = (day,value) => {
    if (operatingDays.preorderOnly) {return}
    let copy = {...operatingDays}
    copy[day] = {...copy[day], active: value}
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

  const changeNumber = (value) => {
    setDelivery({...delivery, distance: value})
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
              onClick={() => {setSeller({...seller, ...{kitchen: {...seller.kitchen, ...{logistics: {operatingDays: operatingDays,delivery: delivery,payLinks: payLinks}}}}});navigation.navigate("MyKitchenInternal");}}
              borderColor = "black"
              fillColor = "white"
              text ="Done"
              textColor = "black"
              disable = { payLinks[0].length > 0 ? false : true }
            />
            </TouchableOpacity>
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
            <ToggleText text ="Sunday" isSelected={operatingDays.Sunday.isActive && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('sunday',value)} startTime ={operatingDays.Sunday.startTime} setStartTime={(value) => setDayStartTime('sunday',value)} endTime ={operatingDays.Sunday.endTime} setEndTime={(value) => setDayEndTime('sunday',value)}/>
            <ToggleText text ="Monday" isSelected={operatingDays.Monday.isActive && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('monday',value)} startTime ={operatingDays.Monday.startTime} setStartTime={(value) => setDayStartTime('monday',value)} endTime ={operatingDays.Monday.endTime} setEndTime={(value) => setDayEndTime('monday',value)}/>
            <ToggleText text ="Thuesday" isSelected={operatingDays.Thuesday.isActive && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('thuesday',value)} startTime ={operatingDays.Thuesday.startTime} setStartTime={(value) => setDayStartTime('thuesday',value)} endTime ={operatingDays.Thuesday.endTime} setEndTime={(value) => setDayEndTime('thuesday',value)}/>
            <ToggleText text ="Wednesday" isSelected={operatingDays.Wednesday.isActive && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('wednesday',value)} startTime ={operatingDays.Wednesday.startTime} setStartTime={(value) => setDayStartTime('wednesday',value)} endTime ={operatingDays.Wednesday.endTime} setEndTime={(value) => setDayEndTime('wednesday',value)}/>
            <ToggleText text ="Thursday" isSelected={operatingDays.Thursday.isActive && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('thursday',value)} startTime ={operatingDays.Thursday.startTime} setStartTime={(value) => setDayStartTime('thursday',value)} endTime ={operatingDays.Thursday.endTime} setEndTime={(value) => setDayEndTime('thursday',value)}/>
            <ToggleText text ="Friday" isSelected={operatingDays.Friday.isActive && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('friday',value)} startTime ={operatingDays.Friday.startTime} setStartTime={(value) => setDayStartTime('friday',value)} endTime ={operatingDays.Friday.endTime} setEndTime={(value) => setDayEndTime('friday',value)}/>
            <ToggleText text ="Saturday" isSelected={operatingDays.Saturday.isActive && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('saturday',value)} startTime ={operatingDays.Saturday.startTime} setStartTime={(value) => setDayStartTime('saturday',value)} endTime ={operatingDays.Saturday.endTime} setEndTime={(value) => setDayEndTime('saturday',value)}/>
            <BlankDivider height={8}/>
          </ShadowCard2>
          <BlankDivider height={16}/>

          <ShadowCard2>
            <Text style={{fontSize: 18, marginLeft: 8}}>Do you support delivery?</Text>
            <YesNoChoice category = "Maximum Distance:" units = "km" Ncomment = "(pickup only)" number = {delivery.distance} onChangeNumber = {changeNumber} isSelected = {delivery.support} setIsSelected = {setDeliverySupport}/>
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
            {/*<TouchableOpacity
                onPress={() => {}}
                style={{
                    borderRadius: 24,
                    borderColor: 'black',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 32,
                    width: 120,
                    alignSelf: 'center'
                }}
            >
                {
                  <Text style={{ textAlign:'center',color: 'black', fontSize: 16, }} >
                          {"Add Another"}
                  </Text>
                }
              </TouchableOpacity>*/}
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