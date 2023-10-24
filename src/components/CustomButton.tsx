import {
  ColorValue,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface ButtonProps {
  icon: any;
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  color: ColorValue;
  backgroundColor?: ColorValue;
  onPress?: () => void;
}

const CustomButton = ({
  icon,
  title,
  titleStyle,
  style,
  color,
  backgroundColor,
  onPress,
}: ButtonProps) => {
  const renderDetails = () => {
    return (
      <>
        <View style={styles.iconStyle}>{icon}</View>
        <Text style={[styles.title, titleStyle, { color }]} numberOfLines={1}>
          {title}
        </Text>
      </>
    );
  };
  const bg = backgroundColor;
  return !onPress ? (
    <View style={[styles.container, style, { backgroundColor }]}>{renderDetails()}</View>
  ) : (
    <TouchableOpacity onPress={onPress} style={[styles.container, style, { backgroundColor }]}>
      {renderDetails()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
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

export default CustomButton;
