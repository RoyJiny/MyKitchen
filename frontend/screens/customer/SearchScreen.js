import React,{useState,useEffect,useContext} from 'react';
import {View,StyleSheet,ScrollView,Text,ActivityIndicator} from 'react-native';
import * as Icons from '@expo/vector-icons';

import Colors from '../../globals/Colors';
import { ServerBase } from '../../globals/globals';

import {Input,SearchCard} from '../../components';

import {send_post_request} from '../../utils/requests';
import { UserContext } from '../../contexts/UserContext';
import { generalContext } from '../../contexts/generalContext';

const SearchScreen = ({ route, navigation }) => {
  const {user,SetUser} = useContext(UserContext);
  const {generalData:{location}} = useContext(generalContext);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const search_by_text = (text_query) => {
    setIsLoading(true);
    send_post_request('search/kitchen/text',{
      location: location,
      text_query: text_query
    })
    .then(data => {setResults(data); setIsLoading(false)})
    .catch(err => {console.log(err); setResults([]); setIsLoading(false)});
  };
  const search_by_tag = (tag) => {
    setIsLoading(true);
    send_post_request('search/kitchen/tag',{
      location: location,
      tag: tag
    })
    .then(data => {setResults(data); setIsLoading(false)})
    .catch(err => {console.log(err); setResults([]); setIsLoading(false)});
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params!==undefined && route.params.category!==undefined) {
        search_by_tag(route.params.category);
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
            updateOriginalValue={text => search_by_text(text)}
            additionalStyle={{marginHorizontal: 16}}
            onSubmit={event => search_by_text(event.nativeEvent.text)}
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
              {
                isLoading
                ? <ActivityIndicator size={30} color='black'/>
                : results.length === 0
                    ? <Text style={{alignSelf:'center'}}>No results</Text>
                    : results.map(kitchen => <SearchCard
                        key={kitchen._id}
                        onClick={() => navigation.navigate("KitchenPage",{kitchen})}
                        OrderName={kitchen.bio.name}
                        description={kitchen.bio.description}
                        imgLink={kitchen.bio.coverImg ? `${ServerBase}/images/${kitchen.bio.coverImg}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'}
                        distance={kitchen.distance.toFixed(1)}
                      />)
              }
              
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