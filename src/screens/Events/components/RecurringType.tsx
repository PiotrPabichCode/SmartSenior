import { recurringTypes } from '@src/redux/events/events.constants';
import CustomDropdown from '@src/components/CustomDropdown';
import { Timestamp } from 'firebase/firestore';
import { t } from '@src/localization/Localization';

type Props = {
  endDate: Timestamp | null;
  value: 'specificDays' | 'custom' | null;
  onChange: any;
};

const RecurringType = ({ endDate, value, onChange }: Props) => {
  return (
    endDate && (
      <CustomDropdown
        data={recurringTypes}
        placeholder={t('createEvent.button.placeholder.recurringType')}
        value={value}
        handleChange={(e: any) => onChange('frequency.type', e.value)}
      />
    )
  );
};

export default RecurringType;
