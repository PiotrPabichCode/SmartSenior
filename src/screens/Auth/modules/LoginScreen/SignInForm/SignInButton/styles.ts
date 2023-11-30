import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    buttonContainer: {
      marginTop: 10,
      alignSelf: 'stretch',
      borderRadius: 5,
      marginHorizontal: 20,
      backgroundColor: 'blue',
    },
    buttonSignIn: {
      backgroundColor: 'black',
    },
    buttonSignInTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: 'white',
    },
  });
};
