import { View } from 'react-native';
import WheelColorPicker from 'react-native-wheel-color-picker';
import { Button } from '@rneui/themed';
import { useState } from 'react';

const ColorPicker = ({
  onPress,
  setColor,
  color,
}: {
  onPress: () => void;
  setColor: React.Dispatch<React.SetStateAction<string>>;
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
        title={'Zaakceptuj wybrany kolor'}
        color={swatch}
        containerStyle={{ marginVertical: 30 }}
        onPress={() => {
          setColor(swatch);
          onPress();
        }}
      />
    </View>
  );
};

export default ColorPicker;
