import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';

type Props = {
  onSubmit: () => void;
};

const SignInButton = ({ onSubmit }: Props) => {
  return (
    <Button
      title={t('login.button.submit')}
      buttonStyle={styles.button}
      onPress={() => onSubmit()}
    />
  );
};

export default SignInButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
  },
});
