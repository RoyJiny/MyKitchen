import React from 'react';
import {View,StyleSheet,Text,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard} from 'react-native';
import * as Icons from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../globals/Colors';

import Tag from '../../components/Tag';
import Button2 from '../../components/Button2';
import FormInput from '../../components/FormInput';
import ShadowCard2 from '../../components/ShadowCard2';
import BlankDivider from '../../components/BlankDivider';
import ImagePickerIcon from '../../components/ImUp';

const KitchenBioScreen = ({navigation, loginCB}) => {
  return (
    <View style={{flex:1}}>
      <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <Icon style={{marginLeft: 16, marginRight: 350}}
              name="angle-left"
              size={40}
              color="black"
              underlayColor="blue"
              onPress={() => navigation.navigate("SellerSignin")}>
        </Icon>

        <BlankDivider height={8}/>
        <Text style={{fontSize: 20, marginLeft: 24}}>Tell Us About Your Kitchen</Text>
        <BlankDivider height={8}/>

        <ShadowCard2>
          <Text style={{fontSize: 18, marginLeft: 8}}>Basic Details:</Text>
          <FormInput
              placeholder="Name"
              updateOriginalValue={txt => console.log(txt)}
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              onSubmit={event => console.log('submitted:',event.nativeEvent.text)}
            />
          <FormInput
              placeholder="Street"
              updateOriginalValue={txt => console.log(txt)}
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              onSubmit={event => console.log('submitted:',event.nativeEvent.text)}
            />
          <FormInput
              placeholder="City"
              updateOriginalValue={txt => console.log(txt)}
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              onSubmit={event => console.log('submitted:',event.nativeEvent.text)}
            />
          <FormInput
              placeholder="Phone"
              updateOriginalValue={txt => console.log(txt)}
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              onSubmit={event => console.log('submitted:',event.nativeEvent.text)}
            />
          <FormInput
              placeholder="Description"
              updateOriginalValue={txt => console.log(txt)}
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              onSubmit={event => console.log('submitted:',event.nativeEvent.text)}
            />
        </ShadowCard2>

        <BlankDivider height={16}/>

        <ShadowCard2>
          <Text style={{fontSize: 18, marginLeft: 8}}>Tags:</Text>
          <View style={{flexDirection:'row',marginLeft: 8}}>
            <Tag
              text ="Bakery"
              textColor = "black"
            />
            <Tag
              text ="Cakes"
              textColor = "black"
            />
            <Tag
              text ="Special Events"
              textColor = "black"
            />
            <Tag
              text ="Meat"
              textColor = "black"
            />
          </View>
          <View style={{flexDirection:'row',marginLeft: 8}}>
            <Tag
              text ="Delivery"
              textColor = "black"
            />
            <Tag
              text ="Home Food"
              textColor = "black"
            />
            <Tag
              text ="Special Events"
              textColor = "black"
            />
          </View>
        </ShadowCard2>

        <BlankDivider height={16}/>

        <ShadowCard2>
          <View style={{flexDirection:'row',marginLeft: 8}}>
            <Text style={{fontSize: 18}}>Add Cover Photo:</Text>
            <ImagePickerIcon/>
          </View>
        </ShadowCard2>

        <BlankDivider height={16}/>
        <Button2
          onClick={() => navigation.navigate("AddDishes")} //here use global args from all forms
          borderColor = "black"
          fillColor = "white"
          text ="Next"
          textColor = "black"
        />
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </View>
  )
};

KitchenBioScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

  })

export default KitchenBioScreen;