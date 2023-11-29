import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { changeActiveChat } from '@src/redux/chats/chats.slice';
import { useAppDispatch } from '@src/redux/types';
import { ChatUser as User } from '@src/models';
import { useStyles } from './styles';

const ChatUser = ({ user, active, single }: { user: User; active: boolean; single?: boolean }) => {
  const dispatch = useAppDispatch();
  const styles = useStyles();

  if (single) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{user.username}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={{ ...styles.container, backgroundColor: active ? 'lightblue' : undefined }}
      onPress={() => dispatch(changeActiveChat(user.uid))}>
      <Text style={styles.label}>{user.username}</Text>
    </TouchableOpacity>
  );
};

export default ChatUser;
