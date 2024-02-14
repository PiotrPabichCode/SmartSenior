import { Input } from '@rneui/themed';
import { t } from '@src/localization/Localization';

type DescriptionProps = {
  value: string;
  onChange: (text: string) => void;
};

const Description = ({ value, onChange }: DescriptionProps) => {
  return (
    <Input
      label={t('eventItemScreen.button.label.description')}
      placeholder={t('createEvent.button.placeholder.description')}
      multiline={true}
      onChangeText={e => {
        console.log(e);
        onChange('description');
      }}
      value={value}
    />
  );
};

export default Description;
