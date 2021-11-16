import React from 'react';
import {View,StyleSheet,Text,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard} from 'react-native';

import BackButton from '../../components/BackButton';
import Tag from '../../components/Tag';
import Button2 from '../../components/Button2';
import FormInput from '../../components/FormInput';
import ShadowCard2 from '../../components/ShadowCard2';
import BlankDivider from '../../components/BlankDivider';
import ImagePickerIcon from '../../components/ImUp';

const EditBioScreen = ({navigation, loginCB}) => {
  return (
    <View style={{flex:1}}>
      <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <View style={{ flexDirection:'row', justifyContent: 'space-between', alignContent: 'center', paddingRight: 24 }}>
          <BackButton onClick={navigation.goBack}/>
          <Button2
            onClick={() => navigation.navigate("MyKitchenInternal")}
            borderColor = "black"
            fillColor = "white"
            text ="Done"
            textColor = "black"
          />
        </View>

        <BlankDivider height={8}/>
        <Text style={{fontSize: 20, marginLeft: 24}}>Edit Your Kitchen's Bio</Text>
        <BlankDivider height={8}/>

        <ShadowCard2>
          <Text style={{fontSize: 18, marginLeft: 8}}>Basic Details:</Text>
          <FormInput
              placeholder="Name"
              updateOriginalValue={txt => console.log(txt)}
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              onSubmit={event => console.log('submitted:',event.nativeEvent.text)}
              textInit="Cakes"
            />
          <FormInput
              placeholder="Street"
              updateOriginalValue={txt => console.log(txt)}
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              onSubmit={event => console.log('submitted:',event.nativeEvent.text)}
              textInit="Hertzel 8"
            />
          <FormInput
              placeholder="City"
              updateOriginalValue={txt => console.log(txt)}
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              onSubmit={event => console.log('submitted:',event.nativeEvent.text)}
              textInit="Tel Aviv"
            />
          <FormInput
              placeholder="Phone"
              updateOriginalValue={txt => console.log(txt)}
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              onSubmit={event => console.log('submitted:',event.nativeEvent.text)}
              textInit="058-1234567"
            />
          <FormInput
              placeholder="Description"
              updateOriginalValue={txt => console.log(txt)}
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              onSubmit={event => console.log('submitted:',event.nativeEvent.text)}
              textInit="I bake cakes for any occasions"
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
              stateInit = {true}
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
              stateInit = {true}
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

        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </View>
  )
};

EditBioScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

  })

export default EditBioScreen;