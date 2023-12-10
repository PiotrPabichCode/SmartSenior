import MultiSelectDropdown from '@src/components/MultiSelectDropdown';
import { t } from '@src/localization/Localization';

export type SearchTitle = {
  label: string;
  value: string;
};

type Props = {
  data: Array<SearchTitle>;
  selectedValues: Array<string>;
  fieldName: string;
  onChange: any;
};

const TitlesPicker = ({ data, selectedValues, fieldName, onChange }: Props) => {
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
