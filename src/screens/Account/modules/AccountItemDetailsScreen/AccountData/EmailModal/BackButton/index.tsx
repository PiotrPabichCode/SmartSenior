import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { BackButtonProps } from './types';

const BackButton = ({ onClose }: BackButtonProps) => {
  return (
    <Button
      title={t('account.back')}
      buttonStyle={{ padding: 15, backgroundColor: 'black' }}
      onPress={() => {
        onClose(false);
      }}
    />
  );
};

export default BackButton;
