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
  });
};
