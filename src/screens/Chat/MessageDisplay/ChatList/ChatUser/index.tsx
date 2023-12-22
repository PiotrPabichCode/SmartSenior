import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { changeActiveChat } from '@src/redux/chats/chats.slice';
import { useAppDispatch } from '@src/redux/types';
import { ChatUser as User } from '@src/models';
import { Text } from '@rneui/themed';
import useThemeColors from '@src/config/useThemeColors';

const ChatUser = ({ user, active, single }: { user: User; active: boolean; single?: boolean }) => {
  const dispatch = useAppDispatch();
  const backgroundColor = useThemeColors().grey4;

  if (single) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{user.username}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={{ ...styles.container, backgroundColor: active ? backgroundColor : undefined }}
      onPress={() => dispatch(changeActiveChat(user.uid))}>
      <Text style={styles.label}>{user.username}</Text>
    </TouchableOpacity>
  );
};

export default ChatUser;

const styles = StyleSheet.create({
  label: { fontSize: 22, fontWeight: '500' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 1,
  },
});
