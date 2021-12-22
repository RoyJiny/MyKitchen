import React from 'react';
import {Text,StyleSheet,TouchableOpacity} from 'react-native';

import Colors from '../globals/Colors';

import ShadowCard from './ShadowCard';
import BlankDivider from './BlankDivider'
import  ImageWithIndicator from './ImageWithIndicator';

const KitchenExploreCard = ({onClick,kitchenName,subtitle,imgLink}) => {
    return (
        <TouchableOpacity onPress={onClick}>
            <ShadowCard width={150}>
                <ImageWithIndicator imageStyle={styles.image} imgLink={imgLink}/>
                {subtitle === undefined ? <BlankDivider height={10} /> : null}
                <Text style={styles.title}>{kitchenName}</Text>
                {subtitle !== undefined ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
                {subtitle === undefined ? <BlankDivider height={10} /> : null}
            </ShadowCard>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 80,
        width: 150,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
    },
    title: {
        color: Colors.black,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    subtitle: {
        color: Colors.lightGray,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 14,
    }
});

export default KitchenExploreCard;
