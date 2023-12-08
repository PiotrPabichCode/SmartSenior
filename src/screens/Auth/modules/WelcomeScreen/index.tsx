import { Text, SafeAreaView } from 'react-native';
import WelcomeSvg from '@assets/welcome-image.svg';
import { t } from '@src/localization/Localization';
import { useAppSelector } from '@src/redux/types';
import { selectAuthStatus } from '@src/redux/auth/auth.slice';
import ActionButtons from './ActionButtons';
import { useStyles } from './styles';

const WelcomeScreen = () => {
  const status = useAppSelector(state => selectAuthStatus(state));
  const styles = useStyles();

  if (status === 'pending') {
    return null;
  }
  return (
    <SafeAreaView style={styles.viewStyle}>
      {/* Image at the top */}
      <Text style={styles.headerText}>{t('appName')}</Text>
      <WelcomeSvg width={300} height={300} />

      {/* Text under the Image */}
      <Text style={styles.welcomeText}>{t('welcome.message1')}</Text>
      <Text style={styles.welcomeText2}>{t('welcome.message2')}</Text>

      <ActionButtons />
    </SafeAreaView>
  );
};

export default WelcomeScreen;
