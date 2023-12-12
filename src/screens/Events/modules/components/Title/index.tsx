import { Input } from '@rneui/themed';
import { t } from '@src/localization/Localization';

type Props = {
  value: string;
  onChange: any;
  disabled?: boolean;
};

const Title = ({ value, onChange, disabled }: Props) => {
  return (
    <Input
      disabled={disabled}
      label={t('eventItemScreen.button.label.title')}
      placeholder={t('eventItemScreen.button.placeholder.title')}
      onChangeText={onChange('title')}
      value={value}
    />
  );
};

export default Title;
