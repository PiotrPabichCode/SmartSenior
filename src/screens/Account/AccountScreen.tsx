import { StyleSheet, View } from 'react-native';
import AccountItem from './AccountItem';
import { Divider } from '@rneui/themed';
import AccountProfileHint from './AccountProfileHint';
import { useAppDispatch } from '@redux/store';
import { logoutAction } from '@src/redux/actions/authActions';
import { navigate } from '@src/navigation/navigationUtils';

const AccountScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.viewStyle}>
      <AccountProfileHint />
      <AccountItem
        icon='user-account'
        title='Konto'
        onPress={() =>
          navigate('AccountItemDetails', {
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
          navigate('AccountItemDetails', {
            screenType: 'language',
            title: 'Profil - język',
          })
        }
      />
      <AccountItem
        icon='notification-account'
        title='Powiadomienia'
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'notification',
            title: 'Profil - powiadomienia',
          })
        }
      />
      <AccountItem
        icon='share-account'
        title='Poleć naszą aplikację'
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'share',
            title: 'Profil - polecenia',
          })
        }
      />
      <Divider style={styles.dividerStyle} />
      <AccountItem
        icon='logout-account'
        title='Wyloguj się'
        onPress={() => dispatch(logoutAction())}
      />
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
