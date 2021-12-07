import React,{useState,useEffect} from 'react';
import {View,StyleSheet,ScrollView,Text} from 'react-native';
import * as Icons from '@expo/vector-icons';

import Colors from '../../globals/Colors';
import { ServerBase } from '../../globals/globals';

import Input from '../../components/Input';
import SearchCard from '../../components/SearchCard';

import {send_post_request} from '../../utils/requests';

const SearchScreen = ({ route, navigation }) => {
  const [results, setResults] = useState([]);

  const fetch_results = (text_query) => {
    send_post_request(
      'search/kitchen/text',
      {
        // TODO: use location service to get current location
        location: {
          'latitude':32.061942,
          'longitude':34.813562
        },
        text_query: text_query
      }
    )
    .then(data => setResults(data))
    .catch(err => console.log(err));
  };
  const fetch_by_tag = (tag) => {
    send_post_request(
      'search/kitchen/tag',
      {
        // TODO: use location service to get current location
        location: {
          'latitude':32.061942,
          'longitude':34.813562
        },
        tag: tag
      }
    )
    .then(data => setResults(data))
    .catch(err => console.log(err));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params!==undefined && route.params.category!==undefined) {
        fetch_by_tag(route.params.category);
        route.params.category = undefined;
      }
    });
    return unsubscribe;
  },[route,navigation]);

  return (
    <View style={{flex:1}}>
      <View style={{flex:1}}>
        <View style={styles.searchBarContainer}>
          <Input
            icon={{component:Icons.Feather, name: 'search'}}
            iconName="search"
            placeholder="search"
            updateOriginalValue={text => fetch_results(text)}
            additionalStyle={{marginHorizontal: 16}}
            onSubmit={event => fetch_results(event.nativeEvent.text)}
          />
        </View>
        <View style={{
            height: 15,
            backgroundColor: 'transparent'
        }}/>
        <View style={{
            height: 15,
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
              {results.length === 0 && <Text style={{alignSelf:'center'}}>No results</Text>}
              {results.map(kitchen => <SearchCard
                key={kitchen._id}
                onClick={() => navigation.navigate("KitchenPage",{kitchen})}
                OrderName={kitchen.bio.name}
                description={kitchen.bio.description}
                imgLink={kitchen.bio.coverImg ? `${ServerBase}/images/${kitchen.bio.coverImg}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'}
                distance={kitchen.distance.toFixed(1)}
              />)}
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
  results: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: 'bold',
    marginLeft:20,
  }
});

export default SearchScreen;