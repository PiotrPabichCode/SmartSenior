import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    actionContainer: {
      flexGrow: 1,
      alignItems: 'center',
      borderRadius: 25,
      width: '100%',
      maxHeight: '95%',
      borderWidth: 1,
      padding: 20,
    },
    actionText: {
      fontSize: 14,
      fontWeight: '500',
      textAlign: 'center',
    },
    eventContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
      marginVertical: 10,
    },
    eventTitle: {
      fontSize: 18,
    },
    eventDate: {
      fontSize: 18,
    },
    buttonsContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 10,
    },
  });
};
