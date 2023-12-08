import { Timestamp } from 'firebase/firestore';
import { CheckBox } from '@rneui/themed';
import { t } from '@src/localization/Localization';

type Props = {
  checked: boolean;
  date: Timestamp | null;
  onChange: any;
};

const RecurringCheckbox = ({ checked, date, onChange }: Props) => {
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
