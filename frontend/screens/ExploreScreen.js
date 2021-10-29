import React from 'react'
import {View,StyleSheet} from 'react-native'

import Backdrop from '../components/Backdrop';

const ExploreScreen = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <Backdrop text='Explore' height={80}/>
            
        </View>
    )
};

ExploreScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

});

export default ExploreScreen;