import { StyleSheet, View } from 'react-native';
import AccountItem from './AccountItem';
import { Divider } from '@rneui/themed';
import AccountProfileHint from './AccountProfileHint';
import { AccountProps } from '../../navigation/types';
import { FIREBASE_AUTH } from '../../../firebaseConfig';
import { useUser } from '../../context/UserContext';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import SpeedDialMenu from '../../navigation/SpeedDialMenu';

const AccountScreen = ({ navigation }: AccountProps) => {
  const user = useUser();

  if (!user) {
    return <CustomActivityIndicator />;
  }

  return (
    <View style={styles.viewStyle}>
      <AccountProfileHint />
      <AccountItem
        icon='user-account'
        title='Konto'
        onPress={() =>
          navigation.navigate('AccountItemDetails', {
            screenType: 'user',
            title: 'Profil - konto',
          })
        }
      />
      <Divider style={styles.dividerStyle} />
      <AccountItem icon='theme-account' title='Motyw' type='theme' />
      <AccountItem
        icon='language-account'
        title='Język'
        type='language'
        onPress={() =>
          navigation.navigate('AccountItemDetails', {
            screenType: 'language',
            title: 'Profil - język',
          })
        }
      />
      <AccountItem
        icon='notification-account'
        title='Powiadomienia'
        onPress={() =>
          navigation.navigate('AccountItemDetails', {
            screenType: 'notification',
            title: 'Profil - powiadomienia',
          })
        }
      />
      <AccountItem
        icon='share-account'
        title='Poleć naszą aplikację'
        onPress={() =>
          navigation.navigate('AccountItemDetails', {
            screenType: 'share',
            title: 'Profil - polecenia',
          })
        }
      />
      <Divider style={styles.dividerStyle} />
      <AccountItem
        icon='logout-account'
        title='Wyloguj się'
        onPress={() => FIREBASE_AUTH.signOut()}
      />
      <SpeedDialMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFAFA',
  },
  profileViewStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  dividerStyle: {
    backgroundColor: '#000000',
    width: 400,
    height: 1,
  },
});

export default AccountScreen;
