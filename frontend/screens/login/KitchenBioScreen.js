import React from 'react'
import {View,StyleSheet,Text} from 'react-native'

import Button from '../../components/Button';

const KitchenBioScreen = ({navigation}) => {
  return (
    <View style={{flex:1}}>
        <Text>Create Kitchen Bio</Text>
        <Button
          onClick={() => navigation.navigate("AddDishes")}
          borderColor = "black"
          fillColor = "white"
          text ="Next"
          textColor = "black"
        />
    </View>
  )
};

KitchenBioScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

});

export default KitchenBioScreen;