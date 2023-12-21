import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { StyleSheet } from 'react-native';
import useThemeColors from '@src/config/useThemeColors';
import { Text } from '@rneui/themed';

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
