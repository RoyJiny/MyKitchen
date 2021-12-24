import React,{useEffect,useContext,useState} from 'react';
import {View,StyleSheet} from 'react-native';

import {collection,onSnapshot,where,query} from 'firebase/firestore';
import { firestore } from '../../api/firebase_db';

import { SellerContext } from '../../contexts/SellerContext';
import { send_post_request } from '../../utils/requests';

import { ChatPreview, Backdrop } from '../../components';

const SellerChatsScreen = ({navigation}) => {
  const {seller,setSeller} = useContext(SellerContext);
  const [chats,setChats] = useState([]);

  useEffect(() => {
    const rooms_collection = collection(firestore,'chats');
    const q = query(rooms_collection, where("kitchen","==",seller.kitchen._id));
    const unsbscribe = onSnapshot(q,snapshot => {
      const users = snapshot.docs.map((doc) => {return {user_id: doc.data().customer, last_message:doc.data().last_message}});
      send_post_request("seller/populate_usernames", {users})
        .then(res => setChats(res.users))
        .catch(err => console.log(err));
    });
    return unsbscribe;
  },[]);

  return (
    <View>
      <Backdrop text='Messages' height={80} />
      <View style={styles.container}>
        {chats.map(chat => <ChatPreview
          key={chat.user_id}
          username={chat.username}
          last_message={chat.last_message}
          navigateToChat={() => navigation.navigate("Chat",{
            customer_id: chat.user_id,
            customer_name:chat.username,
            kitchen_id: seller.kitchen._id,
            kitchen_name: seller.kitchen.bio.name, 
            isCustomer: false})
          }
        />)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24
  },
});

export default SellerChatsScreen;