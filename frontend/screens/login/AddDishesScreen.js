import React from 'react'
import {View,StyleSheet,Text} from 'react-native'

import Button from '../../components/Button';

const AddDishesScreen = ({navigation}) => {
  return (
    <View style={{flex:1}}>
        <Text>Add Dishes</Text>
        <Button
          onClick={() => navigation.navigate("Logistics")}
          borderColor = "black"
          fillColor = "white"
          text ="next"
          textColor = "black"
        />
    </View>
  )
};

AddDishesScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

});

export default AddDishesScreen;