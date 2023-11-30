import WelcomeSvg from '@assets/register-image.svg';
import { Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignUpForm from './SignUpForm';
import { useStyles } from './styles';

const RegisterScreen = () => {
  const styles = useStyles();
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <WelcomeSvg
          width={Dimensions.get('screen').width}
          height={Dimensions.get('screen').height * 0.3}
        />
        <SignUpForm />
      </SafeAreaView>
    </ScrollView>
  );
};

export default RegisterScreen;
