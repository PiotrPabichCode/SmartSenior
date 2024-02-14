import CustomDropdown from '@src/components/CustomDropdown';
import { priorities } from '@src/redux/events/events.constants';
import { t } from '@src/localization/Localization';
import { SetFieldValueType } from '@src/models';

type PriorityProps = {
  onChange: SetFieldValueType;
  fieldName: string;
  priority: number;
};

const Priority = ({ onChange, fieldName, priority }: PriorityProps) => {
  return (
    <CustomDropdown
      data={priorities}
      placeholder={t('eventItemScreen.button.placeholder.priority')}
      value={priority}
      handleChange={e => onChange(fieldName, e.value)}
    />
  );
};

export default Priority;
