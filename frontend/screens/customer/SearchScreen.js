import React from 'react'
import {View,StyleSheet,Text} from 'react-native'

import Button from '../../components/Button';

const SearchScreen = ({navigation}) => {
  return (
    <View style={{flex:1}}>
        <Text>Search</Text>
        <Button
          onClick={() => navigation.navigate("KitchenPage")}
          borderColor = "black"
          fillColor = "white"
          text ="Go To Kitchen"
          textColor = "black"
        />
    </View>
  )
};

SearchScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

});

export default SearchScreen;