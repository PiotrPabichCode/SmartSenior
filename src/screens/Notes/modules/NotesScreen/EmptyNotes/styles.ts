import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      letterSpacing: 0.2,
      maxWidth: '70%',
      marginBottom: 10,
    },
    button: {
      gap: 40,
    },
    buttonTitle: {
      fontSize: 18,
    },
  });
};
