import { View } from 'react-native';
import WheelColorPicker from 'react-native-wheel-color-picker';
import { Button } from '@rneui/themed';
import { useState } from 'react';
import { t } from '@src/localization/Localization';

const ColorPicker = ({
  onPress,
  onChange,
  fieldName,
  color,
}: {
  onPress: () => void;
  onChange: any;
  fieldName: string;
  color: string;
}) => {
  const [swatch, setSwatch] = useState(color);
  return (
    <View style={{ height: 350, gap: 30, backgroundColor: 'white' }}>
      <WheelColorPicker
        color={swatch}
        onColorChange={(color: any) => {
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
        color={swatch}
        containerStyle={{ marginVertical: 30 }}
        onPress={() => {
          onChange(fieldName, swatch);
          onPress();
        }}
      />
    </View>
  );
};

export default ColorPicker;
