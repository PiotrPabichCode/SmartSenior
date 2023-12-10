import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';

const SignInGoogleButton = () => {
  return (
    <Button
      title={t('login.google')}
      buttonStyle={styles.buttonAuthGoogle}
      containerStyle={styles.buttonContainer}
      titleStyle={styles.buttonAuthGoogleTitle}
    />
  );
};

export default SignInGoogleButton;

const styles = StyleSheet.create({
  buttonAuthGoogle: {
    backgroundColor: 'blue',
  },
  buttonAuthGoogleTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  buttonContainer: {
    marginTop: 10,
    alignSelf: 'stretch',
    borderRadius: 5,
    marginHorizontal: 20,
    backgroundColor: 'blue',
  },
});
