import { StyleSheet, View } from 'react-native';
import { Icon, Divider, Text } from '@rneui/themed';
import { convertTimestampToDate } from '@src/utils/utils';
import { t } from '@src/localization/Localization';
import { useAppSelector } from '@src/redux/types';
import NoActiveEvents from './NoActiveEvents';
import MoreButton from './MoreButton';
import ActionButton from './ActionButton';
import { useUpcomingEvents } from './useUpcomingEvents';
import { selectEventGroups } from '@src/redux/events/events.slice';
import { CustomActivityIndicator } from '@src/components';
import useThemeColors from '@src/config/useThemeColors';

const UpcomingEvents = () => {
  const eventGroups = useAppSelector(state => selectEventGroups(state));
  const { upcomingEvents, isReady } = useUpcomingEvents(eventGroups);
  const theme = useThemeColors();
  const styles = useStyles();

  if (!isReady) {
    return <CustomActivityIndicator />;
  }

  const MAX_DISPLAYED_EVENTS = 3;

  const mapEventItems = upcomingEvents.map((event, index: number) => {
    if (index === MAX_DISPLAYED_EVENTS) {
      return <MoreButton key={index} />;
    }
    if (index > MAX_DISPLAYED_EVENTS) {
      return;
    }
    const isEnd = index !== upcomingEvents.length - 1;
    return (
      <View style={styles.eventView} key={index}>
        <View style={styles.eventTimeView}>
          <Icon name="arrow-right" size={30} color={theme.icon} />
          <Text style={styles.date} numberOfLines={1}>
            {convertTimestampToDate(event.date!, 'DD-MM-YYYY HH:mm')}
          </Text>
          <Icon name="arrow-left" size={30} color={theme.icon} />
        </View>
        <Text style={styles.eventTitle} numberOfLines={1}>
          {event.title}
        </Text>
        <ActionButton date={event.date} groupKey={event.groupKey} />
        {isEnd && <Divider style={styles.dividerStyle} />}
      </View>
    );
  });

  return (
    <View style={styles.viewStyle}>
      <Text h4 style={{ marginVertical: 5 }}>
        {t('upcomingEvents.title')}
      </Text>
      {upcomingEvents.length > 0 ? mapEventItems : <NoActiveEvents />}
    </View>
  );
};

export default UpcomingEvents;

const useStyles = (theme = useThemeColors()) => {
  return StyleSheet.create({
    viewStyle: {
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
      color: theme.text,
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
      color: theme.text,
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
