import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';

type Props = {
  onPress: any;
};

const CreateButton = ({ onPress }: Props) => {
  return (
    <Button
      size="lg"
      title={t('createEvent.button.submit')}
      buttonStyle={styles.button}
      containerStyle={styles.container}
      onPress={() => onPress()}
    />
  );
};

export default CreateButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(127, 220, 103, 1)',
  },
  container: {
    minWidth: '95%',
  },
});
