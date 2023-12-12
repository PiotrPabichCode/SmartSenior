import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';

const SignInGoogleButton = () => {
  return (
    <Button
      title={t('login.google')}
      buttonStyle={styles.button}
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
