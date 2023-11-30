import { StyleSheet } from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    logout: {
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'flex-end',
      borderRadius: 25,
      gap: 10,
      margin: 5,
      borderWidth: 1,
      elevation: 5,
      backgroundColor: 'darkblue',
    },
    logoutTitle: {
      color: 'white',
      fontWeight: '500',
    },
  });
};
