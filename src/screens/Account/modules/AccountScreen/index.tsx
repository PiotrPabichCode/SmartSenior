import { ScrollView, StyleSheet } from 'react-native';
import AccountItem from './AccountItem';
import AccountProfileHint from './AccountProfileHint';
import { navigate } from '@src/navigation/navigationUtils';
import { t } from '@src/localization/Localization';
import { useAppSelector } from '@src/redux/types';
import CustomDivider from '@src/components/CustomDivider';
import { logout } from '@src/redux/auth/auth.api';
import { selectConnectedUsers } from '@src/redux/auth/auth.slice';
import useThemeColors from '@src/config/useThemeColors';

const AccountScreen = () => {
  const connectedUsers = useAppSelector(state => selectConnectedUsers(state));
  const styles = useStyles();

  return (
    <ScrollView contentContainerStyle={styles.viewStyle}>
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
      <AccountItem
        icon="medicines-account"
        title={t('account.button.title.medicines')}
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'medicines',
            title: t('account.header.medicines'),
          })
        }
      />
      <AccountItem
        icon="pharmacies-account"
        title={t('account.button.title.pharmacies')}
        onPress={() =>
          navigate('AccountItemDetails', {
            screenType: 'pharmacies',
            title: t('account.header.pharmacies'),
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
    </ScrollView>
  );
};

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    viewStyle: {
      minHeight: '100%',
      backgroundColor: theme.cardBackground,
    },
  });

export default AccountScreen;
