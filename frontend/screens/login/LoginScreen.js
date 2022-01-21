import React,{useState, useContext} from 'react';
import {View,StyleSheet,Text} from 'react-native'
import * as Animatable from 'react-native-animatable';
import * as Icons from '@expo/vector-icons'
import { UserContext } from "../../contexts/UserContext";

import {signin,register} from '../../api/google_signin';

import {LogoButton,Backdrop,BlankDivider} from '../../components';

const LoginScreen = ({navigation, loginCB}) => {
  const {user, setUser} = useContext(UserContext);
  const [isLoadingSignin, setIsLoadingSignin] = useState(false);
  const [isLoadingRegisterCustomer, setIsLoadingRegisterCustomer] = useState(false);
  const [failedSigninMessage, setFailedSigninMessage] = useState("");
  const [failedRegisterMessage, setFailedRegisterMessage] = useState("");

  const resetErrors = () => {
    setFailedRegisterMessage("");
    setFailedSigninMessage("");
  }

  return (
    <View style={{flex:1}}>
      <Backdrop text='My Kitchen' height={120}/>
      <View style={{flex:1, alignSelf: 'stretch', justifyContent: 'center'}}>
        <LogoButton
          isLoading={isLoadingSignin}
          logoConf={{
            isIcon: false,
            imageLink:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png',
            size: 20            
          }}
          onClick={() => {
            resetErrors();
            setIsLoadingSignin(true);
            signin(loginCB,() => setIsLoadingSignin(false),(newData) => setUser({...user, ...newData}),setFailedSigninMessage);
          }}
          borderColor='black'
          fillColor='white'
          text='Sign in with Google'
          textColor='black'
        />
        {failedSigninMessage !== "" &&
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.validation}>{failedSigninMessage}</Text>
          </Animatable.View>
        }
        
        <BlankDivider height={35}/>
        
        <LogoButton
          isLoading={isLoadingRegisterCustomer}
          logoConf={{
            isIcon: true,
            iconName: 'user',
            iconComponent: Icons.Entypo,
            size: 20,
            color: 'black'
          }}
          onClick={() => {
            resetErrors();
            setIsLoadingRegisterCustomer(true);
            register(loginCB,() => setIsLoadingRegisterCustomer(false),false,(newData) => setUser({...user, ...newData}),setFailedRegisterMessage)
          }}
          borderColor='black'
          fillColor='white'
          text='Create a Cusutomer Account'
          textColor='black'
        />
        {failedRegisterMessage !== "" &&
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.validation}>{failedRegisterMessage}</Text>
          </Animatable.View>
        }
        
        <BlankDivider height={35}/>
        
        <LogoButton
          logoConf={{
            isIcon: true,
            iconName: 'chef-hat',
            iconComponent: Icons.MaterialCommunityIcons,
            size: 20,
            color: 'black'
          }}
          onClick={() => {resetErrors();navigation.navigate("SellerSignin");}}
          borderColor='black'
          fillColor='white'
          text='Create a Seller Account'
          textColor='black'
        />
        </View>
    </View>
  )
};

LoginScreen.navigationOptions = (props) => {
  return {};
};

const styles = StyleSheet.create({
  validation: {
    color: "red",
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 8,
  },
});

export default LoginScreen;