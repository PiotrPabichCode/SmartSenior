import { selectConnectedUserById, selectTheme } from '@src/redux/auth/auth.slice';
import { useAppSelector } from '@src/redux/types';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SeniorActions from './SeniorActions';
import { goBack } from '@src/navigation/navigationUtils';
import { t } from '@src/localization/Localization';
import { getUserAge, renderGender } from '@src/utils/utils';
import { ConnectedUser, Theme } from '@src/models';
import Colors from '@src/constants/Colors';

const SeniorDashboard = ({ route }: any) => {
  const { uid } = route.params;
  const user = useAppSelector(state => selectConnectedUserById(state, uid));
  const theme = useAppSelector(state => selectTheme(state));
  const styles = useStyles(theme);

  if (!user) {
    goBack();
    return null;
  }

  const userData = user.user;

  const connectedUser: ConnectedUser = {
    user: user.user,
    eventGroups: user.eventGroups,
  };

  return (
    <ScrollView contentContainerStyle={styles.viewStyle} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('seniorDashboard.personal')}</Text>
        <View style={styles.details}>
          <Text style={styles.detailText}>
            {t('seniorDashboard.name', {
              firstName: userData.firstName,
            })}
          </Text>
          <Text style={styles.detailText}>
            {t('seniorDashboard.surname', {
              lastName: userData.lastName,
            })}
          </Text>
          <Text style={styles.detailText}>
            {t('seniorDashboard.email', {
              email: userData.email,
            })}
          </Text>
          <Text style={styles.detailText}>
            {t('seniorDashboard.gender', {
              gender: renderGender(userData.gender),
            })}
          </Text>
          <Text style={styles.detailText}>
            {t('seniorDashboard.age', {
              age: getUserAge(userData.birthDate!),
            })}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{t('seniorDashboard.availableActions')}</Text>
        <SeniorActions user={connectedUser} />
      </View>
    </ScrollView>
  );
};

export default SeniorDashboard;

const useStyles = (theme: Theme) => {
  const currentTheme = Colors[theme];
  return StyleSheet.create({
    viewStyle: {
      minHeight: '100%',
      alignItems: 'center',
      backgroundColor: currentTheme.mainBackground,
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      elevation: 5,
      backgroundColor: Colors.primary,
      padding: 10,
      borderRadius: 25,
      margin: 10,
      gap: 10,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    details: {
      flexGrow: 1,
      alignItems: 'center',
      gap: 20,
    },
    detailText: {
      fontSize: 18,
      fontWeight: '500',
    },
  });
};
