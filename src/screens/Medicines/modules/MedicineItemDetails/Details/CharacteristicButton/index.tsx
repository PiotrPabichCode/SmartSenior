import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';
import { onPress } from './utils';
import { Button } from '@src/components/shared';

type CharacteristicButtonProps = {
  url: string;
  name: string;
};

const CharacteristicButton = ({ url, name }: CharacteristicButtonProps) => {
  return (
    <Button
      title={t('medicineItem.characteristic')}
      buttonStyle={styles.button}
      onPress={() => onPress(name, url)}
    />
  );
};

export default CharacteristicButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
  },
});
