import { Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useAppDispatch } from '@src/redux/store';
import { changeActiveChat } from '@src/redux/chats/chats.slice';

const ChatUser = ({
  userID,
  username,
  active,
}: {
  userID: string;
  username: string;
  active: boolean;
}) => {
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
      onPress={() => dispatch(changeActiveChat(userID))}>
      <Text style={{ fontSize: 22, fontWeight: '500' }}>{username}</Text>
    </TouchableOpacity>
  );
};

export default ChatUser;
