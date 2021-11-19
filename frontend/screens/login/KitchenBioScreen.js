import React from 'react';
import {View,StyleSheet,Text,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard} from 'react-native';

import BackButton from '../../components/BackButton';
import Tag from '../../components/Tag';
import Button2 from '../../components/Button2';
import FormInput from '../../components/FormInput';
import ShadowCard2 from '../../components/ShadowCard2';
import BlankDivider from '../../components/BlankDivider';
import ImagePickerIcon from '../../components/ImUp';

const KitchenBioScreen = ({navigation, loginCB}) => {
  return (
    <View style={{flex:1, marginTop: 16, marginHorizontal: 8}}>
      <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <View style={{ flexDirection:'row'}}>
          <BackButton onClick={navigation.goBack}/>
        </View>

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
              textInit=""
            />
          <FormInput
              placeholder="Street"
              updateOriginalValue={txt => console.log(txt)}
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              onSubmit={event => console.log('submitted:',event.nativeEvent.text)}
              textInit=""
            />
          <FormInput
              placeholder="City"
              updateOriginalValue={txt => console.log(txt)}
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              onSubmit={event => console.log('submitted:',event.nativeEvent.text)}
              textInit=""
            />
          <FormInput
              placeholder="Phone"
              updateOriginalValue={txt => console.log(txt)}
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              onSubmit={event => console.log('submitted:',event.nativeEvent.text)}
              textInit=""
            />
          <FormInput
              placeholder="Description"
              updateOriginalValue={txt => console.log(txt)}
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              onSubmit={event => console.log('submitted:',event.nativeEvent.text)}
              textInit=""
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