import { Dimensions, StyleSheet } from 'react-native';
import WelcomeSvg from '@assets/welcome-image.svg';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignInForm from './SignInForm';

const LoginScreen = () => {
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});
