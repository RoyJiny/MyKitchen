import React from 'react';
import {View,StyleSheet,ScrollView,Dimensions, Text} from 'react-native';
import * as Icons from '@expo/vector-icons';

import Colors from '../../globals/Colors';

import Button from '../../components/Button';
import Input from '../../components/Input';
import SearchCard from '../../components/SearchCard';

const SearchScreen = ({navigation}) => {
  return (
    <View style={{flex:1}}>
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
        <View style={{
            height: 30,
            backgroundColor: 'transparent'
        }}/>
        <View style={{flex:1}}>
          <ScrollView>
            <ScrollView
                vertical={true}
                showsHorizontalScrollIndicator={false}
                automaticallyAdjustContentInsets = {true}
                style={{marginBottom: 16, marginLeft: 8}}
            >
              <SearchCard
              onClick={() => navigation.navigate("KitchenPage")}
                  OrderName="Super Cake"
                  description="Uniqe deserts at your service"
                  imgLink="https://preppykitchen.com/wp-content/uploads/2019/06/Chocolate-cake-recipe-1200a-500x375.jpg"
                  distance= "3.2"
              />
            </ScrollView>
          </ScrollView>
        </View>
      </View>
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
  },
  kitchen: {
  }
});

export default SearchScreen;