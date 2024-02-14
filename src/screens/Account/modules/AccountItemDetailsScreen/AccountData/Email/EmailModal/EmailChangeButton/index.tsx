import { t } from '@src/localization/Localization';
import { Button } from '@src/components/shared';

type EmailChangeButtonProps = {
  onPress: () => void;
};

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
