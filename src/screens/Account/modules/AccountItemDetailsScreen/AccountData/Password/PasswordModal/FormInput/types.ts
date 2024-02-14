import { SetFieldValueType } from '@src/models';

export interface FormInputProps {
  onChange: SetFieldValueType;
  label: string;
  placeholder: string;
  value: string;
}
