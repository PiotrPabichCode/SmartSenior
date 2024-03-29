import { CheckBox } from '@rneui/themed';
import { t } from '@src/localization/Localization';

type CompletedEventsCheckboxProps = {
  onChange: (_: boolean) => void;
  checked: boolean;
};

const CompletedEventsCheckbox = ({ checked, onChange }: CompletedEventsCheckboxProps) => {
  return (
    <CheckBox
      checked={checked}
      title={t('eventGroups.completedEventsTitle')}
      onPress={() => onChange(!checked)}
      textStyle={{ fontSize: 11 }}
      containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
    />
  );
};

export default CompletedEventsCheckbox;
