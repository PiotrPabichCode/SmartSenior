import Colors from '@src/constants/Colors';
import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    welcomeText: {
      fontSize: 36,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: Colors.black,
    },
  });
};
