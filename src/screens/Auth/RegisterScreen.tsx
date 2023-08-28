import WelcomeSvg from '../../assets/welcome-image.svg';
import { Icon, Input, Button } from '@rneui/themed';
import {
  StyleSheet,
  Text,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SignUpProps } from '../../navigation/types';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import db from '@react-native-firebase/database';

const RegisterScreen = ({ navigation }: SignUpProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const validateCredentials = () => {
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

  const registerAndGoToMainDisplay = async () => {
    try {
      if (validateCredentials()) {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password
        );

        if (response.user) {
          await createProfile(response);
          navigation.replace('BottomBar', {
            screen: 'Home',
          });
        }
      }
    } catch (e) {
      // Alert.alert('Wystąpił błąd', 'Proszę sprawdzić wprowadzone dane');
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
        <WelcomeSvg width={230} height={230} />
        <Text style={styles.headerText}>
          Cieszymy się, że zdecydowałeś się dołączyć do nas!
        </Text>
        <Input
          style={styles.inputField}
          underlineColorAndroid='transparent'
          leftIcon={<Icon name='email' size={30} color='black' />}
          placeholder='Adres e-mail'
          keyboardType='email-address'
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Input
          style={styles.inputField}
          leftIcon={<Icon name='lock' size={30} color='black' />}
          secureTextEntry={true}
          placeholder='Hasło'
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Input
          style={styles.inputField}
          leftIcon={<Icon name='lock' size={30} color='black' />}
          secureTextEntry={true}
          placeholder='Powtórz hasło'
          onChangeText={(text) => setRepeatPassword(text)}
          value={repeatPassword}
        />
        <Button
          title={'Zarejestruj się'}
          buttonStyle={styles.buttonSignUpStyle}
          containerStyle={styles.buttonContainerStyle}
          titleStyle={styles.buttonSignUpTitleStyle}
          onPress={() => registerAndGoToMainDisplay()}
        />
        <Text style={styles.textLinks}>
          Masz już konto?{' '}
          <Text
            style={styles.textRegister}
            onPress={() => navigation.navigate('SignIn')}>
            Zaloguj się
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
    width: Dimensions.get('window').width,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainerStyle: {
    marginTop: 5,
    alignSelf: 'stretch',
    borderRadius: 5,
    marginHorizontal: 20,
  },
  inputField: {
    alignSelf: 'stretch',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 20,
  },
  buttonSignUpStyle: {
    backgroundColor: 'black',
  },
  buttonSignUpTitleStyle: {
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

export default RegisterScreen;
