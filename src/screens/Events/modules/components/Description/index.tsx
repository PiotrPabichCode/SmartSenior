import { Input } from '@rneui/themed';
import { t } from '@src/localization/Localization';

type Props = {
  value: string;
  onChange: any;
};

const Description = ({ value, onChange }: Props) => {
  return (
    <Input
      label={t('eventItemScreen.button.label.description')}
      placeholder={t('createEvent.button.placeholder.description')}
      multiline={true}
      onChangeText={onChange('description')}
      value={value}
    />
  );
};

export default Description;