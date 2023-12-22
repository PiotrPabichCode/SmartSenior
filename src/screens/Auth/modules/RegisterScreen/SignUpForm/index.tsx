import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { RegisterSchema } from './utils';
import { signUp } from '@src/redux/auth/auth.actions';
import { t } from '@src/localization/Localization';
import CustomToast from '@src/components/CustomToast';
import { Icon, Input, Text } from '@rneui/themed';
import { useAppDispatch } from '@src/redux/types';
import SignInRedirect from './SignInRedirect';
import SignUpButton from './SignUpButton';

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
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
            CustomToast('success', t('register.registerSuccess'));
          } catch (e) {
            CustomToast('error', t('register.registerError'));
          }
        }}>
        {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => (
          <>
            <Input
              style={styles.inputField}
              leftIcon={<Icon name="email" size={30} />}
              placeholder={t('register.button.placeholder.email')}
              keyboardType="email-address"
              onBlur={handleBlur('email')}
              onChangeText={handleChange('email')}
              value={values.email}
              errorMessage={touched.email ? errors.email : ''}
            />

            <Input
              style={styles.inputField}
              leftIcon={<Icon name="lock" size={30} />}
              secureTextEntry={true}
              placeholder={t('register.button.placeholder.password')}
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
              value={values.password}
              errorMessage={touched.password ? errors.password : ''}
            />
            <Input
              style={styles.inputField}
              leftIcon={<Icon name="lock" size={30} />}
              secureTextEntry={true}
              placeholder={t('register.button.placeholder.repeatPassword')}
              onBlur={handleBlur('repeatPassword')}
              onChangeText={handleChange('repeatPassword')}
              value={values.repeatPassword}
              errorMessage={touched.repeatPassword ? errors.repeatPassword : ''}
            />
            <View style={styles.signUpContainer}>
              <SignUpButton onSubmit={handleSubmit} />
              <SignInRedirect />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    maxWidth: '80%',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputField: {
    fontSize: 16,
    fontWeight: '700',
  },
  signUpContainer: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
