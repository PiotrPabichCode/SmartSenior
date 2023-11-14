import { StyleSheet, Text } from 'react-native';
import AccountItemDetails from './AccountItemDetails';
import { convertTimestampToDate } from '@src/utils/utils';
import Localization, { t } from '@src/localization/Localization';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import Colors from '@src/constants/Colors';
import AccountConnectedUsersScreen from './ConnectedUsers/AccountConnectedUsersScreen';
import { goBack } from '@src/navigation/navigationUtils';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { changeLanguage } from '@src/redux/auth/auth.actions';
import AccountTags from './AccountTags';
import { selectTheme, selectUser } from '@src/redux/auth/auth.slice';
import FavouriteMedicinesScreen from './FavouriteMedicines/FavouriteMedicinesScreen';
import FavouritePharmaciesScreen from './FavouritePharmacies/FavouritePharmaciesScreen';

const AccountItemDetailsScreen = ({ route }: any) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => selectUser(state));
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];

  if (!user) {
    goBack();
    return null;
  }

  const { screenType } = route.params;

  const renderUserDetailsScreen = () => {
    return (
      <>
        <AccountItemDetails
          type="input"
          title={t('account.title.email')}
          placeholder={t('account.placeholder.email')}
          value={user.email || ''}
        />
        <AccountItemDetails
          type="input"
          title={t('account.title.firstName')}
          placeholder={t('account.placeholder.firstName')}
          value={user.firstName || ''}
        />
        <AccountItemDetails
          type="input"
          title={t('account.title.lastName')}
          placeholder={t('account.placeholder.lastName')}
          value={user.lastName || ''}
        />
        <AccountItemDetails
          type="input"
          title={t('account.title.birthDate')}
          placeholder={t('account.placeholder.birthDate')}
          value={convertTimestampToDate(user.birthDate!, 'DD-MM-YYYY') || ''}
        />
        <AccountItemDetails
          type="input"
          title={t('account.title.password')}
          placeholder={t('account.placeholder.password')}
          value={t('account.placeholder.password')}
        />
      </>
    );
  };

  const renderLanguageScreen = () => {
    return (
      <>
        <Text style={styles.languageTitle}>{t('account.language.title')}</Text>
        <Text style={styles.language}>{t('languageName')}</Text>
        <Text
          style={styles.pickLanguage}
          onPress={() => dispatch(changeLanguage(Localization.supportedLanguages.POLISH))}>
          {t('account.language.polish')}
        </Text>
        <Text
          style={styles.pickLanguage}
          onPress={() => dispatch(changeLanguage(Localization.supportedLanguages.ENGLISH))}>
          {t('account.language.english')}
        </Text>
      </>
    );
  };

  const renderNotificationScreen = () => {
    return (
      <AccountItemDetails
        type="input"
        keyboard="numeric"
        title={t('account.notification.title')}
        value="0"
      />
    );
  };

  const renderScreenByType = (screenType: string) => {
    switch (screenType) {
      case 'user':
        return renderUserDetailsScreen();
      case 'connected-users':
        return <AccountConnectedUsersScreen />;
      case 'tags':
        return <AccountTags />;
      case 'medicines':
        return <FavouriteMedicinesScreen />;
      case 'pharmacies':
        return <FavouritePharmaciesScreen />;
      case 'notification':
        return renderNotificationScreen();
      case 'language':
        return renderLanguageScreen();
      case 'share':
        return <></>;
      default:
        return <></>;
    }
  };

  return (
    <CustomScrollContainer theme={currentTheme}>
      {renderScreenByType(screenType)}
    </CustomScrollContainer>
  );
};

const styles = StyleSheet.create({
  languageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  language: {
    fontSize: 20,
    fontWeight: '600',
    color: '#808080',
  },
  pickLanguage: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    marginVertical: 10,
    fontSize: 20,
    fontWeight: '500',
    textAlignVertical: 'center',
  },
});

export default AccountItemDetailsScreen;
