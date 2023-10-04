import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AccountItemDetails from './AccountItemDetails';
import { AccountItemDetailsProps } from '@navigation/types';
import CustomActivityIndicator from '@components/CustomActivityIndicator';
import SpeedDialMenu from '@navigation/SpeedDialMenu';
import { useAppSelector } from '@redux/store';

const AccountItemDetailsScreen = ({
  route,
  navigation,
}: AccountItemDetailsProps) => {
  const userDetails = useAppSelector((state) => state.auth.userDetails);

  if (!userDetails) {
    return <CustomActivityIndicator />;
  }

  const { screenType, title } = route.params;
  const [language, setLanguage] = useState('Polski');

  const renderUserDetailsScreen = () => {
    return (
      <>
        <AccountItemDetails
          type='input'
          title='Adres e-mail:'
          placeholder='Podaj adres e-mail'
          value={userDetails.email || ''}
        />
        <AccountItemDetails
          type='input'
          title='Imię:'
          placeholder='Podaj imię'
          value={userDetails.firstName || ''}
        />
        <AccountItemDetails
          type='input'
          title='Nazwisko:'
          placeholder='Podaj nazwisko'
          value={userDetails.lastName || ''}
        />
        <AccountItemDetails
          type='input'
          title='Data urodzenia:'
          placeholder='Podaj datę urodzenia'
          value={userDetails.birthDate || ''}
        />
        <AccountItemDetails
          type='input'
          title='Hasło:'
          placeholder='*********'
          value='*********'
        />
      </>
    );
  };

  const renderLanguageScreen = () => {
    return (
      <>
        <Text style={styles.languageTitle}>Wybrany język</Text>
        <Text style={styles.language}>{language}</Text>
        <Text style={styles.pickLanguage} onPress={() => setLanguage('Polski')}>
          Polski
        </Text>
        <Text
          style={styles.pickLanguage}
          onPress={() => setLanguage('English')}>
          English
        </Text>
      </>
    );
  };

  const renderNotificationScreen = () => {
    return (
      <>
        <AccountItemDetails
          type='input'
          title='Czas powiadomień:'
          placeholder='Wybierz czas powiadomień'
          value='0'
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          {renderScreenByType(screenType)}
        </View>
      </ScrollView>
      <SpeedDialMenu navigation={navigation} />
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
