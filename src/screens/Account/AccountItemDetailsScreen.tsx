import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AccountItemDetails from './AccountItemDetails';
import { AccountItemDetailsProps } from '../../navigation/types';

const AccountItemDetailsScreen = ({
  route,
  navigation,
}: AccountItemDetailsProps) => {
  const { screenType, title } = route.params;
  const [language, setLanguage] = useState('Polski');

  const renderUserDetailsScreen = () => {
    return (
      <ScrollView contentContainerStyle={styles.viewStyle}>
        <AccountItemDetails
          type='input'
          title='Adres e-mail:'
          placeholder='Podaj adres e-mail'
          value='235944@edu.p.lodz.pl'
        />
        <AccountItemDetails
          type='input'
          title='Imię:'
          placeholder='Podaj imię'
          value='Piotr'
        />
        <AccountItemDetails
          type='input'
          title='Nazwisko:'
          placeholder='Podaj nazwisko'
          value='Pabich'
        />
        <AccountItemDetails
          type='input'
          title='Data urodzenia:'
          placeholder='Podaj datę urodzenia'
          value='29.03.2001r.'
        />
        <AccountItemDetails
          type='input'
          title='Hasło:'
          placeholder='*********'
          value='*********'
        />
      </ScrollView>
    );
  };

  const renderLanguageScreen = () => {
    return (
      <View style={styles.viewLanguage}>
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
      </View>
    );
  };

  const renderNotificationScreen = () => {
    return (
      <View>
        <AccountItemDetails
          type='input'
          title='Czas powiadomień:'
          placeholder='Wybierz czas powiadomień'
          value='0'
        />
      </View>
    );
  };

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

const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  viewLanguage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
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
