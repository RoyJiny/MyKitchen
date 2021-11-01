import React from 'react'
import {View,StyleSheet,Text} from 'react-native'

import Button from '../../components/Button';

const SellerSigninScreen = ({navigation}) => {
  return (
    <View style={{flex:1}}>
        <Text>Seller Signin</Text>
        <Button
          onClick={() => navigation.navigate("KitchenBio")}
          borderColor = "black"
          fillColor = "white"
          text ="Next"
          textColor = "black"
        />
    </View>
  )
};

SellerSigninScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

});

export default SellerSigninScreen;