import React from 'react'
import {View,StyleSheet} from 'react-native'

import Backdrop from '../../components/Backdrop';

const MyOrdersScreen = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <Backdrop text='My Orders' height={80}/>
            
        </View>
    )
};

MyOrdersScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

});

export default MyOrdersScreen;