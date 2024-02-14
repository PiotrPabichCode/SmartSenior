import { useState } from 'react';
import CustomColorPicker from '@src/components/ColorPicker';
import { t } from '@src/localization/Localization';
import TagCard from '@src/components/TagCard';
import { SetFieldValueType } from '@src/models';

type ColorPickerProps = {
  name: string;
  color: string;
  fieldName: string;
  onChange: SetFieldValueType;
};

const ColorPicker = ({ color, name, onChange, fieldName }: ColorPickerProps) => {
  const [activeColorPicker, setActiveColorPicker] = useState<boolean>(false);
  return activeColorPicker ? (
    <CustomColorPicker
      onPress={() => setActiveColorPicker(false)}
      onChange={onChange}
      fieldName={fieldName}
      color={color}
    />
  ) : (
    <TagCard
      color={color}
      name={name ? name : t('tags.colorPlaceholder')}
      onPress={() => setActiveColorPicker(true)}
      id=""
    />
  );
};

export default ColorPicker;
