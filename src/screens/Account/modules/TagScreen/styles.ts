import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      minHeight: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    innerContainer: {
      width: '90%',
      elevation: 5,
      gap: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 25,
    },
  });
};
