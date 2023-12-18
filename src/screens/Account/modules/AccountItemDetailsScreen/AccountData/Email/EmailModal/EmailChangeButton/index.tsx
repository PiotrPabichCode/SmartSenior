import { t } from '@src/localization/Localization';
import { EmailChangeButtonProps } from './types';
import { Button } from '@src/components/shared';

const EmailChangeButton = ({ onPress }: EmailChangeButtonProps) => {
  return (
    <Button
      title={t('account.title.emailChange')}
      containerStyle={{ marginBottom: 15 }}
      buttonStyle={{ padding: 15, backgroundColor: 'green' }}
      onPress={onPress}
    />
  );
};

export default EmailChangeButton;
