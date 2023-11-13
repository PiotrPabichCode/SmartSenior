import { StyleSheet, View } from 'react-native';
import AccountItem from './AccountItem';
import AccountProfileHint from './AccountProfileHint';
import { navigate } from '@src/navigation/navigationUtils';
import { t } from '@src/localization/Localization';
import { Theme, useAppSelector } from '@src/redux/types';
import Colors from '@src/constants/Colors';
import CustomDivider from '@src/components/CustomDivider';
import { logout } from '@src/redux/auth/auth.api';

const AccountScreen = () => {
  const connectedUsers = useAppSelector(state => state.auth.connectedUsers);
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
      {connectedUsers.length > 0 && (
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
      )}
      <AccountItem
        icon="tags-account"
        title={t('account.button.title.tags')}
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'tags',
            title: t('account.header.tags'),
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
      {/* <AccountItem
        icon="share-account"
        title={t('account.button.title.share')}
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'share',
            title: t('account.header.share'),
          })
        }
      /> */}

      <CustomDivider />
      <AccountItem
        icon="logout-account"
        title={t('account.button.title.logout')}
        onPress={() => logout()}
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
