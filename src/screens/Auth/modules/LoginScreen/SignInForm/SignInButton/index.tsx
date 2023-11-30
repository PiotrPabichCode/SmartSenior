import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { SignInButtonProps } from './types';
import { useStyles } from './styles';

const SignInButton = ({ onSubmit }: SignInButtonProps) => {
  const styles = useStyles();
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
