import React from 'react';
import {View,StyleSheet} from 'react-native';

const ShadowCard = ({children}) => {
    return(
        <View style={styles.card}>
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
        paddingHorizontal: 5,
        paddingVertical: 20,
        alignItems: 'stretch'
    }
});

export default ShadowCard;