import { CheckBox } from '@rneui/themed';
import { t } from '@src/localization/Localization';

type DelayedEventsCheckboxProps = {
  onChange: (_: boolean) => void;
  checked: boolean;
};

const DelayedEventsCheckbox = ({ checked, onChange }: DelayedEventsCheckboxProps) => {
  return (
    <CheckBox
      checked={checked}
      title={t('eventGroups.delayedEventsTitle')}
      onPress={() => onChange(!checked)}
      textStyle={{ fontSize: 11 }}
      containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
    />
  );
};

export default DelayedEventsCheckbox;
