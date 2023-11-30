import { Text } from 'react-native';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { useStyles } from './styles';

const SignInRedirect = () => {
  const styles = useStyles();
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
