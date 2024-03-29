import { StyleSheet, View } from 'react-native';
import WheelColorPicker from 'react-native-wheel-color-picker';
import { Button } from '@src/components/shared';
import { useState } from 'react';
import { t } from '@src/localization/Localization';

const ColorPicker = ({
  onPress,
  onChange,
  fieldName,
  color,
}: {
  onPress: () => void;
  onChange: (fieldName: string, swatch: string) => void;
  fieldName: string;
  color: string;
}) => {
  const [swatch, setSwatch] = useState(color);
  return (
    <View style={styles.container}>
      <WheelColorPicker
        color={swatch}
        onColorChange={color => {
          setSwatch(color);
        }}
        gapSize={10}
        thumbSize={30}
        sliderSize={30}
        swatchesLast
        row={false}
        noSnap={true}
      />
      <Button
        title={t('colorPickerAccept')}
        buttonStyle={{ backgroundColor: swatch }}
        onPress={() => {
          onChange(fieldName, swatch);
          onPress();
        }}
      />
    </View>
  );
};

export default ColorPicker;

const styles = StyleSheet.create({
  container: {
    height: 350,
    gap: 30,
  },
});
