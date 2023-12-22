import WelcomeSvg from '@assets/register-image.svg';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SignUpForm from './SignUpForm';
import useThemeColors from '@src/config/useThemeColors';

const RegisterScreen = () => {
  const { top } = useSafeAreaInsets();
  const styles = useStyles();
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.container, { paddingTop: top * 1.5 }]}>
      <WelcomeSvg
        width={Dimensions.get('screen').width}
        height={Dimensions.get('screen').height * 0.3}
      />
      <SignUpForm />
    </ScrollView>
  );
};

export default RegisterScreen;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      gap: 20,
      backgroundColor: theme.cardBackground,
    },
  });
