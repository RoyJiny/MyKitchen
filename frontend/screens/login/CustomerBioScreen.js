import React, { useContext, useState } from 'react';
import {View,ScrollView,StyleSheet,Text,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { UserContext } from "../../contexts/UserContext";

import BackButton from '../../components/BackButton';
import Button2 from '../../components/Button2';
import FormInput from '../../components/FormInput';
import ShadowCard2 from '../../components/ShadowCard2';
import BlankDivider from '../../components/BlankDivider';
import ImUp from '../../components/ImUp';

const CustomerBioScreen = ({navigation, loginCB}) => {
  const {user, setUser} = useContext(UserContext);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(user.imgUrl);
  const [firstTime, setfirstTime] = useState(true);

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
        </ShadowCard2>

        <BlankDivider height={16}/>

        <ShadowCard2>
          <View style={{flexDirection:'row',marginLeft: 8}}>
            <Text style={{fontSize: 18}}>Change Profile Photo:</Text>
            <ImUp image= {image} setImage= {setImage}/>
          </View>
        </ShadowCard2>

        <BlankDivider height={16}/>
        <TouchableOpacity onPress={()=>{setfirstTime(false)}}>
        <Button2
          onClick={() => {setUser({...user, ...{name: name,phone: phone,imgUrl:image}}); navigation.navigate("ExploreScreen");}} //here use global args from all forms and send to DB
          borderColor = "black"
          fillColor = "white"
          text ="Done"
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

CustomerBioScreen.navigationOptions = (props) => {
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

export default CustomerBioScreen;