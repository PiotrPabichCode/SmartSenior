import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';
import { onPress } from './utils';
import { Button } from '@src/components/shared';

type Props = {
  url: string;
  name: string;
};

const CharacteristicButton = ({ url, name }: Props) => {
  return (
    <Button
      size="lg"
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
