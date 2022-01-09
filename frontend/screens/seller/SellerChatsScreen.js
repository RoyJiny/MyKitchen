import React,{useEffect,useContext,useState} from 'react';
import {View,StyleSheet,Text,ScrollView} from 'react-native';
import Colors from '../../globals/Colors';

import {collection,onSnapshot,where,query} from 'firebase/firestore';
import { firestore } from '../../api/firebase_db';

import { SellerContext } from '../../contexts/SellerContext';
import { send_post_request } from '../../utils/requests';

import { ChatPreview, Backdrop } from '../../components';
import { ActivityIndicator } from 'react-native-paper';

const SellerChatsScreen = ({navigation}) => {
  const {seller,setSeller} = useContext(SellerContext);
  const [chats,setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const rooms_collection = collection(firestore,'chats');
    const q = query(rooms_collection, where("kitchen","==",seller.kitchen._id));
    const unsbscribe = onSnapshot(q,snapshot => {
      const users = snapshot.docs.map((doc) => {return {user_id: doc.data().customer, last_message: {...doc.data().last_message, createdAt: doc.data().last_message.createdAt.toDate()}}});
      setIsLoading(true);
      send_post_request("seller/populate_usernames", {users})
        .then(res => {setChats(res.users.sort((a, b) => (b.last_message.createdAt === undefined || a.last_message.createdAt === undefined) ? 0 : Date.parse(b.last_message.createdAt) - Date.parse(a.last_message.createdAt))); setIsLoading(false);setHasLoaded(true);})
        .catch(err => {console.log(err); setIsLoading(false);setHasLoaded(true);});
    });
    return unsbscribe;
  },[]);

  return (
    <View style={{flex: 1}}>
      <Backdrop text='Messages' height={80} />
      
      {isLoading
        ? <ActivityIndicator size={40} color='black'/>
        : <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.container}>
            {
              chats.map(chat => <ChatPreview
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
              />)
            }
            {chats.length == 0 && hasLoaded?
              <Text style={{marginTop: 16,alignSelf: 'center', color: Colors.lightGray}}>You don't have any active chats at the moment</Text>
              : null
            }
          </View>
        </ScrollView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24
  },
});

export default SellerChatsScreen;