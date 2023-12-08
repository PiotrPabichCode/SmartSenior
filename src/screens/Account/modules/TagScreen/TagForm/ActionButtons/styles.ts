import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 10,
      minWidth: '100%',
    },
    buttonContainer: {
      flex: 1,
    },
  });
};
