import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    inputField: {
      alignSelf: 'stretch',
      textAlign: 'left',
      fontSize: 16,
      fontWeight: '700',
      marginHorizontal: 20,
    },
    headerText: {
      fontSize: 32,
      fontWeight: 'bold',
    },
  });
};
