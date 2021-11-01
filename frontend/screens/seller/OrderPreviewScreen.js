import React from 'react'
import {View,StyleSheet,Text} from 'react-native'

const OrderPreviewScreen = ({navigation}) => {
  return (
    <View style={{flex:1}}>
        <Text>Order #11111</Text>
    </View>
  )
};

OrderPreviewScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

});

export default OrderPreviewScreen;