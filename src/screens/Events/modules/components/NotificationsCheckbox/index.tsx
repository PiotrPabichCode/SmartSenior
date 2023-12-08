import { CheckBox } from '@rneui/themed';
import { t } from '@src/localization/Localization';

type Props = {
  checked: boolean;
  onPress: any;
};

const NotificationsCheckbox = ({ checked, onPress }: Props) => {
  return (
    <CheckBox
      title={t('createEvent.button.title.notification')}
      checked={checked}
      onPress={() => onPress('notifications.enable', !checked)}
    />
  );
};

export default NotificationsCheckbox;
