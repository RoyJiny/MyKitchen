import React from 'react';
import {View,StyleSheet} from 'react-native';

const ShadowCard = ({children,width}) => {
    return(
        <View style={[styles.card,{width:width}]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0,
        shadowRadius: 5,
        elevation: 10,
        backgroundColor: '#ffffff',
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 6,
        alignItems: 'stretch',
    }
});

export default ShadowCard;