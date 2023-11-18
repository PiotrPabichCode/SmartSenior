import { Tags } from '@src/models';
import CustomDropdown from '@src/components/CustomDropdown';
import { t } from '@src/localization/Localization';

type Props = {
  tags: Tags | undefined;
  selectedTags: Tags;
  onChange: any;
};

const TagsPicker = ({ tags, selectedTags, onChange }: Props) => {
  return (
    <CustomDropdown
      data={tags ? tags.filter(tag => !selectedTags.some(v => v.name === tag.name)) : []}
      labelField={'name'}
      valueField={'id'}
      placeholder={t('tags.selectPlaceholder')}
      value={selectedTags}
      handleChange={(e: any) => {
        onChange('tags', [...selectedTags, tags?.find(tag => tag.id === e.id)]);
      }}
    />
  );
};

export default TagsPicker;
