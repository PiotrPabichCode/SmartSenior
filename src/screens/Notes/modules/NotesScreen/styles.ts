import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      minHeight: '100%',
      backgroundColor: 'white',
      alignItems: 'center',
      gap: 10,
    },
    titleAndElementsPerLine: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
    },
    title: {
      flex: 1,
      textAlign: 'center',
    },
    sortContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
    },
    sortSingleItemContainer: {
      flex: 1,
      alignItems: 'center',
      gap: 10,
    },
    boldedText: {
      fontWeight: 'bold',
      fontSize: 15,
    },
  });
};
