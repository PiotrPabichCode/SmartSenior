import { Timestamp } from 'firebase/firestore';
import { RecurringValues, getReccuringTimes } from '@src/redux/events/events.constants';
import CustomDropdown from '@src/components/CustomDropdown';
import { t } from '@src/localization/Localization';

type Props = {
  isRecurring: boolean;
  type: 'custom' | 'specificDays' | null;
  startDate: Timestamp | null;
  endDate: Timestamp | null;
  value: RecurringValues | null;
  onValueChange: any;
  onChange: any;
};

const CustomRecurring = ({
  isRecurring,
  type,
  startDate,
  endDate,
  value,
  onValueChange,
  onChange,
}: Props) => {
  return (
    isRecurring &&
    startDate &&
    endDate &&
    type === 'custom' && (
      <CustomDropdown
        data={getReccuringTimes(startDate, endDate)}
        placeholder={t('createEvent.button.placeholder.customRecurring')}
        value={value}
        handleChange={(e: any) => {
          const type = e.value;
          onValueChange(type);
          if (type === RecurringValues.EVERYDAY) {
            onChange('frequency.unit', 'day');
            onChange('frequency.interval', 1);
          } else if (type === RecurringValues.EVERY_2_DAYS) {
            onChange('frequency.unit', 'day');
            onChange('frequency.interval', 2);
          } else if (type === RecurringValues.EVERY_WEEK) {
            onChange('frequency.unit', 'week');
            onChange('frequency.interval', 1);
          } else if (type === RecurringValues.EVERY_MONTH) {
            onChange('frequency.unit', 'month');
            onChange('frequency.interval', 1);
          } else if (type === RecurringValues.EVERY_3_MONTHS) {
            onChange('frequency.unit', 'month');
            onChange('frequency.interval', 3);
          } else if (type === RecurringValues.EVERY_6_MONTHS) {
            onChange('frequency.unit', 'month');
            onChange('frequency.interval', 6);
          } else if (type === RecurringValues.EVERY_YEAR) {
            onChange('frequency.unit', 'month');
            onChange('frequency.interval', 12);
          }
        }}
      />
    )
  );
};

export default CustomRecurring;
