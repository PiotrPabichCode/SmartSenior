import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { SignUpButtonProps } from './types';
import { StyleSheet } from 'react-native';

const SignUpButton = ({ onSubmit }: SignUpButtonProps) => {
  return (
    <Button
      title={t('register.button.submit')}
      buttonStyle={styles.buttonSignUp}
      containerStyle={styles.buttonContainer}
      titleStyle={styles.buttonSignUpTitle}
      onPress={() => onSubmit()}
    />
  );
};

export default SignUpButton;

const styles = StyleSheet.create({
  buttonSignUp: {
    backgroundColor: 'black',
  },
  buttonSignUpTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  buttonContainer: {
    marginTop: 5,
    alignSelf: 'stretch',
    borderRadius: 5,
    marginHorizontal: 10,
  },
});
