import React,{useState,useLayoutEffect,useEffect,useCallback} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

import {db} from './api/firebase_db';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const { _id, createdAt, text, user,} = messages[0]
    db.collection('chats').add({ _id, createdAt,  text, user })
  }, []);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => setMessages(
        snapshot.docs.map(doc => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user
        })
    )));
    return unsubscribe;
  });

  return (
    <View>
      <Text>This is the chat screen</Text>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={false}
        onSend={messages => onSend(messages)}
        user={{
          id: 1,
          name: 'Roy'
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default ChatScreen;