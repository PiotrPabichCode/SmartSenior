import { SetFieldValueType } from '@src/models';

export interface FormInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: SetFieldValueType;
}
