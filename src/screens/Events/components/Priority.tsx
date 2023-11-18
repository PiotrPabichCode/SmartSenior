import CustomDropdown from '@src/components/CustomDropdown';
import { priorities } from '@src/redux/events/events.constants';
import { t } from '@src/localization/Localization';

type Props = {
  onChange: any;
  priority: number;
};

const Priority = ({ onChange, priority }: Props) => {
  return (
    <CustomDropdown
      data={priorities}
      placeholder={t('eventItemScreen.button.placeholder.priority')}
      value={priority}
      handleChange={(e: any) => onChange('priority', e.value)}
    />
  );
};

export default Priority;
