import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Dimensions} from 'react-native';

import Colors from '../globals/Colors';

import ShadowCard from './ShadowCard';
import BlankDivider from './BlankDivider'
import ImageWithIndicator from './ImageWithIndicator';

const SearchCard = ({onClick,OrderName,description,imgLink,distance}) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <ShadowCard style={{paddingRight:150}}>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <View>
              <ImageWithIndicator imageStyle={styles.image} imgLink={imgLink}/>
            </View>
            <View style={{marginLeft:16}}>
              <Text style={styles.name}>{OrderName}</Text>
              <BlankDivider height={10} />
              <Text numberOfLines={2} style={styles.subtitle}>{description}</Text>
            </View>
          </View>
          {distance !== "" ?
            <View style={{alignSelf: 'center'}}>
              <Text style={styles.distance}>{distance+ " km"}</Text>
            </View>: null
          }
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
  distance: {
    color: Colors.black,
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    paddingRight: 15,
    paddingLeft: 20,
  },
  subtitle: {
    color: Colors.lightGray,
    textAlign: 'left',
    fontSize: 14,
    width: 175
  }
});

export default SearchCard;
