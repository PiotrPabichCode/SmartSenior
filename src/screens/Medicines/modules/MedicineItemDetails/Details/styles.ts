import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    name: {
      fontSize: 26,
      fontWeight: '600',
      textAlign: 'center',
    },
    title: {
      fontSize: 22,
      fontWeight: '500',
    },
    details: {
      fontSize: 16,
      fontWeight: '400',
      textAlign: 'center',
    },
    divider: {
      width: '100%',
      marginVertical: 10,
      backgroundColor: 'black',
      height: 1,
    },
    buttons: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%',
      padding: 10,
    },
    buttonTitle: {
      fontSize: 16,
      textAlign: 'center',
    },
    buttonContainer: {
      width: 140,
      borderRadius: 10,
    },
    buttonStyle: {
      backgroundColor: 'blue',
    },
  });
};
