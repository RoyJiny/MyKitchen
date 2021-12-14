import React,{useState,useContext,useEffect} from 'react'
import {View,StyleSheet,Text,Image,Dimensions,TouchableOpacity,Linking,ScrollView,ActivityIndicator} from 'react-native'
import * as Icons from '@expo/vector-icons'

import Colors from '../../globals/Colors';
import { ServerBase } from '../../globals/globals';
import { UserContext } from '../../contexts/UserContext';
import { LocationContext } from '../../contexts/LocationContext';
import { send_post_request, send_get_request } from '../../utils/requests';
import { SellerContext } from "../../contexts/SellerContext";

import Modal from 'react-native-modal';
import {Button,BackButton,ShadowCard,ExpantionArrow,OrderMenuItem,BlankDivider,ImageWithIndicator} from '../../components';

const KitchenPreviewScreen = ({navigation}) => {

  const {seller, setSeller} = useContext(SellerContext);
  
  useEffect(() => {
    send_get_request("users/me/seller")
      .then(data => {setSeller(data);})
      .catch(err => {console.log(err);});
  },[]);
  
  const {user,setUser} = useContext(UserContext);
  const {location} = useContext(LocationContext);
  const [expandTimes, setExpandTimes] = useState(false);
  const [isFavorite, setIsFavorite] = useState(user.favorites.filter(k => k._id === seller.kitchen._id).length > 0);
  
  const initial_item_counts = {};
  for (const item of seller.kitchen.menu) {
    initial_item_counts[item._id] = {count: 0, price: item.price};
  }
  const [itemCounts, setItemCounts] = useState(initial_item_counts);
  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState({name: "", price: 0,description: "",img: ""});

  const [isLoading, setIsLoading] = useState(true);
  const [distance, setDistance] = useState(-1);

  if (isLoading) {
    if (distance == -1) {
      send_post_request('users/customer/getDistance',{
        id: seller.kitchen._id,
        location: location
      })
      .then(data => {setDistance(data.distance); setIsLoading(false);})
      .catch(err => {console.log(err); setDistance(0); setIsLoading(false);});
    } else {
      setIsLoading(false);
    }
    return <ActivityIndicator size={50} color='black'/>;
  }

  const getCloseTimeDesc = () => {
    const date = new Date();
    const day = seller.kitchen.logistics.operationDays[date.getDay()];
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
    return 'Currently Closed';
  };

  return (
    <View style={{flex:1}}>
      <Modal isVisible={showModal} onBackdropPress={() => setShowModal(false)}>
        <View style={{marginHorizontal: 40, backgroundColor: 'white', borderRadius: 10}}>
        <View style={{justifyContent: 'center'}}>
        <View style={{
          flexDirection:'column',
          justifyContent:'space-between',
          marginHorizontal:4,
          alignItems: 'center'
        }}>
          <BlankDivider height={8}/>
          <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems: 'center',
            marginHorizontal: 30
          }}>

            <ImageWithIndicator imageStyle={{width: 80,height:80, borderRadius: 10}} imgLink={modalState.img}/>

            <View style={{
              flexDirection:'column',
              justifyContent:'space-between',
              marginHorizontal:16,
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
        <BlankDivider height={8}/>
        </View>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={{alignItems: 'center', marginVertical: 8}}
          >
            <Text style={{fontWeight: 'bold'}}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.imageWrapper}>
        <ImageWithIndicator imageStyle={{width: Dimensions.get('window').width, height: 150}} imgLink={seller.kitchen.bio.coverImg ? `${ServerBase}/images/${seller.kitchen.bio.coverImg}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'}/>
      </View>

      <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
        <View style={styles.rowView}>
          <BackButton onClick={navigation.goBack}/>
          <Text style={styles.title}>{seller.kitchen.bio.name}</Text>
        </View>
        <Icons.FontAwesome 
          name={isFavorite ? 'star' : 'star-o'}
          style={{marginRight: 16}}
          size={32}
          color={isFavorite ? 'gold' : 'black'} 
          onPress={() => {
            if (!isFavorite) {
              setIsFavorite(true);
            } else {
              setIsFavorite(false);
            }
          }} />
      </View>

      <View style={{marginHorizontal: 16}}>
        <ShadowCard>
          {seller.kitchen.rating.value !== 0 && <View style={styles.rowView}>
            <Icons.FontAwesome name="star" size={16} color="black"/>
            <Text style={styles.details}>{seller.kitchen.rating.value}</Text>
          </View>}
          <View style={styles.rowView}>
            <Icons.FontAwesome5 name="clock" size={16} color="black"/>
            {
              seller.kitchen.logistics.isOnlyFutureDelivery
               ? <Text style={styles.details}>Future Devileries Only</Text>
               : <View style={{flexDirection: 'row',alignItems:'center'}}>
                  <Text style={styles.details}>{getCloseTimeDesc()}</Text>
                  <ExpantionArrow
                    isInitaialyExpanded={expandTimes}
                    onClick={() => setExpandTimes(!expandTimes)}
                  />
                </View>
            }
          </View>
          {expandTimes ?
            seller.kitchen.logistics.operationDays.map(day => 
              <Text key={day.day} style={styles.time}>
                {`${day.day}: ${day.isActive ? `${day.startTime}-${day.endTime}` : 'Closed'}`}
              </Text>
            )
            : null
          }
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${seller.kitchen.bio.phone}`)}>
            <View style={styles.rowView}>
              <Icons.FontAwesome name="phone" size={16} color="black"/>
              <Text style={styles.details}>{seller.kitchen.bio.phone}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.rowView}>
            <Icons.Entypo name="map" size={16} color="black"/>
            <Text style={styles.details}>{seller.kitchen.bio.city}    {distance? distance.toFixed(1) : 0} km</Text>
          </View>
        </ShadowCard>
      </View>

      <View style={[styles.rowView,{justifyContent:'space-between',marginBottom:16}]}>
        <Text style={styles.smallTitle}>Menu</Text>
          <Button
            onClick={() =>{}}
            borderColor="black"
            fillColor="white"
            text="Order"
            textColor="#7CC0FA"
            height={30}
            width={100}
          />
      </View>

      {
        seller.kitchen.menu.map(dish =>
          <TouchableOpacity key={dish._id} onLongPress={() => {setModalState({...dish, img: dish.img ? `${ServerBase}/images/${dish.img}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'}); setShowModal(true)}}> 
            <OrderMenuItem
              itemName={dish.name}
              price={dish.price}
              description={dish.description}
              count={itemCounts[dish._id].count}
              setCount={diff => {setItemCounts({...itemCounts, [dish._id]: {count: Math.max(itemCounts[dish._id].count+diff,0), price: itemCounts[dish._id].price}})}}
              imgLink={dish.img ? `${ServerBase}/images/${dish.img}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'}
            />
          </TouchableOpacity>
        )
      }

    </ScrollView>
    </View>
  )
};

KitchenPreviewScreen.navigationOptions = (props) => {
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

export default KitchenPreviewScreen;