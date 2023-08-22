import { StyleSheet, Text, TextInput, View } from 'react-native';
import WelcomeSvg from './../../../assets/register-image.svg';
import { Icon, Input, Button } from '@rneui/themed';
import {
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SignUpProps } from '../../navigation/types';

const SignUp = ({ navigation }: SignUpProps) => {
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
        />
        <Input
          style={styles.inputField}
          leftIcon={<Icon name='lock' size={30} color='black' />}
          secureTextEntry={true}
          placeholder='Hasło'
        />
        <Input
          style={styles.inputField}
          leftIcon={<Icon name='lock' size={30} color='black' />}
          secureTextEntry={true}
          placeholder='Powtórz hasło'
        />
        <Button
          title={'Zarejestruj się'}
          buttonStyle={styles.buttonSignUpStyle}
          containerStyle={styles.buttonContainerStyle}
          titleStyle={styles.buttonSignUpTitleStyle}
          onPress={() => navigation.navigate('Home')}
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

export default SignUp;
