import React,{useState,useRef,useCallback, useContext, useEffect } from 'react'
import {Alert,View,StyleSheet,TextInput,Text,Image,TouchableOpacity, Linking,Dimensions,ScrollView,Button as RNButton} from 'react-native'
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import * as Icons from '@expo/vector-icons'

import { UserContext } from "../../contexts/UserContext";
import Colors from '../../globals/Colors';

import {OrderSlider,Backdrop,BlankDivider,ShadowCard,ExpantionArrow,Button,OrderCustomer} from '../../components';

import { send_post_request, send_get_request } from '../../utils/requests';

const AddressCard = (key,address,onEdit,onDelete) => {
  return (
    <ShadowCard key={key}>
      <View style={{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginVertical: 8
      }}>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{address.name}</Text>
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

const MyProfileScreen = ({signoutCB}) => {
  const {user, setUser} = useContext(UserContext);
  const [expandRecentOrders, setExpandRecentOrders] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState({id: 0,name: "", address: ""})

  const [showPhone, setShowPhone] = useState(false);
  const [phoneState, setPhoneState] = useState(user.phone);
  const [waitingCode, setWaitingCode] = useState(false);
  const [codeState, setCodeState] = useState('');
  const [wrongCode, setWrongCode] = useState(false);
  const [wrongPhone, setWrongPhone] = useState(false);

  const [showLinks, setShowLinks] = useState(false);
  const [linksState, setLinksState] = useState([]);
  const [addresses, setAddresses] = useState([...user.addresses]);
  const [orderList, setOrderList] = useState([])
  const [fetchOrdersDone, setFetchOrdersDone] = useState(false)
  const [sliderState, setSliderState] = useState({show:false, data: {}});

  useEffect(() => {
    send_get_request("orders/customer/get_orders")
      .then(data => {setOrderList(data);setFetchOrdersDone(true);})
      .catch(err => {console.log(err);});
  },[]);

  let scroll_position = 0;
  const ScrollViewRef = useRef();

  const modalOnSubmit = () => {
    if (addresses.filter(a => a.id == modalState.id).length >= 1) {
      setAddresses([...addresses.filter(a => a.id != modalState.id), modalState]);
    } else {
      modalState.id = addresses.length + 1;
      setAddresses([...addresses, modalState]);
    }
    send_post_request("users/customer/addresses/add",{address: {name: modalState.name, address: modalState.address}})
      .then(() => {setModalState({id: 0,name: "", address: ""});setShowModal(false);})
      .catch(err => {console.log(err);});
  }

  const sendPhone = async (phone) => {
    try{
      const answer = await send_get_request('verify/request_verification/?phone='+phone);
      if (answer == undefined) throw new Error("Failed to send data");
      setCodeState('');
      setWrongPhone(false);
      setWaitingCode(true);
    } catch(err){
      console.log(err);
      setWrongPhone(true);
    }
  }

  const sendCode = async (code,phone) => {
    try{
      const answer = await send_post_request("verify/submit_code/",{code: code, phone: phone});
      if (answer == undefined) throw new Error("Failed to send data");
      setWaitingCode(false);
      setWrongCode(false);
      setWrongPhone(false);
      setShowPhone(false);
      setUser({...user, phone: phoneState});
    } catch(err){
      console.log(err);
      setWrongCode(true);
    }
  }

  return (
    <View style={{flex:1}}>
      <Backdrop text='My Profile' height={80}/>
      
      <Modal isVisible={showModal} onBackdropPress={() => {setModalState({id: 0,name: "", address: ""});setShowModal(false);}}>
        <View style={{marginHorizontal: 24, backgroundColor: 'white', borderRadius: 10}}>
          <TextInput
            style={{
              height: 45,
              paddingVertical: 5,
              paddingHorizontal: 10,
              fontSize: 16,
              margin: 4
            }}
            onChangeText={txt => {
              setModalState({...modalState, name: txt});
            }}
            value={modalState.name}
            placeholder={"Address Name (e.g. Home)"}
          />
          <TextInput
            style={{
              height: 45,
              paddingVertical: 5,
              paddingHorizontal: 10,
              fontSize: 16,
              margin: 4
            }}
            onChangeText={txt => {
              setModalState({...modalState, address: txt});
            }}
            value={modalState.address}
            placeholder={"Address (e.g. 1 Hashalim, Tel Aviv)"}
          />
          <TouchableOpacity
            onPress={() => {
              if (modalState.address !== "" && modalState.name !== "") {
                modalOnSubmit();
              }
            }}
            style={{alignItems: 'center', paddingVertical: 12}}
          >
            <Text>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={{alignItems: 'center', paddingVertical: 12}}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={showPhone} onBackdropPress={() => setShowPhone(false)}>
        <View style={{marginHorizontal: 32, backgroundColor: 'white', borderRadius: 10}}>
          <>
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
              setPhoneState(txt);
            }}
            value={phoneState}
            placeholder={"Enter Phone Number"}
            keyboardType="numeric"
            autoFocus={true}
            onSubmitEditing={() => sendPhone(phoneState)}
          />
          { wrongPhone==false ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.validation}>Invalid phone number</Text>
            </Animatable.View>
          }
          </>
          {waitingCode? 
          <>
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
              setCodeState(txt);
            }}
            value={codeState}
            placeholder={"Enter Verification Code"}
            keyboardType="numeric"
            autoFocus={true}
            onSubmitEditing={() => sendCode(codeState,phoneState)}
          />
          { wrongCode==false ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.validation}>Wrong code, try again</Text>
            </Animatable.View>
          }
          </>
          :null}
          <TouchableOpacity
            onPress={() => sendPhone(phoneState)}
            style={{alignItems: 'center', marginVertical: 12}}
          >
            <Text style={{color: Colors.blueLink, fontWeight: 'bold'}}>{waitingCode? 'Resend Code' : 'Send Code'}</Text>
          </TouchableOpacity>
          {waitingCode? 
          <TouchableOpacity
            onPress={() => sendCode(codeState,phoneState)}
            style={{alignItems: 'center', marginVertical: 12}}
          >
            <Text style={{color: Colors.blueLink, fontWeight: 'bold'}}>Submit Code</Text>
          </TouchableOpacity>
          : null}
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

      <ScrollView
        ref={ScrollViewRef}
        onScroll={event => scroll_position = event.nativeEvent.contentOffset.y}
        showsVerticalScrollIndicator={false}  
      >
      <View style={styles.contentContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={styles.title}>Hello, {user.name !== "" ? user.name : "User"}</Text>
          <Image style={styles.profileImage} source={{uri: user.imgUrl || "https://w7.pngwing.com/pngs/527/663/png-transparent-logo-person-user-person-icon-rectangle-photography-computer-wallpaper.png"}}/>
        </View>
        
        <BlankDivider height={16}/>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 16}}>
          {
            user.phone === ''
            ? <Text style={{fontSize: 18}}>Add Phone Number</Text>
            : <Text style={{fontSize: 18}}>Phone Number:  {user.phone}</Text>
          }
          <TouchableOpacity style={{marginLeft: 8}} onPress={() => {setWaitingCode(false);setPhoneState(user.phone);setShowPhone(true);}}>
            <Icons.Feather name={user.phone == ''? 'plus':'edit'} size={20} color={addresses.length <= 2 ? 'black' : 'gray'}/>
          </TouchableOpacity>
        </View>
        <BlankDivider height={16}/>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
          <Text style={styles.subtitle}>My Addresses</Text>
          <TouchableOpacity disabled={addresses.length > 2} onPress={() => setShowModal(true)}>
            <Icons.Feather name='plus' size={20} color={addresses.length <= 2 ? 'black' : 'gray'}/>
          </TouchableOpacity>
          
        </View>
        
        {addresses.map((address, index) => AddressCard(
          index,
          address,
          () => {setModalState(address); setShowModal(true)},
          () => send_post_request("users/customer/addresses/remove",{address_name: address.name})
            .then(() => {setAddresses(addresses.filter(a => a.id != address.id))})
            .catch(() => {console.log(err);})
        ))}
        {
          addresses.length == 0 ? <Text style={{alignSelf: 'center', color: Colors.lightGray}}>Click the '+' to add an address</Text> : null
        }

        <BlankDivider height={32}/>

        <Text style={styles.subtitle}>Active Orders</Text>
        
        {
          orderList.slice().reverse().filter(t => t.status !== 'Done').length == 0 ? 
            fetchOrdersDone? <Text style={{marginTop: 16,alignSelf: 'center', color: Colors.lightGray}}>You don't have any active orders at the moment</Text> 
            :
            <Text style={{marginTop: 16,alignSelf: 'center', color: Colors.lightGray}}>Loading your orders...</Text> 
          :
            orderList.slice().reverse().filter(t => t.status !== 'Done').map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => {setSliderState({show:false,data:{}}); setSliderState({show:true, data:item})}}>
                  <OrderCustomer order={item}/>
                </TouchableOpacity>
            )})
        }
        
        <BlankDivider height={32}/>

        { orderList.slice().reverse().filter(t => t.status == 'Done').length > 0 ?
          (<><View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={styles.subtitle}>Order History</Text>
            <ExpantionArrow
              onClick={() => {
                if (!expandRecentOrders){
                  // 88 for each order we want to scroll + 16 of extra padding
                  ScrollViewRef.current?.scrollTo({y: scroll_position + 2*88 + 16,animated: true,});
                }
                setExpandRecentOrders(!expandRecentOrders);
              }}
              isInitaialyExpanded={false}
            />
          </View>
          
          <View>
            {
              orderList.slice().reverse().filter(t => ((t.status == 'Done') && expandRecentOrders)).map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => {setSliderState({show:false,data:{}});setSliderState({show:true, data:item})}}>
                    <OrderCustomer order={item}/>
                  </TouchableOpacity>  
              )})
            }
          </View></>) : null
        }

        <BlankDivider height={24}/>

        <Button
          onClick={signoutCB}
          text="Sign Out"
          fillColor="white"
          textColor="black"
          height={40}
          width={150}
        />
        <BlankDivider height={16}/>
      </View>
      </ScrollView>

      {sliderState.show && <OrderSlider order={sliderState.data} close={() => setSliderState({show:false,data:{}})}/>}
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
    fontSize: 18,
    marginBottom: 4
  },
  contentContainer: {
    marginHorizontal: 16
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 50/2
  },
  validation: {
    color: "red",
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 2,
  },
});

export default MyProfileScreen;