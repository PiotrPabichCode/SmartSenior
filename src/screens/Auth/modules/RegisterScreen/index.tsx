import WelcomeSvg from '@assets/register-image.svg';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignUpForm from './SignUpForm';

const RegisterScreen = () => {
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 50,
  },
});
