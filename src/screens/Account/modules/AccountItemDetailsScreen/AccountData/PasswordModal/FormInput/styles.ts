import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    label: {
      alignSelf: 'center',
      fontSize: 20,
    },
    container: {
      minWidth: '95%',
    },
    input: {
      marginHorizontal: 10,
    },
  });
};
