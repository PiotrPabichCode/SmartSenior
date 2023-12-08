import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    viewStyle: {
      flex: 1,
      alignItems: 'center',
    },
    headerText: {
      marginTop: 50,
      fontSize: 48,
      fontWeight: 'bold',
    },
    welcomeText: {
      marginTop: 10,
      fontSize: 32,
      fontWeight: '500',
      textAlign: 'center',
      color: 'black',
    },
    welcomeText2: {
      marginTop: 5,
      fontSize: 16,
      textAlign: 'center',
      color: 'black',
    },
  });
};
