import React, { useContext, useState, useEffect } from 'react';
import {View,ScrollView,StyleSheet,Text,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { send_get_request } from '../../utils/requests';
import { SellerContext } from "../../contexts/SellerContext";
import {BackButton,Tag,Button2,FormInput,ShadowCard2,BlankDivider,ImUp} from '../../components';

const KitchenBioScreen = ({navigation, loginCB}) => {
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
  
  const get_tags = () => {
    send_get_request('tags/list',false)
    .then(data => setCategories(data.tags))
    .catch(err => {console.log(err);setCategories([])});
  }

  useEffect(get_tags, []);


  const addTag = (text) => {
    setTagList([...tagList, text])
  }

  const removeTag = (text) => {
    setTagList(tagList.filter(t => t !== text))
  }

  return (
    <ScrollView style={{flex:1, paddingTop: 16, marginHorizontal: 8}}>
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
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginHorizontal: 4}}>
            {
              categories.map(category =>
                <Tag
                  key = {category.name}
                  text = {category.name}
                  textColor = "black"
                  stateInit = {false}
                  add = {addTag}
                  remove = {removeTag}
                />
              )
            }
          </ScrollView>
        </ShadowCard2>

        <BlankDivider height={16}/>

        <ShadowCard2>
          <View style={{flexDirection:'row',marginLeft: 8}}>
            <Text style={{fontSize: 18}}>Add Cover Photo:</Text>
            <ImUp image= {image} setImage= {setImage}/>
          </View>
        </ShadowCard2>
        

        <BlankDivider height={16}/>
        <TouchableOpacity onPress={()=>{setfirstTime(false)}}>
        <Button2
          onClick={() => {setSeller({...seller, kitchen: {...seller.kitchen, bio: {name: name,street: street,city: city,phone: phone,description: description,tags: tagList,coverImage:image}}}); navigation.navigate("AddDishes");}}
          borderColor = "black"
          fillColor = "white"
          text ="Next"
          textColor = "black"
          disable = { name.length > 0 && street.length > 0 && city.length > 0 && phone.length > 0 && description.length > 0 ? false : true }
        />
        </TouchableOpacity>
        
        <BlankDivider height={32}/>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </ScrollView>
  )
};

KitchenBioScreen.navigationOptions = (props) => {
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

export default KitchenBioScreen;