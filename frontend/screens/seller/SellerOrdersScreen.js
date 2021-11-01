import React from 'react'
import {View,StyleSheet} from 'react-native'

import Backdrop from '../../components/Backdrop';
import Button from '../../components/Button';

const SellerOrdersScreen = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <Backdrop text='Orders' height={80}/>
            <Button
                onClick={() => navigation.navigate("OrderPreview")}
                borderColor = "black"
                fillColor = "white"
                text ="Go Preview"
                textColor = "black"
            />
        </View>
    )
};

SellerOrdersScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

});

export default SellerOrdersScreen;