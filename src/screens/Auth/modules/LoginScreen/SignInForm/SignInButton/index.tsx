import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { SignInButtonProps } from './types';
import { StyleSheet } from 'react-native';

const SignInButton = ({ onSubmit }: SignInButtonProps) => {
  return (
    <Button
      title={t('login.button.submit')}
      buttonStyle={styles.buttonSignIn}
      containerStyle={styles.buttonContainer}
      titleStyle={styles.buttonSignInTitle}
      onPress={() => onSubmit()}
    />
  );
};

export default SignInButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    alignSelf: 'stretch',
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: 'blue',
  },
  buttonSignIn: {
    backgroundColor: 'black',
  },
  buttonSignInTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
});
