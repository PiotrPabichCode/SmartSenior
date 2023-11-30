import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    buttonSignUp: {
      backgroundColor: 'black',
    },
    buttonSignUpTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: 'white',
    },
    buttonContainer: {
      marginTop: 5,
      alignSelf: 'stretch',
      borderRadius: 5,
      marginHorizontal: 10,
    },
  });
};
