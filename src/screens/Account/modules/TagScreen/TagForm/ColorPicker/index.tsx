import { useState } from 'react';
import CustomColorPicker from '@src/components/ColorPicker';
import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';

type ColorPickerProps = {
  name: string;
  color: string;
  fieldName: string;
  onChange: any;
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
    <Button
      color={color}
      onPress={() => setActiveColorPicker(true)}
      title={name ? name : t('tags.colorPlaceholder')}
    />
  );
};

export default ColorPicker;
