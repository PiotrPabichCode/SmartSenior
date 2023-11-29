import Colors from '@src/constants/Colors';
import { Theme } from '@src/models';
import { StyleSheet } from 'react-native';

export const useStyles = (theme: Theme) => {
  const currentTheme = Colors[theme];
  return StyleSheet.create({
    moreButtonContainerStyle: {
      borderRadius: 25,
      marginBottom: 10,
      minWidth: '90%',
      elevation: 5,
    },
    moreButtonStyle: {
      backgroundColor: currentTheme.upcomingEventsMoreBtn,
    },
    moreButtonTitle: {
      fontSize: 16,
      fontWeight: '400',
      color: Colors.white,
    },
  });
};
