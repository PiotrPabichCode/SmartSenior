import { useState } from 'react';
import CustomColorPicker from '@src/components/ColorPicker';
import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { ColorPickerProps } from './types';
import { useStyles } from './styles';

const ColorPicker = ({ color, name, onChange, fieldName }: ColorPickerProps) => {
  const [activeColorPicker, setActiveColorPicker] = useState<boolean>(false);
  const styles = useStyles();
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
      containerStyle={styles.buttonContainer}
    />
  );
};

export default ColorPicker;
