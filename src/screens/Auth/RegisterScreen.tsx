import WelcomeSvg from '@assets/register-image.svg';
import { Icon, Input, Button } from '@rneui/themed';
import { StyleSheet, Text, ScrollView } from 'react-native';
import * as Yup from 'yup';
import { ErrorMessage, Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import CustomToast from '@src/components/CustomToast';
import { useAppDispatch } from '@redux/store';
import { navigate } from '@src/navigation/navigationUtils';
import { t } from '@src/localization/Localization';
import { signUp } from '@src/redux/auth/auth.actions';

const RegisterScreen = () => {
  const dispatch = useAppDispatch();

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email(t('login.yup.email')).required(t('yup.required')),
    password: Yup.string()
      .min(6, t('login.yup.passwordLengthMin'))
      .max(30, t('login.yup.passwordLengthMax'))
      .required(t('yup.required')),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('login.yup.repeatPassword'))
      .required(t('yup.required')),
  });

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <WelcomeSvg width={230} height={170} />
        <View style={styles.formContainer}>
          <Text style={styles.headerText}>{t('register.welcome')}</Text>
          <Formik
            initialValues={{
              email: '',
              password: '',
              repeatPassword: '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={async values => {
              try {
                await dispatch(signUp(values)).unwrap();
                navigate('FirstLoginWizard');
              } catch (e) {
                CustomToast('error', t('register.message.error.signUp'));
              }
            }}>
            {({ values, handleChange, handleSubmit }) => (
              <>
                <View style={styles.inputField}>
                  <Input
                    style={styles.inputField}
                    underlineColorAndroid="transparent"
                    leftIcon={<Icon name="email" size={30} color="black" />}
                    placeholder={t('register.button.placeholder.email')}
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    value={values.email}
                  />
                  <ErrorMessage className="errorText" component={Text} name="email" />
                </View>

                <View style={styles.inputField}>
                  <Input
                    style={styles.inputField}
                    leftIcon={<Icon name="lock" size={30} color="black" />}
                    secureTextEntry={true}
                    placeholder={t('register.button.placeholder.password')}
                    onChangeText={handleChange('password')}
                    value={values.password}
                  />
                  <ErrorMessage className="errorText" component={Text} name="password" />
                </View>
                <View style={styles.inputField}>
                  <Input
                    style={styles.inputField}
                    leftIcon={<Icon name="lock" size={30} color="black" />}
                    secureTextEntry={true}
                    placeholder={t('register.button.placeholder.repeatPassword')}
                    onChangeText={handleChange('repeatPassword')}
                    value={values.repeatPassword}
                  />
                  <ErrorMessage className="errorText" component={Text} name="repeatPassword" />
                </View>

                <Button
                  title={t('register.button.submit')}
                  buttonStyle={styles.buttonSignUpStyle}
                  containerStyle={styles.buttonContainerStyle}
                  titleStyle={styles.buttonSignUpTitleStyle}
                  onPress={() => handleSubmit()}
                />
              </>
            )}
          </Formik>
          <Text style={styles.textLinks}>
            {t('register.question')}
            <Text style={styles.textRegister} onPress={() => navigate('SignIn')}>
              {t('register.signIn')}
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 50,
  },
  formContainer: {
    padding: 8,
    margin: 8,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
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
    marginHorizontal: 10,
  },
  inputField: {
    alignSelf: 'stretch',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonSignUpStyle: {
    backgroundColor: 'black',
  },
  buttonSignUpTitleStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
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
