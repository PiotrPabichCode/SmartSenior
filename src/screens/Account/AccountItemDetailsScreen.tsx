import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AccountItemDetails from './AccountItemDetails';
import CustomActivityIndicator from '@components/CustomActivityIndicator';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { changeLanguage } from '@src/utils/utils';
import Localization, { translate } from '@src/localization/Localization';
import { changeLanguageAction } from '@src/redux/actions/authActions';

const AccountItemDetailsScreen = ({ route }: any) => {
  const userDetails = useAppSelector(state => state.auth.userDetails);
  const dispatch = useAppDispatch();

  if (!userDetails) {
    return <CustomActivityIndicator />;
  }

  const { screenType } = route.params;
  const [language, setLanguage] = useState(translate('languageName'));

  const handleLanguageChange = (language: string) => {
    changeLanguage(language);

    if (language === Localization.supportedLanguages.POLISH) {
      setLanguage(translate('account.language.polish'));
    }
    if (language === Localization.supportedLanguages.ENGLISH) {
      setLanguage(translate('account.language.english'));
    }
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
        <Text style={styles.language}>{language}</Text>
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
      <>
        <AccountItemDetails
          type="input"
          keyboard="numeric"
          title={translate('account.notification.title')}
          value="0"
        />
      </>
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
    <View style={styles.view}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>{renderScreenByType(screenType)}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    margin: 10,
    padding: 10,
    gap: 15,
    elevation: 5,
  },
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
    backgroundColor: 'lightblue',
    textAlign: 'center',
    borderRadius: 10,
    marginVertical: 10,
    fontSize: 20,
    fontWeight: '500',
    textAlignVertical: 'center',
  },
});

export default AccountItemDetailsScreen;
