import useThemeColors from '@src/config/useThemeColors';
import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';
import { Button } from '@src/components/shared';
import { useAppDispatch } from '@src/redux/types';
import { signInWithOAuthGoogle } from '@src/redux/auth/auth.actions';

const SignInGoogleButton = () => {
  const color = useThemeColors().customBtnBackground;
  const dispatch = useAppDispatch();
  return (
    <Button
      title={t('login.google')}
      buttonStyle={styles.button}
      color={color}
      containerStyle={styles.buttonContainer}
      onPress={() => dispatch(signInWithOAuthGoogle())}
    />
  );
};

export default SignInGoogleButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
