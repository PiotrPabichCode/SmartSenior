import { View, ScrollView } from 'react-native';
import React from 'react';
import ChatUser from './ChatUser';
import { useAppSelector } from '@src/redux/store';

const ChatList = () => {
  const chats = useAppSelector(state => state.chats);

  return (
    <View style={{ borderBottomColor: 'black', borderBottomWidth: 0.8, paddingVertical: 10 }}>
      <ScrollView
        contentContainerStyle={{
          minWidth: '100%',
          height: 60,
          gap: 10,
          padding: 5,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {chats.chats.map((user, index) => (
          <ChatUser
            key={index}
            userID={user.userID}
            username={user.username}
            active={user.active}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ChatList;
