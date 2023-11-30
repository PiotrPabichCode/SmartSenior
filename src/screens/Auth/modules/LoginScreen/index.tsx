import { Dimensions } from 'react-native';
import WelcomeSvg from '@assets/welcome-image.svg';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignInForm from './SignInForm';
import { useStyles } from './styles';

const LoginScreen = () => {
  const styles = useStyles();

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <WelcomeSvg
          width={Dimensions.get('screen').width}
          height={Dimensions.get('screen').height * 0.3}
        />
        <SignInForm />
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginScreen;
