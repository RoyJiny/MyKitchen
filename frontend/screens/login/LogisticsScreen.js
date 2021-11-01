import React from 'react'
import {View,StyleSheet,Text} from 'react-native'

import Button from '../../components/Button';

const LogisticsScreen = ({navigation,loginCB}) => {
  return (
    <View style={{flex:1}}>
      <Text>Edit Logistics</Text>
      <Button
        onClick={loginCB}
        borderColor = "black"
        fillColor = "white"
        text ="Finish"
        textColor = "black"
      />
    </View>
  )
};

LogisticsScreen.navigationOptions = (props) => {
  return {};  
};

const styles = StyleSheet.create({

});

export default LogisticsScreen;