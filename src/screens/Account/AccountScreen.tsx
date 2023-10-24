import { StyleSheet, View } from 'react-native';
import AccountItem from './AccountItem';
import { Divider } from '@rneui/themed';
import AccountProfileHint from './AccountProfileHint';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { logoutAction } from '@src/redux/actions/authActions';
import { navigate } from '@src/navigation/navigationUtils';
import { translate } from '@src/localization/Localization';
import { clearEventsAction } from '@src/redux/actions/eventsActions';
import { Theme } from '@src/redux/types';
import Colors from '@src/constants/Colors';
import CustomDivider from '@src/components/CustomDivider';

const handleLogout = (dispatch = useAppDispatch()) => {
  dispatch(clearEventsAction());
  dispatch(logoutAction());
};

const AccountScreen = () => {
  const dispatch = useAppDispatch();
  const theme: Theme = useAppSelector(state => state.auth.theme);
  const currentTheme = Colors[theme];
  const styles = useStyles(currentTheme);

  return (
    <View style={styles.viewStyle}>
      <AccountProfileHint />
      <AccountItem
        icon="user-account"
        title={translate('account.button.title.user')}
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'user',
            title: translate('account.header.user'),
          })
        }
      />
      <CustomDivider />
      <AccountItem
        icon="theme-account"
        title={translate('account.button.title.theme')}
        type="theme"
      />
      <AccountItem
        icon="language-account"
        title={translate('account.button.title.language')}
        type="language"
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'language',
            title: translate('account.header.language'),
          })
        }
      />
      <AccountItem
        icon="notification-account"
        title={translate('account.button.title.notification')}
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'notification',
            title: translate('account.header.notification'),
          })
        }
      />
      <AccountItem
        icon="share-account"
        title={translate('account.button.title.share')}
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'share',
            title: translate('account.header.share'),
          })
        }
      />
      <AccountItem
        icon="connected-users"
        title={translate('account.button.title.connected-users')}
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'connected-users',
            title: translate('account.header.connected-users'),
          })
        }
      />
      <CustomDivider />
      <AccountItem
        icon="logout-account"
        title={translate('account.button.title.logout')}
        onPress={() => handleLogout(dispatch)}
      />
    </View>
  );
};

const useStyles = (theme: any) =>
  StyleSheet.create({
    viewStyle: {
      height: '100%',
      backgroundColor: theme.mainBackground,
    },
  });

export default AccountScreen;
