import { StyleSheet } from 'react-native';

export const useStyles = () =>
  StyleSheet.create({
    label: { fontSize: 22, fontWeight: '500' },
    container: {
      backgroundColor: 'lightblue',
      flex: 1,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 25,
      borderColor: 'blue',
      borderWidth: 1,
    },
  });
