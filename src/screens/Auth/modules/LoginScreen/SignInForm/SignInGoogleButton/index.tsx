import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { useStyles } from './styles';

const SignInGoogleButton = () => {
  const styles = useStyles();
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
