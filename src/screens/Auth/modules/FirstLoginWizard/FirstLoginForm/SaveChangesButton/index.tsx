import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';

type Props = {
  onSubmit: () => void;
};

const SaveChangesButton = ({ onSubmit }: Props) => {
  return (
    <Button
      title={t('firstLoginWizard.button.submit')}
      buttonStyle={styles.button}
      onPress={() => onSubmit()}
    />
  );
};

export default SaveChangesButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
    paddingVertical: 15,
  },
});
