import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { BackButtonProps } from './types';

const BackButton = ({ onClose }: BackButtonProps) => {
  return (
    <Button
      title={t('account.back')}
      containerStyle={{ borderRadius: 25 }}
      buttonStyle={{ padding: 15, backgroundColor: 'black' }}
      onPress={() => {
        onClose(false);
      }}
    />
  );
};

export default BackButton;
