import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      flexGrow: 1,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
    },
  });
};
