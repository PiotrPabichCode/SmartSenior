import { selectConnectedUsers } from '@src/redux/auth/auth.slice';
import { useAppSelector } from '@src/redux/types';
import { View, StyleSheet } from 'react-native';
import ConnectedUsersMapper from './ConnectedUsersMapper';
import ConnectedUserInput from './ConnectedUserInput';

const KeeperView = () => {
  const connectedUsers = useAppSelector(state => selectConnectedUsers(state));

  return (
    <View style={styles.container}>
      <ConnectedUserInput />
      <ConnectedUsersMapper connectedUsers={connectedUsers} />
    </View>
  );
};

export default KeeperView;

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});
