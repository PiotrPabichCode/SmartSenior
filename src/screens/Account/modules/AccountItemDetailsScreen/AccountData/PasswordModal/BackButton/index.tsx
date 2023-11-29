import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { BackButtonProps } from './types';
import { useStyles } from './styles';

const BackButton = ({ onClose }: BackButtonProps) => {
  const styles = useStyles();
  return (
    <Button
      title={t('account.back')}
      containerStyle={styles.container}
      buttonStyle={styles.button}
      onPress={() => {
        onClose(false);
      }}
    />
  );
};

export default BackButton;
