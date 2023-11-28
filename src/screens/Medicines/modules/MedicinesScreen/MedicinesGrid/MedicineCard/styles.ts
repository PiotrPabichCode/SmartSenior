import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    viewStyle: {
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
  });
};
