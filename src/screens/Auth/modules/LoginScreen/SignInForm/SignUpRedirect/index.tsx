import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { StyleSheet, Text } from 'react-native';

const SignUpRedirect = () => {
  return (
    <Text style={styles.textLinks}>
      {t('login.question')}
      <Text style={styles.textRegister} onPress={() => navigate('SignUp')}>
        {t('login.signUp')}
      </Text>
    </Text>
  );
};

export default SignUpRedirect;

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
