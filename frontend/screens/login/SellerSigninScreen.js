import React from 'react';
import {View,StyleSheet,Text,Image} from 'react-native';

import BackButton from '../../components/BackButton';
import LogoButton from '../../components/LogoButton';
import BlankDivider from '../../components/BlankDivider';

const SellerSigninScreen = ({navigation, loginCB}) => {
  return (
    <View style={{flex:1}}>
        <View style={{ flexDirection:'row'}}>
          <BackButton onClick={navigation.goBack}/>
        </View>

        <BlankDivider height={32}/>

        <Text style={{fontSize: 20, marginLeft: 24}}>First, Let's Create A User</Text>

        <BlankDivider height={32}/>

        <LogoButton
          logoConf={{
            isIcon: false,
            imageLink:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png',
            size: 20            
          }}
          onClick={() => navigation.navigate("KitchenBio")} /* loginCB */
          borderColor='black'
          fillColor='white'
          text='Sign in with Google'
          textColor='black'
        />

    </View>
  )
};

SellerSigninScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

  })

export default SellerSigninScreen;