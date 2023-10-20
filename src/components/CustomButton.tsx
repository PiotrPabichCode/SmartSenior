import { ColorValue, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import Icons from '@src/components/Icons';

interface ButtonProps {
  icon: any;
  title: string;
  backgroundColor: ColorValue;
  onPress?: () => void;
}

const CustomButton = ({ icon, title, backgroundColor, onPress }: ButtonProps) => {
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
      backgroundColor: backgroundColor,
    },
    title: {
      flex: 1,
      color: 'white',
      fontWeight: '500',
      fontSize: 24,
    },
    iconStyle: {
      marginStart: 20,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.iconStyle}>
        <Icons name={icon} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
