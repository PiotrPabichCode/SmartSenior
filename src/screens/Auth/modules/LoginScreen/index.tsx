import { Dimensions, StyleSheet, ScrollView } from 'react-native';
import WelcomeSvg from '@assets/welcome-image.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SignInForm from './SignInForm';

const LoginScreen = () => {
  const { top } = useSafeAreaInsets();
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.container, { paddingTop: top * 1.5 }]}>
      <WelcomeSvg
        width={Dimensions.get('screen').width}
        height={Dimensions.get('screen').height * 0.3}
      />
      <SignInForm />
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 20,
  },
});
