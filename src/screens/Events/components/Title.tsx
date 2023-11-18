import { Input } from '@rneui/themed';
import { t } from '@src/localization/Localization';

type Props = {
  value: string;
  onChange: any;
};

const Title = ({ value, onChange }: Props) => {
  return (
    <Input
      placeholder={t('eventItemScreen.button.placeholder.title')}
      onChangeText={onChange('title')}
      value={value}
    />
  );
};

export default Title;
