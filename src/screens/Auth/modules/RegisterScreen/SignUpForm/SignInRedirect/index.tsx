import { Text } from 'react-native';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { StyleSheet } from 'react-native';

const SignInRedirect = () => {
  return (
    <Text style={styles.textLinks}>
      {t('register.question')}
      <Text style={styles.textRegister} onPress={() => navigate('SignIn')}>
        {t('register.signIn')}
      </Text>
    </Text>
  );
};

export default SignInRedirect;

const styles = StyleSheet.create({
  textLinks: {
    margin: 15,
    fontSize: 14,
    fontWeight: '600',
  },
  textRegister: {
    color: 'blue',
  },
});
