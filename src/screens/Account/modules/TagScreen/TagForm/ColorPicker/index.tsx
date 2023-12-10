import { useState } from 'react';
import CustomColorPicker from '@src/components/ColorPicker';
import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { ColorPickerProps } from './types';
import { StyleSheet } from 'react-native';

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
      containerStyle={styles.buttonContainer}
    />
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  buttonContainer: {
    minWidth: '100%',
    borderRadius: 25,
  },
});
