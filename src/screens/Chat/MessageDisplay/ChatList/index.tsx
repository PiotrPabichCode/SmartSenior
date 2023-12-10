import { View, ScrollView, StyleSheet } from 'react-native';
import ChatUser from './ChatUser';
import { useAppSelector } from '@src/redux/types';
import { selectChats } from '@src/redux/chats/chats.slice';
import { selectUserID } from '@src/redux/auth/auth.slice';

const ChatList = () => {
  const chats = useAppSelector(state => selectChats(state));
  const userID = useAppSelector(state => selectUserID(state));

  const renderUsers = () => {
    if (chats.length === 1) {
      const user = chats[0].users.find(user => user.uid !== userID);
      return <ChatUser user={user!} active={true} single={true} />;
    }
    return chats.map((chat, index) => {
      const user = chat.users.find(user => user.uid !== userID);
      return <ChatUser key={index} user={user!} active={chat.active} />;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.innerContainer}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {renderUsers()}
      </ScrollView>
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.8,
    paddingVertical: 10,
  },
  innerContainer: {
    minWidth: '100%',
    height: 60,
    gap: 10,
    padding: 5,
  },
});
