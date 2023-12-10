import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { BackButtonProps } from './types';
import { StyleSheet } from 'react-native';

const BackButton = ({ onClose }: BackButtonProps) => {
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
