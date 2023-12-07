import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      gap: 20,
    },
    actionContainer: {
      alignItems: 'center',
      borderRadius: 25,
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
      flexDirection: 'row',
      gap: 10,
      minWidth: '100%',
    },
  });
};
