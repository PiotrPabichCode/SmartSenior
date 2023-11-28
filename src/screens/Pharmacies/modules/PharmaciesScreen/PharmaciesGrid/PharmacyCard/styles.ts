import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    view: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: 60,
      padding: 5,
    },
    name: {
      width: 150,
    },
    button: {
      backgroundColor: 'rgba(78, 116, 289, 1)',
      borderRadius: 25,
    },
    buttonTitle: {
      fontSize: 10,
    },
  });
};
