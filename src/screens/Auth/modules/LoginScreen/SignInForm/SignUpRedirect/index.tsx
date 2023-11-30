import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { Text } from 'react-native';
import { useStyles } from './styles';

const SignUpRedirect = () => {
  const styles = useStyles();
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
