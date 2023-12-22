import { View, StyleSheet } from 'react-native';
import { ConnectedUser } from '@src/models';
import { getUserAge, renderGender } from '@src/utils/utils';
import { t } from '@src/localization/Localization';
import { Text } from '@rneui/themed';
import DetailText from './DetailText';
import useThemeColors from '@src/config/useThemeColors';

type Props = {
  user: ConnectedUser;
};

const UserDetails = ({ user }: Props) => {
  const userData = user.user;
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text h3>{t('seniorDashboard.personal')}</Text>
      <View style={styles.details}>
        <DetailText
          text={t('seniorDashboard.name', {
            firstName: userData.firstName,
          })}
        />
        <DetailText
          text={t('seniorDashboard.surname', {
            lastName: userData.lastName,
          })}
        />
        <DetailText
          text={t('seniorDashboard.email', {
            email: userData.email,
          })}
        />
        <DetailText
          text={t('seniorDashboard.gender', {
            gender: renderGender(userData.gender),
          })}
        />
        <DetailText
          text={t('seniorDashboard.age', {
            age: getUserAge(userData.birthDate!),
          })}
        />
      </View>
    </View>
  );
};

export default UserDetails;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      width: '95%',
      elevation: 5,
      backgroundColor: theme.cardBackground,
      padding: 10,
      borderRadius: 25,
      margin: 10,
      gap: 10,
    },
    details: {
      alignItems: 'center',
      gap: 20,
    },
  });
