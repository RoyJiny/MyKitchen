import React,{useState,useContext} from 'react'
import {View,StyleSheet,Text,Dimensions,TouchableOpacity,Linking,ScrollView,ActivityIndicator,} from 'react-native'
import * as Icons from '@expo/vector-icons'

import Colors from '../../globals/Colors';
import { ServerBase } from '../../globals/globals';
import { UserContext } from '../../contexts/UserContext';
import { generalContext } from '../../contexts/generalContext';
import { send_post_request } from '../../utils/requests';

import Modal from 'react-native-modal';
import {Button,BackButton,ShadowCard,ExpantionArrow,OrderMenuItem,BlankDivider,ImageWithIndicator} from '../../components';

const KitchenPageScreen = ({route,navigation}) => {
  const {kitchen} = route.params;
  
  const {user,setUser} = useContext(UserContext);
  const {generalData: {location}} = useContext(generalContext);
  const [expandTimes, setExpandTimes] = useState(false);
  const [isFavorite, setIsFavorite] = useState(user.favorites.filter(k => k._id === kitchen._id).length > 0);
  
  const initial_item_counts = {};
  for (const item of kitchen.menu) {
    initial_item_counts[item._id] = {count: 0, price: item.price};
  }
  const [itemCounts, setItemCounts] = useState(initial_item_counts);
  const [showBanner, setShowBanner] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState({name: "", price: 0,description: "",img: ""});
  const [showAlert, setShowAlert] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  let isClosed = false;

  if (isLoading) {
    if (kitchen.distance === undefined) {
      send_post_request('users/customer/getDistance',{
        id: kitchen._id,
        location: location
      })
      .then(data => {kitchen.distance = data.distance; setIsLoading(false);})
      .catch(err => {console.log(err); kitchen.distance=0 ; setIsLoading(false);});
    } else {
      setIsLoading(false);
    }
    return <ActivityIndicator size={50} color='black'/>;
  }

  const getCloseTimeDesc = () => {
    const date = new Date();
    const day = kitchen.logistics.operationDays[date.getDay()];
    const currentTime = date.getHours() * 60 + date.getMinutes();
    if (day.isActive) {
      const openingHours = parseInt(day.startTime.split(':')[0]);
      const openingMinutes = parseInt(day.startTime.split(':')[1]);
      const closingHours = parseInt(day.endTime.split(':')[0]);
      const closingMinutes = parseInt(day.endTime.split(':')[1]);
      const openingTime = openingHours * 60 + openingMinutes;
      const closingTime = closingHours * 60 + closingMinutes;
      if (openingTime <= currentTime && closingTime >= currentTime) {
        return `Closing at ${day.endTime}`
      }
    }
    isClosed = true
    return 'Currently Closed';
  };

  const hasItemsInOrder = () => Object.values(itemCounts).map(item => item.count).reduce((prev,curr) => prev+curr) > 0;

  return (
    <View style={{flex:1}}>
      <Modal backdropColor='rgba(0,0,0,0.99)' isVisible={showModal} onBackdropPress={() => setShowModal(false) }>
        <View style={{marginHorizontal: Dimensions.get('window').width*0.12, backgroundColor: 'white', borderRadius: 10}}>
        <View style={{
          flexDirection:'column',
          marginHorizontal:0,
          alignItems: 'center'
        }}>
          <BlankDivider height={8}/>
          <View style={{
            flexDirection:'row',
            alignItems: 'center',
          }}>
            
            <ImageWithIndicator imageStyle={{width: 80,height:80, borderRadius: 10}} imgLink={modalState.img}/>

            <View style={{
              flexDirection:'column',
              justifyContent:'space-between',
              marginLeft: 16
            }}>
            <Text style={{textAlign:"left",fontWeight: 'bold', fontSize: 18}}>{modalState.name}</Text>
            <BlankDivider height={8}/>
            <Text style={{textAlign:"left"}}>${modalState.price}</Text>
            </View>
          </View>
          <BlankDivider height={4}/>
          <View>
            <Text style={{marginHorizontal: 16 }}>{modalState.description}</Text>
          </View>
        </View>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={{alignItems: 'center', marginVertical: 4}}
          >
            <Text style={{fontWeight: 'bold'}}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      
      <Modal isVisible={showAlert} onBackdropPress={() => {setShowAlert(false);}}>
        <View style={{marginHorizontal: 16, backgroundColor: 'white', borderRadius: 10}}>
          <Text style={{margin: 8, fontSize: 18, textAlign: 'center'}}>Please add items to your orders.</Text>
        </View>
      </Modal>
    
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.imageWrapper}>
        <ImageWithIndicator imageStyle={{width: Dimensions.get('window').width, height: 150}} imgLink={kitchen.bio.coverImg ? `${ServerBase}/images/${kitchen.bio.coverImg}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'}/>
      </View>

      <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
        <View style={styles.rowView}>
          <BackButton onClick={navigation.goBack}/>
          <Text style={styles.title}>{kitchen.bio.name}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
          <Icons.Entypo
            name='chat'
            style={{marginRight: 16}}
            size={32}
            onPress={() => {
              navigation.navigate('Chat',{customer_id: user._id,customer_name:user.name, kitchen_id: kitchen._id,kitchen_name:kitchen.bio.name, isCustomer: true})
            }}
          />
          <Icons.FontAwesome 
            name={isFavorite ? 'star' : 'star-o'}
            style={{marginRight: 16}}
            size={32}
            color={isFavorite ? 'gold' : 'black'} 
            onPress={() => {
              if (!isFavorite) {
                send_post_request('users/customer/edit/favorites/add',{id: kitchen._id})
                  .then(() => {user.favorites = [...user.favorites, kitchen]; setIsFavorite(true); setUser(user);})
                  .catch(err => console.log(err));
              } else {
                send_post_request('users/customer/edit/favorites/remove',{id: kitchen._id})
                  .then(() => {user.favorites = user.favorites.filter(k => k._id !== kitchen._id); setIsFavorite(false); setUser(user);})
                  .catch(err => console.log(err));
              }
            }} />
          </View>
      </View>

      <View style={{marginHorizontal: 16}}>
        <ShadowCard>
          {kitchen.rating.value !== 0 && <View style={styles.rowView}>
            <Icons.FontAwesome name="star" size={16} color="black"/>
            <Text style={styles.details}>{kitchen.rating.value.toFixed(1)}</Text>
          </View>}
          <View style={styles.rowView}>
            <Icons.FontAwesome5 name="clock" size={16} color="black"/>
            {
              kitchen.logistics.isOnlyFutureDelivery
               ? <Text style={styles.details}>Future Deliveries Only</Text>
               : <View style={{flexDirection: 'row',alignItems:'center'}}>
                  <ExpantionArrow
                    text={getCloseTimeDesc()}
                    isInitaialyExpanded={expandTimes}
                    onClick={() => setExpandTimes(!expandTimes)}
                  />
                </View>
            }
          </View>
          {expandTimes ?
            kitchen.logistics.operationDays.map(day => 
              <Text key={day.day} style={styles.time}>
                {`${day.day}: ${day.isActive ? `${day.startTime}-${day.endTime}` : 'Closed'}`}
              </Text>
            )
            : null
          }
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${kitchen.bio.phone}`)}>
            <View style={styles.rowView}>
              <Icons.FontAwesome name="phone" size={16} color="black"/>
              <Text style={styles.details}>{kitchen.bio.phone}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.rowView}>
            <Icons.Entypo name="map" size={16} color="black"/>
            <Text style={styles.details}>{kitchen.bio.city}    {kitchen.distance.toFixed(1)} km</Text>
          </View>
        </ShadowCard>
      </View>

      <View style={[styles.rowView,{justifyContent:'space-between',marginBottom:16}]}>
        <Text style={styles.smallTitle}>Menu</Text>
          <Button
            onClick={() => {if (hasItemsInOrder()){navigation.navigate("Order",{params: {"itemCounts":itemCounts,"kitchen": kitchen,"isClosed": isClosed}})} else {setShowAlert(true)}}}
            borderColor="black"
            fillColor="white"
            text="Order"
            textColor={Colors.lightGray}
            height={30}
            width={100}
          />
      </View>

      {
        kitchen.menu.map(dish => 
          <OrderMenuItem
            key={dish._id}
            itemName={dish.name}
            price={dish.price}
            description={dish.description}
            count={itemCounts[dish._id].count}
            setCount={diff => {setItemCounts({...itemCounts, [dish._id]: {count: Math.min(Math.max(itemCounts[dish._id].count+diff,0),9), price: itemCounts[dish._id].price}})}}
            imgLink={dish.img ? `${ServerBase}/images/${dish.img}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'}
          />
        )
      }

    </ScrollView>
    </View>
  )
};

KitchenPageScreen.navigationOptions = (props) => {
    return {};  
};

const styles = StyleSheet.create({
  image: {
    height: 150,
  },
  imageWrapper: {
    elevation: 40,
    marginBottom: 16
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 16
  },
  smallTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16
  },
  rowView: {
    flexDirection: 'row',
    marginLeft: 8,
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 8
  },
  details: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16
  },
  navigateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
    color: "#7CC0FA",
  },
  time: {
    fontSize: 14,
    color: Colors.lightGray,
    marginLeft:40
  }
});

export default KitchenPageScreen;