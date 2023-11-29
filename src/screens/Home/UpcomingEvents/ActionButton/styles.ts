import Colors from '@src/constants/Colors';
import { Theme } from '@src/models';
import { StyleSheet } from 'react-native';

export const useStyles = (theme: Theme) => {
  const currentTheme = Colors[theme];
  return StyleSheet.create({
    actionButtonStyle: {
      backgroundColor: currentTheme.upcomingEventsActionBtn,
    },
    actionButtonContainerStyle: {
      minWidth: '90%',
      borderRadius: 25,
      marginBottom: 10,
      elevation: 5,
    },
    actionButtonTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: Colors.black,
    },
  });
};
