import CustomDropdown from '@src/components/CustomDropdown';
import { times } from '@src/redux/events/events.constants';
import { t } from '@src/localization/Localization';

type Props = {
  enabled: boolean;
  onChange: any;
  timeBefore: number;
};

const Notification = ({ enabled, onChange, timeBefore }: Props) => {
  return (
    enabled && (
      <CustomDropdown
        data={times}
        placeholder={t('createEvent.button.placeholder.notificationTime')}
        value={timeBefore}
        handleChange={(e: any) => onChange('notifications.timeBefore', e.value)}
      />
    )
  );
};

export default Notification;
