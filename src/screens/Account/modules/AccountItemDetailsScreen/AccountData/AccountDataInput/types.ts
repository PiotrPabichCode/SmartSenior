export interface AccountDataInputProps {
  label: string;
  placeholder: string | null;
  fieldName: string;
  value: string | null;
  onChange: () => void;
  iconName: string;
  errorMessage?: string;
}
