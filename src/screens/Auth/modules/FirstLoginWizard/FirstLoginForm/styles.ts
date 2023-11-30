import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    view: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    innerContainer: {
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      margin: 10,
      borderRadius: 25,
      gap: 20,
      elevation: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: '500',
    },
    submit: {
      backgroundColor: '#121212',
      padding: 15,
      borderRadius: 25,
      color: 'white',
      alignSelf: 'stretch',
      paddingHorizontal: 40,
      fontSize: 16,
    },
  });
};
