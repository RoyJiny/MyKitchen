import React from 'react'
import {View,StyleSheet,Text,Image,Dimensions,TouchableOpacity,Linking,ScrollView} from 'react-native'

import Colors from '../globals/Colors';

const KitchenCard = ({onClick,logo,description}) => {
    const widthPhone = Dimensions.get('window').width
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={styles.shadow}>
                <View style={{width:widthPhone*0.35, height: widthPhone*0.3, alignSelf:"center", flexDirection:"column", justifyContent:"space-between"}}>
                    <View style={{alignSelf:"center"}}>
                        {logo}
                    </View>
                    <View style={{alignSelf:"center"}}>
                        <Text style={styles.des}>{description}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    des: {
        color: Colors.black,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    shadow: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
        backgroundColor: '#ffffff',
        marginHorizontal: 8,
        marginBottom: 10,
        borderRadius: 6,
        alignItems: 'stretch',
    }
});

export default KitchenCard;
