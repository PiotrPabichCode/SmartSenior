import { selectConnectedUserById } from '@src/redux/auth/auth.slice';
import { useAppSelector } from '@src/redux/types';
import { ScrollView, StyleSheet, View } from 'react-native';
import SeniorActions from './SeniorActions';
import { goBack } from '@src/navigation/navigationUtils';
import { ConnectedUser } from '@src/models';
import UserDetails from './UserDetails';
import useThemeColors from '@src/config/useThemeColors';

const SeniorDashboard = ({ route }: any) => {
  const { uid } = route.params;
  const user = useAppSelector(state => selectConnectedUserById(state, uid));
  const backgroundColor = useThemeColors().mainBackground;

  if (!user) {
    goBack();
    return null;
  }

  const connectedUser: ConnectedUser = {
    user: user.user,
    eventGroups: user.eventGroups,
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor }]}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}>
      <UserDetails user={user} />
      <SeniorActions user={connectedUser} />
    </ScrollView>
  );
};

export default SeniorDashboard;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    gap: 10,
    paddingBottom: 10,
  },
});
