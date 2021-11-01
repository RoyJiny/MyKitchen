import React from 'react'
import {View,StyleSheet} from 'react-native'

import Backdrop from '../../components/Backdrop';
import Button from '../../components/Button';

const MyKitchenScreen = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <Backdrop text='My Kitchen' height={80}/>
            <Button
                onClick={() => navigation.navigate("KitchenPreview")}
                borderColor = "black"
                fillColor = "white"
                text ="Go Preview"
                textColor = "black"
            />
        </View>
    )
};

MyKitchenScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

});

export default MyKitchenScreen;