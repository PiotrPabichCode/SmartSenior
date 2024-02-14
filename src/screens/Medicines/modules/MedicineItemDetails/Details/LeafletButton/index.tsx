import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';
import { onPress } from './utils';
import { Button } from '@src/components/shared';

type LeafletButtonProps = {
  url: string;
  name: string;
};

const LeafletButton = ({ url, name }: LeafletButtonProps) => {
  return (
    <Button
      title={t('medicineItem.leaflet')}
      containerStyle={styles.container}
      buttonStyle={styles.button}
      onPress={() => onPress(name, url)}
    />
  );
};

export default LeafletButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: 'darkblue',
  },
});
