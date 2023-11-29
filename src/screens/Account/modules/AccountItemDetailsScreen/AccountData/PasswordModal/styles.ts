import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      minHeight: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    innerContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
    },
  });
};
