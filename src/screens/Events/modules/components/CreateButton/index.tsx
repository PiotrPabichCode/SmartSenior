import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';
import { Button } from '@src/components/shared';

type Props = {
  onPress: any;
};

const CreateButton = ({ onPress }: Props) => {
  return (
    <Button
      size="lg"
      title={t('createEvent.button.submit')}
      buttonStyle={styles.button}
      onPress={() => onPress()}
    />
  );
};

export default CreateButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
  },
});
