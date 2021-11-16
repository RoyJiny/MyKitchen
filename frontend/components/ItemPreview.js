import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Image,Dimensions} from 'react-native';

import Colors from '../globals/Colors';

import ShadowCard from './ShadowCard';
import BlankDivider from './BlankDivider'

const ItemPreview = ({onClick,OrderName,number,imgLink}) => {
    return (
        <TouchableOpacity>
            <ShadowCard>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                        <View>
                            <Image style={styles.image} source={{ uri: imgLink }}/>
                        </View>
                        <View style={{marginLeft:16}}>
                            <Text style={styles.name}>{OrderName}</Text>
                            <BlankDivider height={10} />
                            <Text style={styles.subtitle}>{"x"+number}</Text>
                        </View>
                    </View>
                    
                </View>
            </ShadowCard>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    image: {
        height: Dimensions.get('window').height*0.1,
        width: Dimensions.get('window').width*0.25,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
    },
    name: {
        color: Colors.black,
        textAlign: 'left',
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        color: Colors.lightGray,
        textAlign: 'left',
        fontSize: 14,
        fontWeight: 'bold',
    }
});

export default ItemPreview;
