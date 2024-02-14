import { Input } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { HandleChangeType } from '@src/models';

type TitleProps = {
  value: string;
  onChange: HandleChangeType;
  disabled?: boolean;
};

const Title = ({ value, onChange, disabled }: TitleProps) => {
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
