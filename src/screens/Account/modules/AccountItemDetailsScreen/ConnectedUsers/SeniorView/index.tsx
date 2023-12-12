import { goBack } from '@src/navigation/navigationUtils';
import { selectConnectedUsers } from '@src/redux/auth/auth.slice';
import { useAppSelector } from '@src/redux/types';
import { View, StyleSheet } from 'react-native';
import ActionButtons from './ActionButtons';
import KeeperDetails from './KeeperDetails';

const SeniorView = () => {
  const connectedUsers = useAppSelector(state => selectConnectedUsers(state));
  if (connectedUsers.length === 0) {
    goBack();
    return null;
  }
  const keeper = connectedUsers[0].user;
  return (
    <View style={styles.container}>
      <KeeperDetails keeper={keeper} />
      <ActionButtons keeper={keeper} />
    </View>
  );
};

export default SeniorView;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
