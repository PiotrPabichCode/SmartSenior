import MultiSelectDropdown from '@src/components/MultiSelectDropdown';
import { t } from '@src/localization/Localization';
import { SetFieldValueType } from '@src/models';

export type SearchTitle = {
  label: string;
  value: string;
};

type TitlesPickerProps = {
  data: Array<SearchTitle>;
  selectedValues: Array<string>;
  fieldName: string;
  onChange: SetFieldValueType;
};

const TitlesPicker = ({ data, selectedValues, fieldName, onChange }: TitlesPickerProps) => {
  return (
    <MultiSelectDropdown
      data={data}
      onChange={onChange}
      fieldName={fieldName}
      placeholder={t('filterPanel.selectTitle')}
      selectedValues={selectedValues}
    />
  );
};

export default TitlesPicker;
