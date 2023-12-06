import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    title: {
      textAlign: 'center',
      fontSize: 24,
    },
    descriptionContainer: {
      flexGrow: 1,
    },
    descriptionLabel: {
      textAlign: 'center',
      fontSize: 24,
    },
    updateButton: {
      backgroundColor: 'blue',
    },
    updateButtonContainer: {
      minWidth: '95%',
      borderRadius: 25,
    },
  });
};
