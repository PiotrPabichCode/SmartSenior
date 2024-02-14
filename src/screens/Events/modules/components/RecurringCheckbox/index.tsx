import { Timestamp } from 'firebase/firestore';
import { CheckBox } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { SetFieldValueType } from '@src/models';

type RecurringCheckboxProps = {
  checked: boolean;
  date: Timestamp | null;
  onChange: SetFieldValueType;
};

const RecurringCheckbox = ({ checked, date, onChange }: RecurringCheckboxProps) => {
  return (
    <CheckBox
      title={t('createEvent.button.title.cyclic')}
      checked={checked}
      onPress={() => {
        if (!date) {
          const now = Timestamp.now();
          onChange('date', now);
          console.log(now);
          onChange('frequency.daysOfWeek', [now.toDate().getDay()]);
        }
        onChange('frequency.recurring', !checked);
      }}
    />
  );
};

export default RecurringCheckbox;
