import { Avatar } from '@rneui/themed';
import { StyleSheet, View, Text } from 'react-native';
import { useUser } from '../../context/UserContext';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';

const AccountProfileHint = () => {
  const user = useUser();

  if (!user) {
    return <CustomActivityIndicator />;
  }

  return (
    <View style={styles.viewStyle}>
      <Avatar
        size='large'
        rounded
        title='PP'
        containerStyle={{ backgroundColor: '#C0C0C0' }}
        titleStyle={{ color: 'black', fontWeight: '500' }}
      />
      <View style={styles.detailsView}>
        <Text style={styles.name} numberOfLines={1}>
          {`${user?.firstName} ${user?.lastName}`}
        </Text>
        <Text style={styles.email} numberOfLines={1}>
          {user?.email}
        </Text>
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
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    maxWidth: 200,
  },
  email: {
    fontSize: 16,
    fontWeight: '400',
    maxWidth: 200,
  },
});

export default AccountProfileHint;
