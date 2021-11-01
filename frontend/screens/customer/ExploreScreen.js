import React from 'react'
import {View,StyleSheet} from 'react-native'

import Backdrop from '../../components/Backdrop';
import Button from '../../components/Button';

const ExploreScreen = ({navigation}) => {
    return (
        <View style={{flex:1}}>
            <Backdrop text='Explore' height={80}/>
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

ExploreScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({

});

export default ExploreScreen;