import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';
import { Button } from '@src/components/shared';
import useThemeColors from '@src/config/useThemeColors';

type SignUpButtonProps = {
  onSubmit: () => void;
};

const SignUpButton = ({ onSubmit }: SignUpButtonProps) => {
  const styles = useStyles();
  return (
    <Button
      title={t('register.button.submit')}
      buttonStyle={styles.button}
      onPress={() => onSubmit()}
    />
  );
};

export default SignUpButton;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.dark,
      paddingVertical: 15,
    },
  });
