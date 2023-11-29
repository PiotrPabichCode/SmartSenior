import Colors from '@src/constants/Colors';
import { StyleSheet } from 'react-native';

export const useStyles = (theme: any) => {
  return StyleSheet.create({
    viewStyle: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.upcomingEventsBackground,
      width: '95%',
      borderRadius: 20,
      overflow: 'hidden',
      elevation: 5,
    },
    actionButtonStyle: {
      backgroundColor: theme.upcomingEventsActionBtn,
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
    moreButtonContainerStyle: {
      borderRadius: 25,
      marginBottom: 10,
      minWidth: '90%',
      elevation: 5,
    },
    moreButtonStyle: {
      backgroundColor: theme.upcomingEventsMoreBtn,
    },
    moreButtonTitle: {
      fontSize: 16,
      fontWeight: '400',
      color: Colors.white,
    },
    eventView: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 5,
    },
    eventTitle: {
      color: theme.upcomingEventsTitle,
      fontWeight: '500',
      fontSize: 17,
      marginVertical: 7,
    },
    eventTimeView: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    date: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.upcomingEventsDate,
    },
    dividerStyle: {
      backgroundColor: theme.divider,
      height: 1.7,
      minWidth: '90%',
      marginVertical: 5,
    },
  });
};
