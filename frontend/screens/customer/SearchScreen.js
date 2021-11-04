import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import * as Icons from '@expo/vector-icons';

import Colors from '../../globals/Colors';

import Button from '../../components/Button';
import Input from '../../components/Input';

const SearchScreen = ({navigation}) => {
  return (
    <View style={{flex:1}}>
        <View style={styles.searchBarContainer}>
          <Input
            icon={{component:Icons.Feather, name: 'search'}}
            iconName="search"
            placeholder="search"
            updateOriginalValue={txt => console.log(txt)}
            additionalStyle={{marginHorizontal: 16}}
            onSubmit={event => console.log('submitted:',event.nativeEvent.text)}
          />
        </View>
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

SearchScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: Colors.black,
    height: 80,
  }
});

export default SearchScreen;