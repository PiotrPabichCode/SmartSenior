import { Text, useTheme } from '@rneui/themed';
import {
  ColorValue,
  StyleSheet,
  TouchableOpacity,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

type CustomButtonProps = {
  icon: React.JSX.Element;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  color?: ColorValue;
  backgroundColor?: ColorValue;
  onPress?: () => void;
};

const CustomButton = ({
  icon,
  title,
  titleStyle,
  style,
  backgroundColor,
  onPress,
}: CustomButtonProps) => {
  const theme = useTheme().theme.colors;
  const renderDetails = () => {
    return (
      <>
        <View style={styles.iconStyle}>{icon}</View>
        <Text
          style={[styles.title, titleStyle, { color: theme.text }]}
          numberOfLines={1}
          adjustsFontSizeToFit={true}>
          {title}
        </Text>
      </>
    );
  };
  const bg = backgroundColor ?? theme.customBtnBackground;
  return !onPress ? (
    <View style={[styles.container, style, { backgroundColor: bg }]}>{renderDetails()}</View>
  ) : (
    <TouchableOpacity onPress={onPress} style={[styles.container, style, { backgroundColor: bg }]}>
      {renderDetails()}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    gap: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 50,
    elevation: 5,
  },
  title: {
    flex: 1,
    color: '#3D0C02',
    fontWeight: 'bold',
    fontSize: 22,
  },
  iconStyle: {
    marginStart: 20,
  },
});
