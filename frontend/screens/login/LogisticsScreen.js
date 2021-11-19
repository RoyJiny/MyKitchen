import React from 'react';
import {View,StyleSheet,Text,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard,ScrollView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import BackButton from '../../components/BackButton';
import Button2 from '../../components/Button2';
import BlankDivider from '../../components/BlankDivider';
import ShadowCard2 from '../../components/ShadowCard2';
import ToggleText from '../../components/ToggleText';
import YesNoChoice from '../../components/YesNoChoice';
import FormInput from '../../components/FormInput';

const LogisticsScreen = ({navigation,loginCB}) => {
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
            <ToggleText text ="Sunday" startHour ={8} startMin ={0} endHour ={16} endMin ={0}/>
            <ToggleText text ="Monday" startHour ={8} startMin ={0} endHour ={16} endMin ={0}/>
            <ToggleText text ="Thuesday" startHour ={8} startMin ={0} endHour ={16} endMin ={0}/>
            <ToggleText text ="Wednesday" startHour ={8} startMin ={0} endHour ={16} endMin ={0}/>
            <ToggleText text ="Thursday" startHour ={8} startMin ={0} endHour ={16} endMin ={0}/>
            <ToggleText text ="Friday" startHour ={8} startMin ={0} endHour ={16} endMin ={0}/>
            <ToggleText text ="Saturday" startHour ={8} startMin ={0} endHour ={16} endMin ={0}/>
            <BlankDivider height={8}/>
          </ShadowCard2>
          <BlankDivider height={16}/>

          <ShadowCard2>
            <Text style={{fontSize: 18, marginLeft: 8}}>Do you support delivery?</Text>
            <YesNoChoice category = "Maximum Distance:" units = "km" Ncomment = "(pickup only)"/>
            <BlankDivider height={8}/>
          </ShadowCard2>
          <BlankDivider height={16}/>
          
          <ShadowCard2>
            <Text style={{fontSize: 18, marginLeft: 8}}>How do you recieve payments?</Text>
            <FormInput
              placeholder="payment link"
              updateOriginalValue={txt => console.log(txt)}
              additionalStyle={{marginLeft: 16, marginRight: 48}}
              onSubmit={event => console.log('submitted:',event.nativeEvent.text)}
            />
            <FormInput
              placeholder="2nd payment link (optional)"
              updateOriginalValue={txt => console.log(txt)}
              additionalStyle={{marginLeft: 16, marginRight: 48}}
              onSubmit={event => console.log('submitted:',event.nativeEvent.text)}
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
            onClick={loginCB}
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