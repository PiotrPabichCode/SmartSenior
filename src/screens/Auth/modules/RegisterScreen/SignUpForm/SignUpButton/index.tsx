import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';

type Props = {
  onSubmit: () => void;
};

const SignUpButton = ({ onSubmit }: Props) => {
  return (
    <Button
      title={t('register.button.submit')}
      buttonStyle={styles.button}
      onPress={() => onSubmit()}
    />
  );
};

export default SignUpButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
  },
});
