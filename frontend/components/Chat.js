import React,{useState,useEffect,useContext} from 'react';
import {View} from 'react-native';

import { GiftedChat,Bubble } from 'react-native-gifted-chat';
import {collection,setDoc,doc,onSnapshot} from 'firebase/firestore';
import { firestore } from '../api/firebase_db';

import Colors from '../globals/Colors';
import { chatContext } from '../contexts/chatContext';


const Chat = ({customer_id,kitchen_id,isCustomer,notify_on_message}) => {
  const chat_room = `room_${kitchen_id}_${customer_id}`;

  const [messages, setMessages] = useState([]);
  const {activeChat, setActiveChat} = useContext(chatContext);

  const onSend = (messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const { _id, createdAt, text, user,} = messages[0]
    const doc_ref = doc(firestore,'chats',chat_room,'messages',_id);
    setDoc(doc_ref,{ _id, createdAt,  text, user })
      .then(() => {})
      .catch(() => console.log(err));
    
    const room_ref = doc(firestore,'chats',chat_room);
    setDoc(room_ref,{
      kitchen: kitchen_id,
      customer: customer_id,
      last_message: {text: messages[0].text, createdAt:  messages[0].createdAt, isFromCustomer: isCustomer}
    },{merged: true})
      .then(() => {})
      .catch(() => console.log(err));

    notify_on_message(messages[0].text); // tell the server to send notification to the other side
  };

  useEffect(() => {
    setActiveChat(!isCustomer ? customer_id : kitchen_id); // who are we chatting with
    const unsubscribe = () => {setActiveChat(undefined)};
    return unsubscribe;
  })

  useEffect(() => {
    const messages_collection = collection(firestore,'chats',chat_room,'messages');
    const unsubscribe = onSnapshot(messages_collection,snapshot => {
      setMessages(
        snapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        })
      ).sort((m1,m2) => m1.createdAt < m2.createdAt));
    });
    return unsubscribe;
  },[]);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      showUserAvatar={false}
      onSend={messages => onSend(messages)}
      renderAvatar={() => <View/>} // dont render avatars
      renderBubble={(props) => <Bubble
        {...props}
        wrapperStyle={{right: {backgroundColor: Colors.black}}}
      />}
      user={{
        _id: isCustomer ? customer_id : kitchen_id
      }}
    />
  );
}


export default Chat;