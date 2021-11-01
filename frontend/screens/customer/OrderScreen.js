import React from 'react'
import {View,StyleSheet,Text} from 'react-native'

const OrderScreen = ({navigation}) => {
  return (
    <View style={{flex:1}}>
        <Text>Order Screen</Text>
    </View>
  )
};

OrderScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

});

export default OrderScreen;