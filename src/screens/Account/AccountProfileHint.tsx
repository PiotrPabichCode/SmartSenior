import { Avatar } from '@rneui/themed';
import { StyleSheet, View, Text } from 'react-native';
import { User } from '@src/models';
import { useAppSelector } from '@src/redux/types';
import { createUserLabel } from '@src/utils/utils';

const AccountProfileHint = () => {
  const user: User | null = useAppSelector(state => state.auth.user);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.viewStyle}>
      <Avatar
        size="large"
        rounded
        title={createUserLabel(user.firstName, user.lastName)}
        containerStyle={{ backgroundColor: '#C0C0C0' }}
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

const styles = StyleSheet.create({
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
  },
  email: {
    fontSize: 16,
    fontWeight: '400',
    maxWidth: 200,
  },
  role: {
    marginTop: 2,
    fontWeight: '500',
    fontSize: 15,
  },
});

export default AccountProfileHint;
