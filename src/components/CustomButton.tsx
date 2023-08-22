import { Button } from '@rneui/themed';
import { ColorValue, StyleSheet } from 'react-native';

interface ButtonProps {
  icon: any;
  title: string;
  backgroundColor: ColorValue;
  onPress?: () => void;
}

const CustomButton = (props: ButtonProps) => {
  const styles = StyleSheet.create({
    buttonContainer: {
      padding: 10,
    },
    buttonStyle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderRadius: 20,
      backgroundColor: props.backgroundColor,
    },
    titleStyle: {
      color: 'white',
      fontSize: 30,
    },
    iconStyle: {
      width: 50,
      height: 50,
    },
  });

  return (
    <Button
      title={props.title}
      titleStyle={styles.titleStyle}
      icon={props.icon}
      iconContainerStyle={styles.iconStyle}
      containerStyle={styles.buttonContainer}
      buttonStyle={styles.buttonStyle}
      onPress={props.onPress}
    />
  );
};

export default CustomButton;
