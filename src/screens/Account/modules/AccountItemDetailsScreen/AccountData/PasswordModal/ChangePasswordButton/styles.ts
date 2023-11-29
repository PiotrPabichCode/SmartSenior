import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      borderRadius: 25,
      marginBottom: 15,
    },
    button: {
      padding: 15,
      backgroundColor: 'green',
    },
  });
};
