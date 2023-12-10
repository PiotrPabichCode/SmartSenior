import { Icon, Input, Text } from '@rneui/themed';
import { Formik } from 'formik';
import { LoginSchema } from './utils';
import { useAppDispatch } from '@src/redux/types';
import { t } from '@src/localization/Localization';
import CustomToast from '@src/components/CustomToast';
import { signIn } from '@src/redux/auth/auth.actions';
import SignInButton from './SignInButton';
import SignInGoogleButton from './SignInGoogleButton';
import LoginDivider from './LoginDivider';
import SignUpRedirect from './SignUpRedirect';
import { StyleSheet } from 'react-native';

const SignInForm = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <Text style={styles.headerText}>{t('login.welcomeBack')}</Text>
      <SignInGoogleButton />
      <LoginDivider />
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async values => {
          try {
            await dispatch(signIn(values)).unwrap();
            CustomToast('success', t('login.message.success.signIn'));
          } catch (e) {
            console.log(e);
            CustomToast('error', t('login.message.error.signIn'));
          }
        }}>
        {({ values, handleChange, handleSubmit, errors }) => (
          <>
            <Input
              style={styles.inputField}
              underlineColorAndroid="transparent"
              leftIcon={<Icon name="email" size={30} color="black" />}
              placeholder={t('login.button.placeholder.email')}
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              value={values.email}
              errorMessage={errors.email}
            />

            <Input
              style={styles.inputField}
              leftIcon={<Icon name="lock" size={30} color="black" />}
              secureTextEntry={true}
              placeholder={t('login.button.placeholder.password')}
              onChangeText={handleChange('password')}
              value={values.password}
              errorMessage={errors.password}
            />
            <SignInButton onSubmit={handleSubmit} />
          </>
        )}
      </Formik>
      <SignUpRedirect />
    </>
  );
};

export default SignInForm;

const styles = StyleSheet.create({
  inputField: {
    alignSelf: 'stretch',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
