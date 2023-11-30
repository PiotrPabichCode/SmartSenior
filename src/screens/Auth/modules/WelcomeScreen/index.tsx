import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from '@rneui/themed';
import WelcomeSvg from '@assets/welcome-image.svg';
import { navigate } from '@src/navigation/navigationUtils';
import { t } from '@src/localization/Localization';
import { useAppSelector } from '@src/redux/types';
import { selectAuthStatus } from '@src/redux/auth/auth.slice';

const WelcomeScreen = () => {
  const status = useAppSelector(state => selectAuthStatus(state));

  if (status === 'pending') {
    return null;
  }
  return (
    <SafeAreaView style={styles.viewStyle}>
      {/* Image at the top */}
      <Text style={styles.headerText}>{t('appName')}</Text>
      <WelcomeSvg width={300} height={300} />

      {/* Text under the Image */}
      <Text style={styles.welcomeText}>{t('welcome.message1')}</Text>
      <Text style={styles.welcomeText2}>{t('welcome.message2')}</Text>

      <View style={styles.buttonsStyle}>
        {/* Buttons at the bottom */}
        <Button
          title={t('welcome.signUp')}
          buttonStyle={styles.buttonSignUpStyle}
          containerStyle={styles.buttonContainerStyle}
          titleStyle={styles.buttonSignUpTitleStyle}
          onPress={() => navigate('SignUp')}
        />
        <Button
          title={t('welcome.signIn')}
          buttonStyle={styles.buttonSignInStyle}
          containerStyle={styles.buttonContainerStyle}
          titleStyle={styles.buttonSignInTitleStyle}
          onPress={() => navigate('SignIn')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    marginTop: 50,
    fontSize: 48,
    fontWeight: 'bold',
  },
  welcomeText: {
    marginTop: 10,
    fontSize: 32,
    fontWeight: '500',
    textAlign: 'center',
    color: 'black',
  },
  welcomeText2: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
  buttonsStyle: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  buttonContainerStyle: {
    margin: 10,
  },
  buttonSignUpStyle: {
    backgroundColor: 'rgba(39, 39, 39, 1)',
    borderRadius: 5,
  },
  buttonSignUpTitleStyle: {
    fontSize: 20,
    color: 'white',
  },
  buttonSignInStyle: {
    backgroundColor: 'blue',
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonSignInTitleStyle: {
    fontSize: 20,
    color: 'white',
  },
});

export default WelcomeScreen;
