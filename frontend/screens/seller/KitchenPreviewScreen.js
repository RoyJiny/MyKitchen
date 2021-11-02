import React from 'react'
import {View,StyleSheet,Text} from 'react-native'

const KitchenPreviewScreen = ({navigation}) => {
  return (
    <View style={{flex:1}}>
        <Text>My Kitchen </Text>
    </View>
  )
};

KitchenPreviewScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

});

export default KitchenPreviewScreen;