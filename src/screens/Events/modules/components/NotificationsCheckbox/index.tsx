import { CheckBox } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { SetFieldValueType } from '@src/models';

type NotificationsCheckboxProps = {
  checked: boolean;
  onPress: SetFieldValueType;
};

const NotificationsCheckbox = ({ checked, onPress }: NotificationsCheckboxProps) => {
  return (
    <CheckBox
      title={t('createEvent.button.title.notification')}
      checked={checked}
      onPress={() => onPress('notifications.enable', !checked)}
    />
  );
};

export default NotificationsCheckbox;
