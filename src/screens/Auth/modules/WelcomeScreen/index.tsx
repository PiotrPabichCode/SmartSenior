import { SafeAreaView, StyleSheet } from 'react-native';
import WelcomeSvg from '@assets/welcome-image.svg';
import { t } from '@src/localization/Localization';
import { useAppSelector } from '@src/redux/types';
import { selectAuthStatus } from '@src/redux/auth/auth.slice';
import ActionButtons from './ActionButtons';
import { Text } from '@rneui/themed';
import useThemeColors from '@src/config/useThemeColors';

const WelcomeScreen = () => {
  const status = useAppSelector(state => selectAuthStatus(state));
  const styles = useStyles();

  if (status === 'pending') {
    return null;
  }
  return (
    <SafeAreaView style={styles.viewStyle}>
      {/* Image at the top */}
      <Text h1 h1Style={styles.headerText}>
        {t('appName')}
      </Text>
      <WelcomeSvg width={300} height={300} />

      {/* Text under the Image */}
      <Text style={styles.welcomeText}>{t('welcome.message1')}</Text>
      <Text style={styles.welcomeText2}>{t('welcome.message2')}</Text>

      <ActionButtons />
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    viewStyle: {
      flexGrow: 1,
      alignItems: 'center',
      backgroundColor: theme.cardBackground,
    },
    headerText: {
      marginTop: 50,
      fontSize: 48,
      color: theme.text,
    },
    welcomeText: {
      marginTop: 10,
      fontSize: 32,
      fontWeight: '500',
      textAlign: 'center',
      color: theme.text,
    },
    welcomeText2: {
      marginTop: 5,
      fontSize: 16,
      textAlign: 'center',
      color: theme.text,
    },
  });
