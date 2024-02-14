import { Input } from '@rneui/themed';
import { Icons } from '@src/components';
import { SetFieldValueType } from '@src/models/FormikHelpers';

type AccountDataInputProps = {
  label: string;
  placeholder: string | null;
  fieldName: string;
  value: string | null;
  onChange: SetFieldValueType;
  iconName: string;
  errorMessage?: string;
};

const AccountDataInput = ({
  label,
  placeholder,
  fieldName,
  value,
  onChange,
  iconName,
  errorMessage,
}: AccountDataInputProps) => {
  return (
    <Input
      placeholder={placeholder || ''}
      value={value || ''}
      label={label}
      leftIcon={<Icons name={iconName} />}
      errorMessage={errorMessage}
      onChangeText={value => onChange(fieldName, value)}
    />
  );
};

export default AccountDataInput;
