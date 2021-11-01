import React from 'react'
import {View,StyleSheet,Text} from 'react-native'

import Button from '../../components/Button';

const KitchenPageScreen = ({navigation}) => {
  return (
    <View style={{flex:1}}>
        <Text>Kitchen Page</Text>
        <Button
          onClick={() => navigation.navigate("Order")}
          borderColor = "black"
          fillColor = "white"
          text ="Go Order"
          textColor = "black"
        />
    </View>
  )
};

KitchenPageScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

});

export default KitchenPageScreen;