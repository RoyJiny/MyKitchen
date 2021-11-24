import React, { useContext, useState } from 'react';
import {View,StyleSheet,Text,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard} from 'react-native';
import { UserContext } from "../../contexts/UserContext";

import BackButton from '../../components/BackButton';
import Tag from '../../components/Tag';
import Button2 from '../../components/Button2';
import FormInput from '../../components/FormInput';
import ShadowCard2 from '../../components/ShadowCard2';
import BlankDivider from '../../components/BlankDivider';
import ImUp from '../../components/ImUp';

const EditBioScreen = ({navigation, loginCB}) => {
  const {user, setUser} = useContext(UserContext);
  const [name, setName] = useState(user.kitchen.bio.name);
  const [street, setStreet] = useState(user.kitchen.bio.street);
  const [city, setCity] = useState(user.kitchen.bio.city);
  const [phone, setPhone] = useState(user.kitchen.bio.phone);
  const [description, setDescription] = useState(user.kitchen.bio.description);
  const [tagList, setTagList] = useState(user.kitchen.bio.tags);
  const [image, setImage] = useState(user.kitchen.bio.coverImage);

  const addTag = (text) => {
    setTagList([...tagList, text])
  }

  const removeTag = (text) => {
    setTagList(tagList.filter(t => t !== text))
  }

  return (
    <View style={{flex:1, marginTop: 16, marginHorizontal: 8}}>
      <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <View style={{ flexDirection:'row', justifyContent: 'space-between', alignContent: 'center', paddingRight: 16 }}>
          <BackButton onClick={navigation.goBack}/>
          <Button2
            onClick={() => {setUser({...user, ...{kitchen: {...user.kitchen, ...{bio: {name: name,street: street,city: city,phone: phone,description: description,tags: tagList,coverImage:image}}}}});navigation.navigate("MyKitchenInternal");}} //here use global args from all forms and send to DB
            borderColor = "black"
            fillColor = "white"
            text ="Done"
            textColor = "black"
          />
        </View>

        <BlankDivider height={8}/>
        <Text style={{fontSize: 20, marginLeft: 24}}>Tell Us About Your Kitchen</Text>
        <BlankDivider height={8}/>

        <ShadowCard2>
          <Text style={{fontSize: 18, marginLeft: 8}}>Basic Details:</Text>
          <FormInput
              placeholder="Name"
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              textInit={name}
              setState={setName}
            />
          <FormInput
              placeholder="Street"
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              textInit={street}
              setState={setStreet}
            />
          <FormInput
              placeholder="City"
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              textInit={city}
              setState={setCity}
            />
          <FormInput
              placeholder="Phone"
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              textInit={phone}
              setState={(text) => setPhone(text)}
            />
          <FormInput
              placeholder="Description"
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              textInit={description}
              setState={setDescription}
            />
        </ShadowCard2>

        <BlankDivider height={16}/>

        <ShadowCard2>
          <Text style={{fontSize: 18, marginLeft: 8}}>Tags:</Text>
          <View style={{flexDirection:'row',marginLeft: 8}}>
            <Tag
              text ="Bakery"
              textColor = "black"
              stateInit = {tagList.includes("Bakery")}
              add = {addTag}
              remove = {removeTag}
            />
            <Tag
              text ="Cakes"
              textColor = "black"
              stateInit = {tagList.includes("Cakes")}
              add = {addTag}
              remove = {removeTag}
            />
            <Tag
              text ="Special Events"
              textColor = "black"
              stateInit = {tagList.includes("Special Events")}
              add = {addTag}
              remove = {removeTag}
            />
            <Tag
              text ="Meat"
              textColor = "black"
              stateInit = {tagList.includes("Meat")}
              add = {addTag}
              remove = {removeTag}
            />
          </View>
          <View style={{flexDirection:'row',marginLeft: 8}}>
            <Tag
              text ="Delivery"
              textColor = "black"
              stateInit = {tagList.includes("Delivery")}
              add = {addTag}
              remove = {removeTag}
            />
            <Tag
              text ="Home Food"
              textColor = "black"
              stateInit = {tagList.includes("Home Food")}
              add = {addTag}
              remove = {removeTag}
            />
            <Tag
              text ="Vegan"
              textColor = "black"
              stateInit = {tagList.includes("Vegan")}
              add = {addTag}
              remove = {removeTag}
            />
          </View>
        </ShadowCard2>

        <BlankDivider height={16}/>

        <ShadowCard2>
          <View style={{flexDirection:'row',marginLeft: 8}}>
            <Text style={{fontSize: 18}}>Add Cover Photo:</Text>
            <ImUp image= {image} setImage= {setImage}/>
          </View>
        </ShadowCard2>

        <BlankDivider height={16}/>
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