import { selectConnectedUserById, selectTheme } from '@src/redux/auth/auth.slice';
import { useAppSelector } from '@src/redux/types';
import { ScrollView, StyleSheet, View } from 'react-native';
import SeniorActions from './SeniorActions';
import { goBack } from '@src/navigation/navigationUtils';
import { ConnectedUser, Theme } from '@src/models';
import Colors from '@src/constants/Colors';
import UserDetails from './UserDetails';

const SeniorDashboard = ({ route }: any) => {
  const { uid } = route.params;
  const user = useAppSelector(state => selectConnectedUserById(state, uid));
  const theme = useAppSelector(state => selectTheme(state));
  const styles = useStyles(theme);

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
      contentContainerStyle={styles.container}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}>
      <UserDetails user={user} />
      <SeniorActions user={connectedUser} />
    </ScrollView>
  );
};

export default SeniorDashboard;

const useStyles = (theme: Theme) => {
  const currentTheme = Colors[theme];
  return StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      backgroundColor: currentTheme.mainBackground,
      gap: 10,
      paddingBottom: 10,
    },
  });
};
