import React, { useContext, useState } from 'react';
import {View,ScrollView,StyleSheet,Text,KeyboardAvoidingView,TouchableWithoutFeedback,TouchableOpacity,Keyboard} from 'react-native';
import { SellerContext } from "../../contexts/SellerContext";
import * as Animatable from 'react-native-animatable';

import {BackButton,Tag,Button2,FormInput,ShadowCard2,BlankDivider,ImUp} from '../../components';

const EditBioScreen = ({navigation, loginCB}) => {
  const {seller, setSeller} = useContext(SellerContext);
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [tagList, setTagList] = useState([]);
  const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png");
  const [firstTime, setfirstTime] = useState(true);
  const [categories, setCategories] = useState([]);

  const addTag = (text) => {
    setTagList([...tagList, text])
  }

  const removeTag = (text) => {
    setTagList(tagList.filter(t => t !== text))
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1, marginTop: 16, marginHorizontal: 8}}>
        <View style={{ flexDirection:'row', justifyContent: 'space-between', alignContent: 'center', paddingRight: 16 }}>
          <BackButton onClick={navigation.goBack}/>
          <TouchableOpacity onPress={()=>{setfirstTime(false)}}>
          <Button2
            onClick={() => {setSeller({...seller, ...{kitchen: {...seller.kitchen, ...{bio: {name: name,street: street,city: city,phone: phone,description: description,tags: tagList,coverImage:image}}}}});navigation.navigate("MyKitchenInternal");}} //here use global args from all forms and send to DB
            borderColor = "black"
            fillColor = "white"
            text ="Done"
            textColor = "black"
            disable = { name.length > 0 && street.length > 0 && city.length > 0 && phone.length > 0 && description.length > 0 ? false : true }
          />
          </TouchableOpacity>
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
            { firstTime==true || name.length > 0 ? null :
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.validation}>Please enter a Name for the kitchen</Text>
              </Animatable.View>
            }

          <FormInput
              placeholder="Street"
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              textInit={street}
              setState={setStreet}
            />
            { firstTime==true || street.length > 0 ? null :
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.validation}>Please enter a Street for the kitchen</Text>
              </Animatable.View>
            }

          <FormInput
              placeholder="City"
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              textInit={city}
              setState={setCity}
            />
            { firstTime==true || city.length > 0 ? null :
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.validation}>Please enter a City for the kitchen</Text>
              </Animatable.View>
            }

          <FormInput
              placeholder="Phone"
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              textInit={phone}
              setState={(text) => setPhone(text)}
            />
            { firstTime==true || phone.length > 0 ? null :
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.validation}>Please enter a Phone for the kitchen</Text>
              </Animatable.View>
            }

          <FormInput
              placeholder="Description"
              additionalStyle={{marginLeft: 8, marginRight: 48}}
              textInit={description}
              setState={setDescription}
              multi={true}
            />
            { firstTime==true || description.length > 0 ? null :
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.validation}>Please enter a Description for the kitchen</Text>
              </Animatable.View>
            }
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

        <BlankDivider height={32}/>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </ScrollView>
  )
};

EditBioScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({
  validation: {
    color: "red",
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 2,
  },
  })

export default EditBioScreen;