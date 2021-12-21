import React, { useContext, useState, useEffect } from 'react';
import {View,ScrollView,StyleSheet,Text,KeyboardAvoidingView,TouchableWithoutFeedback,TouchableOpacity,Keyboard} from 'react-native';
import { SellerContext } from "../../contexts/SellerContext";
import * as Animatable from 'react-native-animatable';

import {BackButton,Tag,Button2,FormInput,ShadowCard2,BlankDivider,ImUp} from '../../components';
import { send_post_request, send_get_request, upload_image } from '../../utils/requests';
import {ServerBase} from '../../globals/globals';

const EditBioScreen = ({navigation}) => {

  const {seller, setSeller} = useContext(SellerContext);

  useEffect(() => {
    send_get_request("users/me/seller")
      .then(data => {setSeller(data);})
      .catch(err => {console.log(err);});
  },[]);

  const [name, setName] = useState(seller.kitchen.bio.name);
  const [street, setStreet] = useState(seller.kitchen.bio.street);
  const [city, setCity] = useState(seller.kitchen.bio.city);
  const [phone, setPhone] = useState(seller.kitchen.bio.phone);
  const [description, setDescription] = useState(seller.kitchen.bio.description);
  const [tagList, setTagList] = useState(seller.kitchen.bio.tags);
  const [image, setImage] = useState(seller.kitchen.bio.coverImg);
  const [firstTime, setfirstTime] = useState(true);
  const [categories, setCategories] = useState([]);

  const [didImageChange,setDidImageChange] = useState(false);
  
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
    <ScrollView>
      <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1, marginTop: 16, marginHorizontal: 8}}>
        <View style={{ flexDirection:'row', justifyContent: 'space-between', alignContent: 'center', paddingRight: 16 }}>
          <BackButton onClick={navigation.goBack}/>
          <TouchableOpacity onPress={()=>{setfirstTime(false)}}>
          <Button2
            onClick={async () => {
              await send_post_request("users/seller/edit/bio",{id: seller.kitchen._id, bio: {name: name,street: street,city: city,phone: phone,description: description,tags: tagList}})
            }}  
            asyncCB={() => {
              setSeller({...seller, ...{kitchen: {...seller.kitchen, bio: {...seller.kitchen.bio, name: name,street: street,city: city,phone: phone,description: description,tags: tagList}}}});
              if (didImageChange) {
                upload_image(image, 'coverImg', seller.kitchen._id)
                  .then(() => {navigation.navigate("MyKitchenInternal");})
                  .catch(err => {console.log(err);})
              } else {
                navigation.navigate("MyKitchenInternal");
              }
            }}
            borderColor = "black"
            fillColor = "white"
            text ="Save"
            textColor = "black"
            disable = { name.length > 0 && street.length > 0 && city.length > 0 && phone.length > 0 && description.length > 0 ? false : true }
          />
          </TouchableOpacity>
        </View>

        <BlankDivider height={8}/>
        <Text style={{fontSize: 20, marginLeft: 24}}>Edit your kitchen's bio:</Text>
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
                  stateInit = {tagList.includes(category.name)}
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
            <Text style={{fontSize: 18}}>Cover Photo:</Text>
            <ImUp image= {didImageChange ? image : `${ServerBase}/images/${image}`} setImage= {(im) => {setDidImageChange(true);setImage(im);}}/>
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