import { Text } from '@rneui/themed';
import useThemeColors from '@src/config/useThemeColors';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { StyleSheet } from 'react-native';

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

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    textLinks: {
      margin: 15,
      fontSize: 14,
      fontWeight: '600',
    },
    textRegister: {
      color: theme.primary,
    },
  });
