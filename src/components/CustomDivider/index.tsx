import useThemeColors from '@src/config/useThemeColors';
import { View } from 'react-native';

const CustomDivider = () => {
  const backgroundColor = useThemeColors().divider;
  return <View style={{ backgroundColor, minWidth: '100%', height: 1.2 }} />;
};

export default CustomDivider;
