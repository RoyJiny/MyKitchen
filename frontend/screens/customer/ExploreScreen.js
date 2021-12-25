import React,{useState, useContext, useEffect} from 'react'
import {View,StyleSheet,ScrollView,Text} from 'react-native'
import { UserContext } from "../../contexts/UserContext";
import { generalContext } from "../../contexts/generalContext";

import { ServerBase } from '../../globals/globals';
import Colors from '../../globals/Colors';

import {Backdrop,KitchenExploreCard} from '../../components';

import { send_get_request } from '../../utils/requests';
import { ActivityIndicator } from 'react-native-paper';

const ExploreScreen = ({navigation}) => {
  const {user, setUser} = useContext(UserContext);
  const {generalData, setGeneralData} = useContext(generalContext);
  const [pastKitchens, setPastKitchens] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const get_data_from_server = () => {
    send_get_request('users/customer/pastKitchens')
      .then(data => setPastKitchens(data))
      .catch(err => {console.log(err);setPastKitchens([])});
      
    send_get_request('tags/list',false)
    .then(data => setCategories(data.tags))
    .catch(err => {console.log(err);setCategories([])});
  }
  
  useEffect(get_data_from_server, []);

  useEffect(() => {
    if (generalData.notification_data !== undefined) {
      if (generalData.notification_data.type === 'Order') {
        navigation.navigate('MyProfile',{
          screen: 'MyProfileInternal',
          params: {orderData: generalData.notification_data.order}
        })
      } else if (generalData.notification_data.type === 'Chat') {
        navigation.navigate('MyProfile',{
          screen: 'Chat',
          params: {...generalData.notification_data.chatData},
          initial: false
        })        
      } else {
        console.log('Error: bad notification type:',data.type);
      }      
      setGeneralData({...generalData, notification_data: undefined});
    }
  },[]);

  return (
    <View style={{flex:1}}>
      <Backdrop text='Explore' height={80}/>
      <ScrollView>
        
        <Text style={styles.title}>Categories</Text>
        {
          categories.length > 0
          ? <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{marginBottom: 16, marginLeft: 8}}
            >
              {
                categories.map(category => 
                  <KitchenExploreCard
                    key={category.name}
                    kitchenName={category.name}
                    onClick={() => navigation.navigate("Search",{screen:"SearchInternal",params:{category:category.name}})}
                    imgLink={category.imgUrl}
                  />
                )
              }
            </ScrollView>
          : <ActivityIndicator color="black" size={30} style={{alignSelf:'center'}}/>
        }
        
        
        
        <Text style={styles.title}>Order Again</Text>
          {
            pastKitchens.length === 0
            ? <Text style={styles.subTitle}>No order was made yet</Text>
            : <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{marginBottom: 16, marginLeft: 8}}
            >
              {pastKitchens.map(kitchen => 
                  <KitchenExploreCard
                    onClick={() => navigation.navigate("KitchenPage",{kitchen})}
                    key={kitchen._id}
                    kitchenName={kitchen.bio.name}
                    subtitle={kitchen.bio.city}
                    imgLink={kitchen.bio.coverImg ? `${ServerBase}/images/${kitchen.bio.coverImg}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'}
                  />
                )
              }
            </ScrollView>
        }
        
        <Text style={styles.title}>Favorites</Text>
        {
          user.favorites.length == 0
          ? <Text style={styles.subTitle}>Add kitchens to your favorites</Text> 
          : <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginBottom: 16, marginLeft: 8}}
          >
            {user.favorites.map((kitchen, index) => {
              return (
                <KitchenExploreCard
                  key={index}
                  onClick={() => navigation.navigate("KitchenPage",{kitchen})}
                  kitchenName={kitchen.bio.name}
                  subtitle={kitchen.bio.city}
                  imgLink={kitchen.bio.coverImg ? `${ServerBase}/images/${kitchen.bio.coverImg}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'}
                />
              )})
            }          
          </ScrollView>
        }
      </ScrollView>
    </View>
  )
};

ExploreScreen.navigationOptions = (props) => {
  return {};  
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 16,
    marginLeft: 16,
    marginBottom: 16,
    alignSelf: 'center',
    color: Colors.lightGray
  }
});

export default ExploreScreen;