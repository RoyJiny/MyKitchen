import React,{useState,useContext} from 'react'
import {View,StyleSheet,Text,Image,Dimensions,TouchableOpacity,Linking,ScrollView,ActivityIndicator} from 'react-native'
import * as Icons from '@expo/vector-icons'

import Colors from '../../globals/Colors';
import { ServerBase } from '../../globals/globals';
import { generalContext } from '../../contexts/generalContext';
import { send_post_request, send_get_request } from '../../utils/requests';
import { SellerContext } from "../../contexts/SellerContext";

import Modal from 'react-native-modal';
import {BackButton,ShadowCard,ExpantionArrow,OrderMenuItem,BlankDivider,ImageWithIndicator} from '../../components';

const KitchenPreviewScreen = ({navigation}) => {

  const {seller, setSeller} = useContext(SellerContext);

  const {generalData:{location}} = useContext(generalContext);
  const [expandTimes, setExpandTimes] = useState(false);
  
  const [itemCounts, setItemCounts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState({name: "", price: 0,description: "",img: ""});

  const [isLoading, setIsLoading] = useState(true);
  const [distance, setDistance] = useState(-1);

  if (isLoading) {
    send_get_request("users/me/seller")
      .then(data => {
        setSeller(data);
        const initial_item_counts = {};
        for (const item of data.kitchen.menu) {
          initial_item_counts[item._id] = {count: 0, price: item.price};
        }
        setItemCounts(initial_item_counts);
  
        if (distance == -1 && location != undefined) {
          send_post_request('users/customer/getDistance',{
            id: seller.kitchen._id,
            location: location
          })
            .then(data => {setDistance(data.distance); setIsLoading(false);})
            .catch(err => {console.log(err); setDistance(0); setIsLoading(false);});
        } else {
          setIsLoading(false);
        }
      })
      .catch(err => {console.log(err);});
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
      </View>

      <View style={{marginHorizontal: 16}}>
        <ShadowCard>
          {seller.kitchen.rating.value !== 0 && <View style={styles.rowView}>
            <Icons.FontAwesome name="star" size={16} color="black"/>
            <Text style={styles.details}>{seller.kitchen.rating.value.toFixed(1)}</Text>
          </View>}
          <View style={styles.rowView}>
            <Icons.FontAwesome5 name="clock" size={16} color="black"/>
            {
              seller.kitchen.isTemporarilyClose
              ? <Text style={styles.details}>Temporarily Close</Text>
              : seller.kitchen.logistics.isOnlyFutureDelivery
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
          { location != undefined ?
            <View style={styles.rowView}>
              <Icons.Entypo name="map" size={16} color="black"/>
              <Text style={styles.details}>{seller.kitchen.bio.city}    {distance? distance > 99 ? '+99' : distance.toFixed(1) : 0} km</Text>
            </View> : null
          }
        </ShadowCard>
      </View>

      <Text style={styles.smallTitle}>Menu</Text>

      {
        seller.kitchen.menu.map(dish =>
          <OrderMenuItem
            key={dish._id}
            itemName={dish.name}
            price={dish.price}
            description={dish.description}
            allergies={dish.allergies}
            count={itemCounts[dish._id].count}
            setCount={diff => {setItemCounts({...itemCounts, [dish._id]: {count: Math.max(itemCounts[dish._id].count+diff,0), price: itemCounts[dish._id].price}})}}
            imgLink={dish.img ? `${ServerBase}/images/${dish.img}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'}
          />
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
    marginLeft: 20,
    marginBottom: 16
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