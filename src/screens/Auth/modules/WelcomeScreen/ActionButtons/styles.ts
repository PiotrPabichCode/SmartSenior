import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
    },
    buttonContainerStyle: {
      margin: 10,
    },
    buttonSignUpStyle: {
      backgroundColor: 'rgba(39, 39, 39, 1)',
      borderRadius: 5,
    },
    buttonSignUpTitleStyle: {
      fontSize: 20,
      color: 'white',
    },
    buttonSignInStyle: {
      backgroundColor: 'blue',
      marginBottom: 10,
      borderRadius: 5,
    },
    buttonSignInTitleStyle: {
      fontSize: 20,
      color: 'white',
    },
  });
};
