import React from 'react'
import {View,StyleSheet} from 'react-native'
import * as Icons from '@expo/vector-icons'

import LogoButton from '../../components/LogoButton';
import Backdrop from '../../components/Backdrop';
import BlankDivider from '../../components/BlankDivider';

const LoginScreen = ({navigation, loginCB}) => {
  return (
    <View style={{flex:1}}>
      <Backdrop text='My Kitchen' height={120}/>
      <View style={{flex:1, alignSelf: 'stretch', justifyContent: 'center'}}>
        <LogoButton
          logoConf={{
            isIcon: false,
            imageLink:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png',
            size: 20            
          }}
          onClick={loginCB}
          borderColor='black'
          fillColor='white'
          text='Sign in with Google'
          textColor='black'
        />
        <BlankDivider height={35}/>
        <LogoButton
          logoConf={{
            isIcon: true,
            iconName: 'chef-hat',
            iconComponent: Icons.MaterialCommunityIcons,
            size: 20,
            color: 'black'
          }}
          onClick={() => navigation.navigate("SellerSignin")}
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

});

export default LoginScreen;