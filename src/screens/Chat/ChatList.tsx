import { View, ScrollView } from 'react-native';
import ChatUser from './ChatUser';
import { useAppSelector } from '@src/redux/types';
import { selectChats } from '@src/redux/chats/chats.slice';

const ChatList = () => {
  const chats = useAppSelector(state => selectChats(state));
  const userID = useAppSelector(state => state.auth.user?.uid)!;

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
        {chats.map((chat, index) => {
          const user = chat.users.find(user => user.uid !== userID);
          return <ChatUser key={index} user={user!} active={chat.active} />;
        })}
      </ScrollView>
    </View>
  );
};

export default ChatList;
