import React,{useState, useContext} from 'react';
import {View,StyleSheet,Text,TouchableWithoutFeedback,Keyboard,ScrollView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { UserContext } from "../../contexts/UserContext";
import ToggleSwitch from 'toggle-switch-react-native'

import BackButton from '../../components/BackButton';
import Button2 from '../../components/Button2';
import BlankDivider from '../../components/BlankDivider';
import ShadowCard2 from '../../components/ShadowCard2';
import ToggleText from '../../components/ToggleText';
import YesNoChoice from '../../components/YesNoChoice';
import FormInput from '../../components/FormInput';

const LogisticsScreen = ({navigation,loginCB}) => {
  const {user, setUser} = useContext(UserContext);
  const [operatingDays, setOperatingDays] = useState({preorderOnly: false, sunday:{active:false, startTime:'08:00', endTime:'16:00'},monday:{active:true, startTime:'08:00', endTime:'16:00'},thuesday:{active:true, startTime:'08:00', endTime:'16:00'},wednesday:{active:false, startTime:'08:00', endTime:'16:00'},thursday:{active:false, startTime:'08:00', endTime:'16:00'},friday:{active:false, startTime:'08:00', endTime:'16:00'},saturday:{active:false, startTime:'08:00', endTime:'16:00'}});
  const [delivery, setDelivery] = useState({support: false, distance: ''});
  const [payLinks, setPayLinks] = useState(['','']);

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
            <ToggleText text ="Sunday" isSelected={operatingDays.sunday.active && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('sunday',value)} startTime ={operatingDays.sunday.startTime} setStartTime={(value) => setDayStartTime('sunday',value)} endTime ={operatingDays.sunday.endTime} setEndTime={(value) => setDayEndTime('sunday',value)}/>
            <ToggleText text ="Monday" isSelected={operatingDays.monday.active && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('monday',value)} startTime ={operatingDays.monday.startTime} setStartTime={(value) => setDayStartTime('monday',value)} endTime ={operatingDays.monday.endTime} setEndTime={(value) => setDayEndTime('monday',value)}/>
            <ToggleText text ="Thuesday" isSelected={operatingDays.thuesday.active && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('thuesday',value)} startTime ={operatingDays.thuesday.startTime} setStartTime={(value) => setDayStartTime('thuesday',value)} endTime ={operatingDays.thuesday.endTime} setEndTime={(value) => setDayEndTime('thuesday',value)}/>
            <ToggleText text ="Wednesday" isSelected={operatingDays.wednesday.active && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('wednesday',value)} startTime ={operatingDays.wednesday.startTime} setStartTime={(value) => setDayStartTime('wednesday',value)} endTime ={operatingDays.wednesday.endTime} setEndTime={(value) => setDayEndTime('wednesday',value)}/>
            <ToggleText text ="Thursday" isSelected={operatingDays.thursday.active && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('thursday',value)} startTime ={operatingDays.thursday.startTime} setStartTime={(value) => setDayStartTime('thursday',value)} endTime ={operatingDays.thursday.endTime} setEndTime={(value) => setDayEndTime('thursday',value)}/>
            <ToggleText text ="Friday" isSelected={operatingDays.friday.active && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('friday',value)} startTime ={operatingDays.friday.startTime} setStartTime={(value) => setDayStartTime('friday',value)} endTime ={operatingDays.friday.endTime} setEndTime={(value) => setDayEndTime('friday',value)}/>
            <ToggleText text ="Saturday" isSelected={operatingDays.saturday.active && !operatingDays.preorderOnly} setIsSelected={(value) => setDayState('saturday',value)} startTime ={operatingDays.saturday.startTime} setStartTime={(value) => setDayStartTime('saturday',value)} endTime ={operatingDays.saturday.endTime} setEndTime={(value) => setDayEndTime('saturday',value)}/>
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
          <Button2
            onClick={() => {setUser({...user, ...{kitchen: {...user.kitchen, ...{logistics: {operatingDays: operatingDays,delivery: delivery,payLinks: payLinks}}}}});console.log(user); loginCB();}}
            borderColor = "black"
            fillColor = "white"
            text ="Finish"
            textColor = "black"
          />
          
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

});

export default LogisticsScreen;