import { Input } from '@rneui/themed';

type Props = {
  label: string;
  placeholder: string | null;
  fieldName: string;
  value: string | null;
  onChange: any;
};

const AccountDataInput = ({ label, placeholder, fieldName, value, onChange }: Props) => {
  return (
    <Input
      placeholder={placeholder || ''}
      value={value || ''}
      labelStyle={{ alignSelf: 'center', fontSize: 20 }}
      containerStyle={{ minWidth: '95%' }}
      inputStyle={{ marginLeft: 20 }}
      label={label}
      leftIcon={{ type: 'font-awesome', name: 'comment' }}
      onChangeText={value => onChange(fieldName, value)}
    />
  );
};

export default AccountDataInput;
