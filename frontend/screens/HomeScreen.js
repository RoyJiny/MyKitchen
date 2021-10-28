import { StatusBar } from 'expo-status-bar';
import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

const HomeScreen = ({navigation}) => {
    return (
        <View>
            <Text>Google Workshop Project - HomeScreen!</Text>
        </View>
    )
};

HomeScreen.navigationOptions = (props) => {
    return {};
};

const styles = StyleSheet.create({

});

export default HomeScreen;