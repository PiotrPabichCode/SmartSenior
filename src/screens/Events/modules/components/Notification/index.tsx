import CustomDropdown from '@src/components/CustomDropdown';
import { times } from '@src/redux/events/events.constants';
import { t } from '@src/localization/Localization';
import { SetFieldValueType } from '@src/models';

type NotificationProps = {
  enabled: boolean;
  onChange: SetFieldValueType;
  timeBefore: number;
};

const Notification = ({ enabled, onChange, timeBefore }: NotificationProps) => {
  return (
    enabled && (
      <CustomDropdown
        data={times}
        placeholder={t('createEvent.button.placeholder.notificationTime')}
        value={timeBefore}
        handleChange={e => onChange('notifications.timeBefore', e.value)}
      />
    )
  );
};

export default Notification;
