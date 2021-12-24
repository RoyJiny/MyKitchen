import React, { useContext, useState, useEffect } from 'react';
import {View,ScrollView,StyleSheet,Text,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard, TouchableOpacity,TextInput} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import Colors from '../../globals/Colors';

import { send_post_request, send_get_request } from '../../utils/requests';
import { SellerContext } from "../../contexts/SellerContext";
import {BackButton,Tag,Button2,FormInput,ShadowCard2,BlankDivider,ImChange} from '../../components';

const KitchenBioScreen = ({navigation, loginCB}) => {
  const {seller, setSeller} = useContext(SellerContext);
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [tagList, setTagList] = useState([]);
  const [image, setImage] = useState("https://pixsector.com/cache/d69e58d4/avbfe351f753bcaa24ae2.png");
  const [firstTime, setfirstTime] = useState(true);
  const [categories, setCategories] = useState([]);
  
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
    send_get_request('verify/request_verification/bio/?phone='+phone)
      .then(() => {
        setCodeState('');
        setWrongPhone(false);
        setWaitingCode(true);
      })
      .catch(err => {console.log(err);setWrongPhone(true);});
  }

  const sendCode = async (code,phone) => {
    send_post_request("verify/submit_code/bio/",{code: code, phone: phone})
      .then(() => {
        setWaitingCode(false);
        setWrongCode(false);
        setWrongPhone(false);
        setShowPhone(false);
        setSeller({...seller, kitchen: {...seller.kitchen, bio: {name: name,street: street,city: city,phone: phone,description: description,tags: tagList,coverImage:image}}}); navigation.navigate("AddDishes");
      })
      .catch(err => {console.log(err);setWrongCode(true);});
  }

  return (
    <ScrollView style={{flex:1, paddingTop: 16, marginHorizontal: 8}}>
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
          <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal: 8}}>
            <Text style={{fontSize: 18}}>Add Cover Photo:</Text>
            <ImChange isActive={true} image={image} setImage={setImage}/>
          </View>
        </ShadowCard2>
        

        <BlankDivider height={16}/>
        <TouchableOpacity onPress={()=>{setfirstTime(false)}}>
        <Button2
          treatAsAsync={false}
          onClick={() => {setShowPhone(true);}}
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