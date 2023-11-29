import { View, ScrollView } from 'react-native';
import ChatUser from './ChatUser';
import { useAppSelector } from '@src/redux/types';
import { selectChats } from '@src/redux/chats/chats.slice';
import { selectUserID } from '@src/redux/auth/auth.slice';
import { useStyles } from './styles';

const ChatList = () => {
  const chats = useAppSelector(state => selectChats(state));
  const userID = useAppSelector(state => selectUserID(state));
  const styles = useStyles();

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
