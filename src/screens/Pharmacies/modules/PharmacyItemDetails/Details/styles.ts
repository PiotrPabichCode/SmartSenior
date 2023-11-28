import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    divider: {
      width: '100%',
      marginVertical: 10,
      backgroundColor: 'black',
      height: 1,
    },
    title: { fontSize: 22, fontWeight: '500' },
    detail: {
      fontSize: 16,
      fontWeight: '400',
      textAlign: 'center',
    },
  });
};
