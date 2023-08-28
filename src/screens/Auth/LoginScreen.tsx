import { StyleSheet, Text, TextInput, View } from 'react-native';
import WelcomeSvg from '../../assets/welcome-image.svg';
import { Icon, Input, Button } from '@rneui/themed';
import { TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { SignInProps } from '../../navigation/types';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import db from '@react-native-firebase/database';

const LoginScreen = ({ navigation }: SignInProps) => {
  interface UserCredentials {
    email: string;
    password: string;
    repeatPassword: string;
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const validateCredentials = ({
    email,
    password,
    repeatPassword,
  }: UserCredentials) => {
    if (email && password && repeatPassword) {
      if (password === repeatPassword) {
        return true;
      }
    }
    return false;
  };

  const createProfile = async (response: any) => {
    db().ref(`/users/${response.user.uid}`).set({ email });
  };

  const registerAndGoToMainDisplay = async (
    userCredentials: UserCredentials
  ) => {
    try {
      if (validateCredentials(userCredentials)) {
        const response = await auth().createUserWithEmailAndPassword(
          userCredentials.email,
          userCredentials.password
        );

        if (response.user) {
          await createProfile(response);
          navigation.navigate('BottomBar', {
            screen: 'Home',
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.viewStyle}>
        <WelcomeSvg width={250} height={250} />
        <Text style={styles.headerText}>Witaj z powrotem!</Text>
        <Button
          title={'Zaloguj się za pomocą Google'}
          buttonStyle={styles.buttonAuthGoogleStyle}
          containerStyle={styles.buttonContainerStyle}
          titleStyle={styles.buttonAuthGoogleTitleStyle}
        />
        <View
          style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          <View>
            <Text style={{ width: 50, textAlign: 'center' }}>Lub</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        </View>
        <Input
          style={styles.inputField}
          underlineColorAndroid='transparent'
          leftIcon={<Icon name='email' size={30} color='black' />}
          inputMode='email'
          placeholder='Adres e-mail'
        />
        <Input
          style={styles.inputField}
          leftIcon={<Icon name='lock' size={30} color='black' />}
          secureTextEntry={true}
          placeholder='●●●●●●'
        />
        <Button
          title={'Zaloguj się'}
          buttonStyle={styles.buttonSignInStyle}
          containerStyle={styles.buttonContainerStyle}
          titleStyle={styles.buttonSignInTitleStyle}
          onPress={() =>
            navigation.navigate('BottomBar', {
              screen: 'Home',
            })
          }
        />
        <Text style={styles.textLinks}>
          Nie masz konta?{' '}
          <Text
            style={styles.textRegister}
            onPress={() => navigation.navigate('SignUp')}>
            Zarejestruj się
          </Text>
        </Text>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flexGrow: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  buttonContainerStyle: {
    marginTop: 10,
    alignSelf: 'stretch',
    borderRadius: 5,
    marginHorizontal: 20,
  },
  buttonAuthGoogleStyle: {
    backgroundColor: '#F5F5F5',
  },
  buttonAuthGoogleTitleStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  inputField: {
    alignSelf: 'stretch',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 20,
  },
  buttonSignInStyle: {
    backgroundColor: 'black',
  },
  buttonSignInTitleStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  textLinks: {
    margin: 15,
    fontSize: 14,
    fontWeight: '600',
  },
  textRegister: {
    color: 'blue',
  },
});

export default LoginScreen;
