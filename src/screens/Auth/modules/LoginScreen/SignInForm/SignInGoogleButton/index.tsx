import { Button } from '@rneui/themed';
import useThemeColors from '@src/config/useThemeColors';
import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';

const SignInGoogleButton = () => {
  const color = useThemeColors().customBtnBackground;
  return (
    <Button
      title={t('login.google')}
      buttonStyle={styles.button}
      color={color}
      containerStyle={styles.buttonContainer}
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
