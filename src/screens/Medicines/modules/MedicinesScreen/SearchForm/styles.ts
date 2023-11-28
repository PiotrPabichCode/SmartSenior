import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    buttonSearchContainer: {
      width: '90%',
      borderRadius: 25,
    },
    buttonSearchStyle: {
      backgroundColor: 'blue',
    },
    title: {
      marginTop: 10,
      fontSize: 26,
      fontWeight: 'bold',
    },
  });
};
