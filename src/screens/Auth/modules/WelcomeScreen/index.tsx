import { SafeAreaView, StyleSheet } from 'react-native';
import WelcomeSvg from '@assets/welcome-image.svg';
import { t } from '@src/localization/Localization';
import { useAppSelector } from '@src/redux/types';
import { selectAuthStatus } from '@src/redux/auth/auth.slice';
import ActionButtons from './ActionButtons';
import { Text } from '@rneui/themed';

const WelcomeScreen = () => {
  const status = useAppSelector(state => selectAuthStatus(state));

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

const styles = StyleSheet.create({
  viewStyle: {
    flexGrow: 1,
    alignItems: 'center',
  },
  headerText: {
    marginTop: 50,
    fontSize: 48,
  },
  welcomeText: {
    marginTop: 10,
    fontSize: 32,
    fontWeight: '500',
    textAlign: 'center',
    color: 'black',
  },
  welcomeText2: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
});
