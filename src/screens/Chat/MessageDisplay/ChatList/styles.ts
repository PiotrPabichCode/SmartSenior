import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      borderBottomColor: 'black',
      borderBottomWidth: 0.8,
      paddingVertical: 10,
    },
    innerContainer: {
      minWidth: '100%',
      height: 60,
      gap: 10,
      padding: 5,
    },
  });
};
