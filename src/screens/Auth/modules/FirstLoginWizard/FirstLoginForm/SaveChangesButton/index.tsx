import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';
import { Button } from '@src/components/shared';

type SaveChangesButtonProps = {
  onSubmit: () => void;
};

const SaveChangesButton = ({ onSubmit }: SaveChangesButtonProps) => {
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
