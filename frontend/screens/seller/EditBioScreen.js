import React, { useContext, useState, useEffect } from 'react';
import {View,ScrollView,StyleSheet,Text,KeyboardAvoidingView,TouchableWithoutFeedback,TouchableOpacity,Keyboard,TextInput} from 'react-native';
import { SellerContext } from "../../contexts/SellerContext";
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import Colors from '../../globals/Colors';

import {BackButton,Tag,Button2,FormInput,ShadowCard2,BlankDivider,ImChange} from '../../components';
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
  const [didPhoneChange,setDidPhoneChange] = useState(false);

  const [showPhone, setShowPhone] = useState(false);
  const [waitingCode, setWaitingCode] = useState(false);
  const [codeState, setCodeState] = useState('');
  const [wrongCode, setWrongCode] = useState(false);
  const [wrongPhone, setWrongPhone] = useState(false);
  
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

  const sendPhone = (phone) => {
    send_get_request('verify/request_verification/edit/?phone='+phone)
      .then(() => {
        setCodeState('');
        setWrongPhone(false);
        setWaitingCode(true);
      })
      .catch(err => {console.log(err);setWrongPhone(true);});
  }

  const sendCode = async (code,phone) => {
    send_post_request("verify/submit_code/edit/",{code: code, phone: phone})
      .then(() => {
        setWaitingCode(false);
        setWrongCode(false);
        setWrongPhone(false);
        setShowPhone(false);
        send_post_request("users/seller/edit/bio",{id: seller.kitchen._id, bio: {name: name,street: street,city: city,phone: phone,description: description,tags: tagList}})
          .then(() => {
            setSeller({...seller, ...{kitchen: {...seller.kitchen, bio: {...seller.kitchen.bio, name: name,street: street,city: city,phone: phone,description: description,tags: tagList}}}});
            if (didImageChange) {
              upload_image(image, 'coverImg', seller.kitchen._id)
                .then(() => {navigation.navigate("MyKitchenInternal");})
                .catch(err => {console.log(err);})
            } else {
              navigation.navigate("MyKitchenInternal");
            }
          })
          .catch(err => {console.log(err);});

      })
      .catch(err => {console.log(err);setWrongCode(true);});
  }

  return (
    <ScrollView>
      <Modal isVisible={showPhone} onBackdropPress={() => setShowPhone(false)}>
        <View style={{marginHorizontal: 32, backgroundColor: 'white', borderRadius: 10}}>
          <>
          <Text style={{fontSize: 20, alignSelf: 'center', marginTop: 6}}>Phone Verification</Text>
          <TextInput
            style={{
              height: 45,
              width: 200,
              paddingVertical: 5,
              paddingHorizontal: 10,
              fontSize: 16,
              margin: 4
            }}
            onChangeText={txt => {
              setPhone(txt);
            }}
            value={phone}
            placeholder={"Enter Phone Number"}
            keyboardType="numeric"
            autoFocus={true}
            onSubmitEditing={() => sendPhone(phone)}
          />
          { wrongPhone==false ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.validation}>Invalid phone number</Text>
            </Animatable.View>
          }
          </>
          {waitingCode? 
          <>
          <TextInput
            style={{
              height: 45,
              width: 200,
              paddingVertical: 5,
              paddingHorizontal: 10,
              fontSize: 16,
              margin: 4
            }}
            onChangeText={txt => {
              setCodeState(txt);
            }}
            value={codeState}
            placeholder={"Enter Verification Code"}
            keyboardType="numeric"
            autoFocus={true}
            onSubmitEditing={() => sendCode(codeState,phone)}
          />
          { wrongCode==false ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.validation}>Wrong code, try again</Text>
            </Animatable.View>
          }
          </>
          :null}
          <TouchableOpacity
            onPress={() => sendPhone(phone)}
            style={{alignItems: 'center', marginVertical: 12}}
          >
            <Text style={{color: Colors.blueLink, fontWeight: 'bold'}}>{waitingCode? 'Resend Code' : 'Send Code'}</Text>
          </TouchableOpacity>
          {waitingCode? 
          <TouchableOpacity
            onPress={() => sendCode(codeState,phone)}
            style={{alignItems: 'center', marginVertical: 12}}
          >
            <Text style={{color: Colors.blueLink, fontWeight: 'bold'}}>Submit Code</Text>
          </TouchableOpacity>
          : null}
        </View>
      </Modal>
      <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1, marginTop: 16, marginHorizontal: 8}}>
        <View style={{ flexDirection:'row', justifyContent: 'space-between', alignContent: 'center', paddingRight: 16 }}>
          <BackButton onClick={navigation.goBack}/>
          <TouchableOpacity onPress={()=>{setfirstTime(false)}}>
            {didPhoneChange? 
            <Button2
              onClick={() => {setShowPhone(true);}}  
              borderColor = "black"
              fillColor = "white"
              text ="Save"
              textColor = "black"
              treatAsAsync = {false}
              disable = { name.length > 0 && street.length > 0 && city.length > 0 && phone.length > 0 && description.length > 0 ? false : true }
            />
            :
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
            }
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
              setState={(text) => {setDidPhoneChange(true);setPhone(text);}}
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
              maxLen={200}
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
          <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal: 8}}>
            <Text style={{fontSize: 18}}>Cover Photo:</Text>
            <ImChange isActive={true} image={didImageChange ? image : `${ServerBase}/images/${image}`} setImage={(im) => {setDidImageChange(true);setImage(im);}}/>
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