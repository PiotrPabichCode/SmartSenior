import Colors from '@src/constants/Colors';
import { Theme } from '@src/models';
import { StyleSheet } from 'react-native';

export const useStyles = (theme: Theme) => {
  const currentTheme = Colors[theme];
  return StyleSheet.create({
    viewStyle: {
      minHeight: '100%',
      alignItems: 'center',
      backgroundColor: currentTheme.mainBackground,
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      elevation: 5,
      backgroundColor: Colors.primary,
      padding: 10,
      borderRadius: 25,
      margin: 10,
      gap: 10,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    details: {
      flexGrow: 1,
      alignItems: 'center',
      gap: 20,
    },
    detailText: {
      fontSize: 18,
      fontWeight: '500',
    },
  });
};
