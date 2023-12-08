import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    divider: {
      height: 1,
      backgroundColor: 'black',
      width: '100%',
    },
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      gap: 5,
    },
    detailsContainer: {
      flexGrow: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
};
