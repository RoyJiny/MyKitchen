import React,{useState,useRef,useCallback, useContext } from 'react'
import {Alert,View,StyleSheet,TextInput,Text,Image,TouchableOpacity, Linking, ScrollView} from 'react-native'
import Modal from 'react-native-modal';
import * as Icons from '@expo/vector-icons'
import { UserContext } from "../../contexts/UserContext";

import Colors from '../../globals/Colors';

import Backdrop from '../../components/Backdrop';
import BlankDivider from '../../components/BlankDivider';
import ShadowCard from '../../components/ShadowCard';
import ExpantionArrow from '../../components/ExpantionArrow';
import Button from '../../components/Button';

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

const Order = (kitchen,contents,status,price,date,img,payLinks) => {
  const [showModal, setShowModal] = status == 'Waiting payment' ? useState(false) : [false, (value) => {}]
  return (
    <View>
    {status == 'Waiting payment'?   
    <Modal isVisible={showModal} onBackdropPress={() => setShowModal(false)}>
      <View style={{marginHorizontal: 32, backgroundColor: 'white', borderRadius: 10}}>
        {payLinks.map((item, index) => {
            return (
              <OpenURLButton key={index} url={item} text={'payment link '+(index+1)} addLine={index!=(payLinks.length - 1)}/>
            )
        })}
      </View>
    </Modal>
    : null}

    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8}}>
      <View style={{flexDirection: 'row'}}>
        <Image style={{ height: 80, width: 80, borderRadius: 10, marginRight: 16}} source={{uri: img}}/>
        
        <View>
          <Text style={{fontSize: 18}}>{kitchen}</Text>
          {contents.length > 0 ? <Text numberOfLines={1} style={{width: 150, fontSize: 14, color: Colors.lightGray}}>{contents[0]}</Text> : null}
          {contents.length > 1 ? <Text numberOfLines={1} style={{width: 150, fontSize: 14, color: Colors.lightGray}}>{contents[1]}</Text> : null}
          {contents.length > 2 ? <Text numberOfLines={1} style={{width: 150, fontSize: 14, color: Colors.lightGray}}>...</Text> : null}
        </View>
      </View>

      <View style={{alignSelf: 'center'}}>
        {status !== null ? <Text style={{textAlign: 'center', fontSize: 14}}>{status}</Text> : null}
        <Text style={{textAlign: 'center', fontSize: 14}}>${price}</Text>
        <Text style={{textAlign: 'center', fontSize: 14, color: Colors.lightGray}}>{date}</Text>
        {status == 'Waiting payment'? 
        <TouchableOpacity onPress={() => setShowModal(true)} >
          <Text style={{textAlign: 'center', fontSize: 14, color:'#0066CC', fontWeight:'bold'}}>payment links</Text>
        </TouchableOpacity> : null}
      </View>
    </View>

    <View style={{height:1, borderColor: Colors.lightGray, borderWidth: 0.5}}/>
    </View>
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
  
  const [addresses, setAddresses] = useState([{id: 1,addressName: "Home", address: "Rothschild 100, Tel Aviv"},{id: 2,addressName: "Office", address: "HaShalom 17, Tel Aviv"}]);

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
        {Order('The Desert',['Chocolate Cupcake','Birthday Cake'],'Waiting payment',45,'30/11/2021',"http://cdn.sallysbakingaddiction.com/wp-content/uploads/2017/06/moist-chocolate-cupcakes-5.jpg",["https://google.com","https://google.com"])}
        {Order('My Pastry',['Special Cupcake'],'Pending',60,'27/10/2021',"https://www.lifeloveandsugar.com/wp-content/uploads/2018/03/Berries-And-Cream-Mini-Puff-Pastry-Cakes1.jpg",[])}

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
        {expandRecentOrders
          ? <View>
            {Order('Home Cookie',['White cupcake'],null,30,'10/4/2021',"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-202012-lofthousecookies-130-ls-1608834762.jpg")}
          </View>
          : null
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