import React,{useState,useEffect,useContext} from 'react';
import {View,StyleSheet,ScrollView,Text,ActivityIndicator} from 'react-native';
import * as Icons from '@expo/vector-icons';

import Colors from '../../globals/Colors';
import { ServerBase } from '../../globals/globals';

import {Input,SearchCard,Button, BlankDivider} from '../../components';

import {send_post_request} from '../../utils/requests';
import { generalContext } from '../../contexts/generalContext';

const SearchScreen = ({ route, navigation }) => {
  const {generalData:{location}} = useContext(generalContext);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryText, setCategoryText] = useState(undefined);

  const search_by_text = (text_query) => {
    setIsLoading(true);
    setCategoryText(undefined);
    setSearchTerm(text_query)
    if (text_query === '') {
      setResults([]);
      setIsLoading(false);
      return;
    }
    send_post_request('search/kitchen/text',{
      location: location,
      text_query: text_query
    })
    .then(data => {setResults(data); setIsLoading(false)})
    .catch(err => {console.log(err); setResults([]); setIsLoading(false)});
  };

  const search_nearby = () => {
    setIsLoading(true);
    setCategoryText(undefined);
    send_post_request('search/kitchen/text',{
      location: location,
      text_query: ''
    })
    .then(data => {setResults(data); setIsLoading(false)})
    .catch(err => {console.log(err); setResults([]); setIsLoading(false)});
  };

  const search_by_tag = (tag) => {
    setIsLoading(true);
    setCategoryText(tag);
    send_post_request('search/kitchen/tag',{
      location: location,
      tag: tag
    })
    .then(data => {setResults(data); setIsLoading(false);})
    .catch(err => {console.log(err); setResults([]); setIsLoading(false)});
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params !== undefined && route.params.category !== undefined) {
        search_by_tag(route.params.category);
        route.params.category = undefined;
      }
    });
    return unsubscribe;
  },[route,navigation]);

  const nearbyButton = () => {
    return <Button
      onClick={search_nearby}
      fillColor='white'
      text='Search Nearby Kitchens'
      textColor='black'
      height={40}
      width={250}
      additionalTextStyle={{fontWeight: 'normal'}}
    />;
  };

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

        <BlankDivider height={24} />
        {categoryText !== undefined
          ? <Text style={{color: Colors.lightGray, fontSize: 16, marginLeft: 8, marginBottom: 24}}>Showing results for: {categoryText}</Text>
          : null
        }

        <View style={{flex:1}}>
          <ScrollView
              vertical={true}
              showsHorizontalScrollIndicator={false}
              automaticallyAdjustContentInsets = {true}
              style={{marginBottom: 16, marginLeft: 8}}
          >
            <BlankDivider height={12} />
            {
              isLoading
              ? <ActivityIndicator size={30} color='black'/>
              : results.length === 0
                  ? (searchTerm !== '' ? <Text style={{alignSelf:'center'}}>No results</Text> : nearbyButton())
                  : results.map(kitchen => <SearchCard
                      key={kitchen._id}
                      onClick={() => navigation.navigate("KitchenPage",{kitchen})}
                      OrderName={kitchen.bio.name}
                      description={kitchen.bio.description}
                      imgLink={kitchen.bio.coverImg ? `${ServerBase}/images/${kitchen.bio.coverImg}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'}
                      distance={kitchen.distance ? (kitchen.distance.toFixed(1) < 99 ? kitchen.distance.toFixed(1) : "99+") : ""}
                    />)
            }
            <BlankDivider height={24} />            
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