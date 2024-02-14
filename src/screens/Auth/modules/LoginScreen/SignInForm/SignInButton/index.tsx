import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';
import { Button } from '@src/components/shared';
import useThemeColors from '@src/config/useThemeColors';

type SignInButtonProps = {
  onSubmit: () => void;
};

const SignInButton = ({ onSubmit }: SignInButtonProps) => {
  const styles = useStyles();
  return (
    <Button
      title={t('login.button.submit')}
      buttonStyle={styles.button}
      onPress={() => onSubmit()}
    />
  );
};

export default SignInButton;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.dark,
      paddingVertical: 15,
    },
  });
