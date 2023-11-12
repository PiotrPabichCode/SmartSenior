import { Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { changeActiveChat } from '@src/redux/chats/chats.slice';
import { useAppDispatch } from '@src/redux/types';
import { ChatUser as User } from '@src/models';

const ChatUser = ({ user, active }: { user: User; active: boolean }) => {
  const dispatch = useAppDispatch();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: active ? 'lightblue' : '',
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        borderColor: 'blue',
        borderWidth: 1,
      }}
      onPress={() => dispatch(changeActiveChat(user.uid))}>
      <Text style={{ fontSize: 22, fontWeight: '500' }}>{user.username}</Text>
    </TouchableOpacity>
  );
};

export default ChatUser;
