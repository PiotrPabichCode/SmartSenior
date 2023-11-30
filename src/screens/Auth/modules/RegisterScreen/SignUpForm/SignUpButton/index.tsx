import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { SignUpButtonProps } from './types';
import { useStyles } from './styles';

const SignUpButton = ({ onSubmit }: SignUpButtonProps) => {
  const styles = useStyles();
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
