import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';
import { Button } from '@src/components/shared';

type Props = {
  onClose: (_: boolean) => void;
};

const BackButton = ({ onClose }: Props) => {
  return (
    <Button
      title={t('account.back')}
      buttonStyle={styles.button}
      onPress={() => {
        onClose(false);
      }}
    />
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: 'black',
  },
});
