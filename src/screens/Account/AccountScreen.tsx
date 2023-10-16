import { StyleSheet, View } from 'react-native';
import AccountItem from './AccountItem';
import { Divider } from '@rneui/themed';
import AccountProfileHint from './AccountProfileHint';
import { useAppDispatch } from '@redux/store';
import { logoutAction } from '@src/redux/actions/authActions';
import { navigate } from '@src/navigation/navigationUtils';
import { translate } from '@src/localization/Localization';

const AccountScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.viewStyle}>
      <AccountProfileHint />
      <AccountItem
        icon='user-account'
        title={translate('account.button.title.user')}
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'user',
            title: translate('account.header.user'),
          })
        }
      />
      <Divider style={styles.dividerStyle} />
      <AccountItem
        icon='theme-account'
        title={translate('account.button.title.theme')}
        type='theme'
      />
      <AccountItem
        icon='language-account'
        title={translate('account.button.title.language')}
        type='language'
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'language',
            title: translate('account.header.language'),
          })
        }
      />
      <AccountItem
        icon='notification-account'
        title={translate('account.button.title.notification')}
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'notification',
            title: translate('account.header.notification'),
          })
        }
      />
      <AccountItem
        icon='share-account'
        title={translate('account.button.title.share')}
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'share',
            title: translate('account.header.share'),
          })
        }
      />
      <AccountItem
        icon='connected-users'
        title={translate('account.button.title.connected-users')}
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'connected-users',
            title: translate('account.header.connected-users'),
          })
        }
      />
      <Divider style={styles.dividerStyle} />
      <AccountItem
        icon='logout-account'
        title={translate('account.button.title.logout')}
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
