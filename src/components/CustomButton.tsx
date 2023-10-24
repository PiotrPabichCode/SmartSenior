import { ColorValue, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

interface ButtonProps {
  icon: any;
  title: string;
  color: ColorValue;
  backgroundColor: ColorValue;
  onPress?: () => void;
}

const CustomButton = ({ icon, title, color, backgroundColor, onPress }: ButtonProps) => {
  const bg = backgroundColor;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, { backgroundColor }]}>
      <View style={styles.iconStyle}>{icon}</View>
      <Text style={[styles.title, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 50,
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
