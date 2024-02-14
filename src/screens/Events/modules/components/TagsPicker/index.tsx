import { SetFieldValueType, Tags } from '@src/models';
import CustomDropdown from '@src/components/CustomDropdown';
import { t } from '@src/localization/Localization';

type TagsPickerProps = {
  tags: Tags | undefined;
  selectedTags: Tags;
  fieldName: string;
  onChange: SetFieldValueType;
};

const TagsPicker = ({ tags, selectedTags, fieldName, onChange }: TagsPickerProps) => {
  const filteredTags = tags ? tags.filter(tag => !selectedTags.some(v => v.name === tag.name)) : [];
  if (filteredTags.length === 0) {
    return null;
  }
  return (
    <CustomDropdown
      data={filteredTags}
      labelField={'name'}
      valueField={'id'}
      placeholder={t('tags.selectPlaceholder')}
      value={selectedTags}
      handleChange={e => {
        onChange(fieldName, [...selectedTags, tags?.find(tag => tag.id === e.id)]);
      }}
    />
  );
};

export default TagsPicker;
