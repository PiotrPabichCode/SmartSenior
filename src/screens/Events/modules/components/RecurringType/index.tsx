import { recurringTypes } from '@src/redux/events/events.constants';
import CustomDropdown from '@src/components/CustomDropdown';
import { Timestamp } from 'firebase/firestore';
import { t } from '@src/localization/Localization';
import { SetFieldValueType } from '@src/models';

type RecurringTypeProps = {
  endDate: Timestamp | null;
  value: 'specificDays' | 'custom' | null;
  onChange: SetFieldValueType;
};

const RecurringType = ({ endDate, value, onChange }: RecurringTypeProps) => {
  return (
    endDate && (
      <CustomDropdown
        data={recurringTypes}
        placeholder={t('createEvent.button.placeholder.recurringType')}
        value={value}
        handleChange={e => onChange('frequency.type', e.value)}
      />
    )
  );
};

export default RecurringType;
