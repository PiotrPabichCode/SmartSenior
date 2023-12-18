import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ConnectedUser } from '@src/models';
import { createUserLabel } from '@src/utils/utils';
import { navigate } from '@src/navigation/navigationUtils';
import { t } from '@src/localization/Localization';
import { Text } from '@rneui/themed';
import useThemeColors from '@src/config/useThemeColors';

type Props = {
  connectedUser: ConnectedUser;
};

const ConnectedUserItem = ({ connectedUser: user }: Props) => {
  const styles = useStyles();
  const userData = user.user;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigate('SeniorDashboard', {
          uid: user.user.uid,
          title: t('account.header.seniorDashboard', {
            firstName: user.user.firstName,
            lastName: user.user.lastName,
          }),
        })
      }>
      <View style={styles.avatar}>
        <Text style={styles.avatarLabel}>
          {createUserLabel(userData.firstName, userData.lastName)}
        </Text>
      </View>
      <View style={styles.keeperContainer}>
        <Text style={styles.keeperText} numberOfLines={1}>
          {userData.firstName} {userData.lastName}
        </Text>

        <Text style={styles.keeperText} numberOfLines={1}>
          E-mail: {userData.email}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ConnectedUserItem;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: {
      minWidth: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'lightblue',
      borderRadius: 25,
      padding: 10,
    },
    avatar: {
      width: 50,
      height: 50,
      marginRight: 20,
      backgroundColor: theme.customBtnBackground,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarLabel: {
      fontWeight: '600',
      fontSize: 18,
    },
    keeperContainer: {
      gap: 10,
    },
    keeperText: {
      fontSize: 16,
      fontWeight: '600',
    },
  });
