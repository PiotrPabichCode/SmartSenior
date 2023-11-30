import { View, Text } from 'react-native';
import { Formik } from 'formik';
import { RegisterSchema } from './utils';
import { signUp } from '@src/redux/auth/auth.actions';
import { t } from '@src/localization/Localization';
import CustomToast from '@src/components/CustomToast';
import { Icon, Input } from '@rneui/themed';
import { useAppDispatch } from '@src/redux/types';
import { useStyles } from './styles';
import SignInRedirect from './SignInRedirect';
import SignUpButton from './SignUpButton';

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  return (
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
          } catch (e) {
            CustomToast('error', t('register.message.error.signUp'));
          }
        }}>
        {({ values, handleChange, handleSubmit, errors }) => (
          <>
            <Input
              style={styles.inputField}
              underlineColorAndroid="transparent"
              leftIcon={<Icon name="email" size={30} color="black" />}
              placeholder={t('register.button.placeholder.email')}
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              value={values.email}
              errorMessage={errors.email}
            />

            <Input
              style={styles.inputField}
              leftIcon={<Icon name="lock" size={30} color="black" />}
              secureTextEntry={true}
              placeholder={t('register.button.placeholder.password')}
              onChangeText={handleChange('password')}
              value={values.password}
              errorMessage={errors.password}
            />
            <Input
              style={styles.inputField}
              leftIcon={<Icon name="lock" size={30} color="black" />}
              secureTextEntry={true}
              placeholder={t('register.button.placeholder.repeatPassword')}
              onChangeText={handleChange('repeatPassword')}
              value={values.repeatPassword}
              errorMessage={errors.repeatPassword}
            />
            <SignUpButton onSubmit={handleSubmit} />
          </>
        )}
      </Formik>
      <SignInRedirect />
    </View>
  );
};

export default SignUpForm;
