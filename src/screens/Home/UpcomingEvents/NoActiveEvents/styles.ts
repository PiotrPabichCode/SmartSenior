import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    title: {
      fontSize: 17,
      textAlign: 'center',
      marginVertical: 10,
      maxWidth: '90%',
      letterSpacing: 0.5,
    },
    button: {
      backgroundColor: 'black',
      gap: 20,
      padding: 10,
    },
    buttonContainer: {
      borderRadius: 25,
      backgroundColor: 'black',
      elevation: 5,
      marginVertical: 10,
    },
  });
};
