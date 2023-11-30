import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    formContainer: {
      padding: 8,
      margin: 8,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    headerText: {
      fontSize: 30,
      maxWidth: '80%',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    inputField: {
      alignSelf: 'stretch',
      textAlign: 'left',
      fontSize: 16,
      fontWeight: '700',
    },
  });
};
