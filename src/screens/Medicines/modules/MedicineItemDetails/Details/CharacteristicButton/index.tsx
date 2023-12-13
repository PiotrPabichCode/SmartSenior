import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';
import { onPress } from './utils';

type Props = {
  url: string;
  name: string;
};

const CharacteristicButton = ({ url, name }: Props) => {
  return (
    <Button
      size="lg"
      title={t('medicineItem.characteristic')}
      containerStyle={styles.container}
      buttonStyle={styles.button}
      onPress={() => onPress(name, url)}
    />
  );
};

export default CharacteristicButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: 'green',
  },
});
