import { Avatar } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';
import { useAppSelector } from '@src/redux/types';
import { createUserLabel } from '@src/utils/utils';
import { selectUser } from '@src/redux/auth/auth.slice';
import useThemeColors from '@src/config/useThemeColors';
import { Text } from '@rneui/themed';

const AccountProfileHint = () => {
  const user = useAppSelector(state => selectUser(state));
  const styles = useStyles();

  if (!user) {
    return null;
  }

  return (
    <View style={styles.viewStyle}>
      <Avatar
        size="large"
        rounded
        title={createUserLabel(user.firstName, user.lastName)}
        containerStyle={styles.avatar}
        titleStyle={{ color: 'black', fontWeight: '500' }}
      />
      <View style={styles.detailsView}>
        <Text style={styles.name} numberOfLines={1}>
          {`${user.firstName} ${user.lastName}`}
        </Text>
        <Text style={styles.email} numberOfLines={1}>
          {user.email}
        </Text>
        <Text style={styles.role}>{user.role}</Text>
      </View>
    </View>
  );
};

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    viewStyle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-evenly',
      margin: 20,
      padding: 20,
    },
    detailsView: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    name: {
      marginTop: 10,
      fontSize: 20,
      fontWeight: 'bold',
      maxWidth: 200,
      color: theme.text,
    },
    email: {
      fontSize: 16,
      fontWeight: '400',
      maxWidth: 200,
      color: theme.text,
    },
    role: {
      marginTop: 2,
      fontWeight: '500',
      fontSize: 15,
      color: theme.text,
    },
    avatar: {
      backgroundColor: '#C0C0C0',
    },
  });

export default AccountProfileHint;
