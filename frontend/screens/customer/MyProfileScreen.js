import React,{useState,useRef,useCallback, useContext } from 'react'
import {Alert,View,StyleSheet,TextInput,Text,Image,TouchableOpacity, Linking, ScrollView} from 'react-native'
import Modal from 'react-native-modal';
import * as Icons from '@expo/vector-icons'
import { UserContext } from "../../contexts/UserContext";
import { Rating } from 'react-native-ratings';

import Colors from '../../globals/Colors';

import Backdrop from '../../components/Backdrop';
import BlankDivider from '../../components/BlankDivider';
import ShadowCard from '../../components/ShadowCard';
import ExpantionArrow from '../../components/ExpantionArrow';
import Button from '../../components/Button';
import OrderCustomer from '../../components/OrderCustomer';

const AddressCard = (address,onEdit,onDelete) => {
  return (
    <ShadowCard key={address.id}>
      <View style={{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginVertical: 8
      }}>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{address.addressName}</Text>
          <Text numberOfLines={1} style={{width: 225,fontSize: 14}}>{address.address}</Text>
        </View>
        <View style={{flexDirection:'row', alignSelf: 'center'}}>
          <TouchableOpacity
            style={{marginHorizontal: 8}}
            onPress={onEdit}
          >
            <Icons.FontAwesome5 name="edit" size={18} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginHorizontal: 8}}
            onPress={onDelete}
          >
            <Icons.FontAwesome5 name="trash" size={18} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    </ShadowCard>
  );
};

const OpenURLButton = ({ url, text, addLine }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
          <>
          <TouchableOpacity style={{paddingVertical: 8}} onPress={handlePress}>
            <Text style={{textAlign: 'center', fontSize: 14, color:'#0066CC'}}>{text}</Text>
          </TouchableOpacity>
          {addLine == true? <View style={{height:1, borderColor: Colors.lightGray, borderWidth: 0.5}}/> : null}
          </>
          )
};

const MyProfileScreen = ({navigation,signoutCB}) => {
  const {user, setUser} = useContext(UserContext);
  const [expandRecentOrders, setExpandRecentOrders] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState({id: 0,addressName: "", address: ""})

  const [showLinks, setShowLinks] = useState(false);
  const [linksState, setLinksState] = useState([])
  const [showRating, setShowRating] = useState(false);
  const [ratingState, setRatingState] = useState({id: 0,rating: 0})
  const [showNavigation, setShowNavigation] = useState(false);
  const [navigationState, setNavigationState] = useState('')
  // for addresses useState(user.addresses) ?? or go straight to user and make new set function
  // previous mock data - [{id: 1,addressName: "Home", address: "Rothschild 100, Tel Aviv"},{id: 2,addressName: "Office", address: "HaShalom 17, Tel Aviv"}]
  const [addresses, setAddresses] = useState(user.addresses);
  const [orderList, setOrderList] = useState([{
    _id: "61a0b59b0cce3e7dc7586631",
    kitchen: {
        bio: {
            coordinates: {
                longitude: 34.8163735,
                latitude: 32.0666868
            },
            name: "test kitchen",
            street: "Ben Gurion 100",
            city: "Ramat Gan",
            phone: "03123123",
            description: "best kitchen ever!",
            tags: [
                "bakery",
                "deserts"
            ],
            coverImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpd2o2M9OaVj4KTy6iqtHbJeSlvTAHhUuHaA&usqp=CAU'
        },
        logistics: {
            isOnlyFutureDelivery: false,
            operationDays: [
                {
                    day: "sunday",
                    isActive: false,
                    startTime: "",
                    endTime: "",
                    _id: "61a2398f81bb968b5c850f05"
                },
                {
                    day: "monday",
                    isActive: true,
                    startTime: "8:00",
                    endTime: "16:00",
                    _id: "61a2398f81bb968b5c850f06"
                }
            ],
            isSupportDelivery: true,
            maxDeliveryDistance: 5,
            paymentLinks: [
                "link1",
                "link2"
            ]
        },
        rating: {
            value: 4.7,
            count: 83
        },
        _id: "61a2398f81bb968b5c850f00",
        seller: "61a2398f81bb968b5c850eff",
        menu: [
            {
                name: "dish1",
                price: 30,
                img: {
                    data: {
                        type: "Buffer",
                        data: [
                            52,
                            53,
                            54,
                            52
                        ]
                    },
                    _id: "61a2398f81bb968b5c850f02"
                },
                description: "good dish 1",
                _id: "61a2398f81bb968b5c850f01"
            },
            {
                name: "dish2",
                price: 30,
                img: {
                    data: {
                        type: "Buffer",
                        data: [
                            52,
                            53,
                            54,
                            52
                        ]
                    },
                    _id: "61a2398f81bb968b5c850f04"
                },
                description: "good dish 2",
                _id: "61a2398f81bb968b5c850f03"
            }
        ],
        __v: 0
    },
    customer: "619e91c9566e39756ef6290b",
    price: 30,
    comments: "make it good",
    isPickup: false,
    deliveryAddress: "hashalom 1",
    status: 'Waiting Payment',
    rated: false,
    items: [
        {
            name: "dish 1",
            quantity: 1,
            _id: "61a0b59b0cce3e7dc7586632"
        },
        {
            name: "dish 2",
            quantity: 3,
            _id: "61a0b59b0cce3e7dc7586633"
        }
    ],
    dueDate: "ASAP",
    __v: 0,
    date: "ASAP"
}])

  let scroll_position = 0;
  const ScrollViewRef = useRef();

  const modalOnSubmit = () => {
    if (addresses.filter(a => a.id == modalState.id).length >= 1) {
      setAddresses([...addresses.filter(a => a.id != modalState.id), modalState]);
    } else {
      modalState.id = addresses.length + 1;
      setAddresses([...addresses, modalState]);
    }
    setModalState({id: 0,addressName: "", address: ""});
    setShowModal(false)
  }

  const sendRating = () => {
    console.log(ratingState);
    for (let i=0; i< orderList.length; i++){
      if(orderList[i]._id == ratingState.id){
        let orderCopy = [...orderList];
        orderCopy[i].rated=true;
        setOrderList(orderCopy)
        break
      }
    }
    // post rating state to DB 
  }
  
  return (
    <View style={{flex:1}}>
      <Backdrop text='My Profile' height={80}/>
      
      <Modal isVisible={showModal} onBackdropPress={() => setShowModal(false)}>
        <View style={{marginHorizontal: 32, backgroundColor: 'white', borderRadius: 10}}>
          <TextInput
            style={{
              height: 45,
              width: 200,
              paddingVertical: 5,
              paddingHorizontal: 10,
              fontSize: 16,
              margin: 4
            }}
            onChangeText={txt => {
              setModalState({...modalState, addressName: txt});
            }}
            value={modalState.addressName}
            placeholder={"Address Name"}
          />
          <TextInput
            style={{
              height: 45,
              width: 200,
              paddingVertical: 5,
              paddingHorizontal: 10,
              fontSize: 16,
              margin: 4
            }}
            onChangeText={txt => {
              setModalState({...modalState, address: txt});
            }}
            value={modalState.address}
            placeholder={"Address"}
          />
          <TouchableOpacity
            onPress={() => {
              if (modalState.address !== "" && modalState.addressName !== "") {
                modalOnSubmit();
              }
            }}
            style={{alignItems: 'center', marginVertical: 8}}
          >
            <Text>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={{alignItems: 'center', marginVertical: 8}}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={showLinks} onBackdropPress={() => setShowLinks(false)}>
        <View style={{marginHorizontal: 32, backgroundColor: 'white', borderRadius: 10}}>
          {linksState.map((item, index) => {
              return (
                <OpenURLButton key={index} url={item} text={'payment link '+(index+1)} addLine={index!=(linksState.length - 1)}/>
              )
          })}
        </View>
      </Modal>

      <Modal isVisible={showRating} onBackdropPress={() => setShowRating(false)}>
        <View style={{marginHorizontal: 32, backgroundColor: 'white', borderRadius: 10, paddingTop: 10}}>
          <Rating startingValue={3} onFinishRating={(rating) => {setRatingState({...ratingState ,rating: rating});}}/>
          <View style={{height:1, borderColor: Colors.lightGray, borderWidth: 0.5, marginVertical: 8}}/>
          <TouchableOpacity
              onPress={() => {sendRating();setShowRating(false)}}
              style={{alignItems: 'center', marginBottom: 8}}
          >
            <Text>Send Rating</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={showNavigation} onBackdropPress={() => setShowNavigation(false)}>
        <View style={{marginHorizontal: 32, backgroundColor: 'white', borderRadius: 10}}>
          <Text style={{alignSelf: 'center', marginVertical: 8}}>{navigationState}</Text>
          <OpenURLButton url={'https://waze.com/ul?q='+navigationState} text={'Navigate'} addLine={false}/>
          <View style={{height:1, borderColor: Colors.lightGray, borderWidth: 0.5}}/>
          <TouchableOpacity
              onPress={() => setShowNavigation(false)}
              style={{alignItems: 'center', marginVertical: 8}}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <ScrollView
        ref={ScrollViewRef}
        onScroll={event => scroll_position = event.nativeEvent.contentOffset.y}
        showsVerticalScrollIndicator={false}  
      >
      <View style={styles.contentContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={styles.title}>Hello, {user.name}</Text>
          <Image style={styles.profileImage} source={{uri: user.imgUrl}}/>
        </View>
        
        <BlankDivider height={32}/>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
          <Text style={styles.subtitle}>My Addresses</Text>
          <TouchableOpacity disabled={addresses.length > 2} onPress={() => setShowModal(true)}>
            <Icons.Feather name='plus' size={30} color={addresses.length <= 2 ? 'black' : 'gray'}/>
          </TouchableOpacity>
          
        </View>
        
        {addresses.map(address => AddressCard(
          address,
          () => {setModalState(address); setShowModal(true)},
          () => setAddresses(addresses.filter(a => a.id != address.id))
        ))}
        {
          addresses.length == 0 ? <Text style={{alignSelf: 'center', color: Colors.lightGray}}>Click the '+' to add an address</Text> : null
        }

        <BlankDivider height={32}/>

        <Text style={styles.subtitle}>Active Orders</Text>
        
        {
          orderList.filter(t => t.status !== 'Done').map((item, index) => {
            return (
              <OrderCustomer key={index} order={item} setRatingState={setRatingState} setShowRating={setShowRating} setLinksState={setLinksState} setShowLinks={setShowLinks} setNavigationState={setNavigationState} setShowNavigation={setShowNavigation}/>
          )})
        }
        
        <BlankDivider height={32}/>

        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={styles.subtitle}>Recent Orders</Text>
          <ExpantionArrow
            onClick={() => {
              if (!expandRecentOrders){
                // 88 for each order we want to scroll + 16 of extra padding
                ScrollViewRef.current?.scrollTo({y: scroll_position + 2*88 + 16,animated: true,});
              }
              setExpandRecentOrders(!expandRecentOrders);
            }}
            isInitaialyExpanded={true}
          />
        </View>
        
        {
          orderList.filter(t => ((t.status == 'Done') && expandRecentOrders)).map((item, index) => {
            return (
              <OrderCustomer key={index} order={item} setRatingState={setRatingState} setShowRating={setShowRating} setLinksState={setLinksState} setShowLinks={setShowLinks} setNavigationState={setNavigationState} setShowNavigation={setShowNavigation}/>
          )})
        }

        <BlankDivider height={16}/>

        <Button
          onClick={() => {setUser({}); signoutCB();}}
          text="Sign Out"
          fillColor="white"
          textColor="black"
          height={40}
          width={150}
        />
        <BlankDivider height={16}/>
      </View>
      </ScrollView>
    </View>
  )
};

MyProfileScreen.navigationOptions = (props) => {
  return {};  
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  contentContainer: {
    marginHorizontal: 16
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 50/2
  }
});

export default MyProfileScreen;