import { StyleSheet, View } from 'react-native';
import AccountItem from './AccountItem';
import AccountProfileHint from './AccountProfileHint';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { navigate } from '@src/navigation/navigationUtils';
import { t } from '@src/localization/Localization';
import { Theme } from '@src/redux/types';
import Colors from '@src/constants/Colors';
import CustomDivider from '@src/components/CustomDivider';
import { clearEvents } from '@src/redux/events/events.slice';
import { logout } from '@src/redux/auth/auth.actions';
import { batch } from 'react-redux';

const handleLogout = async (dispatch = useAppDispatch()) => {
  batch(() => {
    dispatch(logout());
    dispatch(clearEvents());
  });
};

const AccountScreen = () => {
  const theme: Theme = useAppSelector(state => state.auth.theme);
  const currentTheme = Colors[theme];
  const styles = useStyles(currentTheme);

  return (
    <View style={styles.viewStyle}>
      <AccountProfileHint />
      <AccountItem
        icon="user-account"
        title={t('account.button.title.user')}
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'user',
            title: t('account.header.user'),
          })
        }
      />
      <CustomDivider />
      <AccountItem icon="theme-account" title={t('account.button.title.theme')} type="theme" />
      <AccountItem
        icon="language-account"
        title={t('account.button.title.language')}
        type="language"
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'language',
            title: t('account.header.language'),
          })
        }
      />
      <AccountItem
        icon="notification-account"
        title={t('account.button.title.notification')}
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'notification',
            title: t('account.header.notification'),
          })
        }
      />
      <AccountItem
        icon="share-account"
        title={t('account.button.title.share')}
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'share',
            title: t('account.header.share'),
          })
        }
      />
      <AccountItem
        icon="connected-users"
        title={t('account.button.title.connected-users')}
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'connected-users',
            title: t('account.header.connected-users'),
          })
        }
      />
      <CustomDivider />
      <AccountItem
        icon="logout-account"
        title={t('account.button.title.logout')}
        onPress={() => handleLogout()}
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
