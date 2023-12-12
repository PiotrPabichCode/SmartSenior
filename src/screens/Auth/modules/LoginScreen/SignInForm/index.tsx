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
import { StyleSheet, View } from 'react-native';

const SignInForm = () => {
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <Text h2>{t('login.welcomeBack')}</Text>
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
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <>
            <Input
              style={styles.inputField}
              leftIcon={<Icon name="email" size={30} color="black" />}
              placeholder={t('login.button.placeholder.email')}
              keyboardType="email-address"
              onBlur={handleBlur('email')}
              onChangeText={handleChange('email')}
              value={values.email}
              errorMessage={touched.email ? errors.email : ''}
            />

            <Input
              style={styles.inputField}
              leftIcon={<Icon name="lock" size={30} color="black" />}
              secureTextEntry={true}
              placeholder={t('login.button.placeholder.password')}
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
              value={values.password}
              errorMessage={touched.password ? errors.password : ''}
            />
            <View style={styles.signInContainer}>
              <SignInButton onSubmit={handleSubmit} />
              <SignUpRedirect />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignInForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inputField: {
    fontSize: 16,
    fontWeight: '700',
  },
  signInContainer: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
