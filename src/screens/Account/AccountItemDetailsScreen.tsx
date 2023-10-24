import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import AccountItemDetails from './AccountItemDetails';
import CustomActivityIndicator from '@components/CustomActivityIndicator';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { changeLanguage } from '@src/utils/utils';
import Localization, { translate } from '@src/localization/Localization';
import { changeLanguageAction } from '@src/redux/actions/authActions';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { Theme } from '@src/redux/types';
import Colors from '@src/constants/Colors';

const AccountItemDetailsScreen = ({ route }: any) => {
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector(state => state.auth.userDetails);
  const theme: Theme = useAppSelector(state => state.auth.theme);
  const currentTheme = Colors[theme];

  if (!userDetails) {
    return <CustomActivityIndicator />;
  }

  const { screenType } = route.params;
  const handleLanguageChange = (language: string) => {
    changeLanguage(language);
    dispatch(changeLanguageAction(language));
  };

  const renderUserDetailsScreen = () => {
    return (
      <>
        <AccountItemDetails
          type="input"
          title={translate('account.title.email')}
          placeholder={translate('account.placeholder.email')}
          value={userDetails.email || ''}
        />
        <AccountItemDetails
          type="input"
          title={translate('account.title.firstName')}
          placeholder={translate('account.placeholder.firstName')}
          value={userDetails.firstName || ''}
        />
        <AccountItemDetails
          type="input"
          title={translate('account.title.lastName')}
          placeholder={translate('account.placeholder.lastName')}
          value={userDetails.lastName || ''}
        />
        <AccountItemDetails
          type="input"
          title={translate('account.title.birthDate')}
          placeholder={translate('account.placeholder.birthDate')}
          value={userDetails.birthDate || ''}
        />
        <AccountItemDetails
          type="input"
          title={translate('account.title.password')}
          placeholder={translate('account.placeholder.password')}
          value={translate('account.placeholder.password')}
        />
      </>
    );
  };

  const renderLanguageScreen = () => {
    return (
      <>
        <Text style={styles.languageTitle}>{translate('account.language.title')}</Text>
        <Text style={styles.language}>{translate('languageName')}</Text>
        <Text
          style={styles.pickLanguage}
          onPress={() => handleLanguageChange(Localization.supportedLanguages.POLISH)}>
          {translate('account.language.polish')}
        </Text>
        <Text
          style={styles.pickLanguage}
          onPress={() => handleLanguageChange(Localization.supportedLanguages.ENGLISH)}>
          {translate('account.language.english')}
        </Text>
      </>
    );
  };

  const renderNotificationScreen = () => {
    return (
      <AccountItemDetails
        type="input"
        keyboard="numeric"
        title={translate('account.notification.title')}
        value="0"
      />
    );
  };

  const renderScreenByType = (screenType: string) => {
    switch (screenType) {
      case 'user':
        return renderUserDetailsScreen();
      case 'language':
        return renderLanguageScreen();
      case 'notification':
        return renderNotificationScreen();
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
