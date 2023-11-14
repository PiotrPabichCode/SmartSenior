import { View, Text, StyleSheet } from 'react-native';
import { Button, Icon, Divider } from '@rneui/themed';
import { navigate } from '@navigation/navigationUtils';
import { convertTimestampToDate } from '@src/utils/utils';
import { t } from '@src/localization/Localization';
import Colors from '@src/constants/Colors';
import { Event, Events } from '@src/models';
import { useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';

interface UpcomingEventsProps {
  events: Events;
}

const UpcomingEvents = ({ events }: UpcomingEventsProps) => {
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];
  const styles = useStyles(currentTheme);

  const MAX_DISPLAYED_EVENTS = 3;
  const moreButton = (
    <Button
      key={'more-button-event'}
      title={t('button.more')}
      containerStyle={styles.moreButtonContainerStyle}
      buttonStyle={styles.moreButtonStyle}
      titleStyle={styles.moreButtonTitle}
      onPress={() => navigate('Events')}
    />
  );
  const actionButton = (eventKey: string) => (
    <Button
      key={'execute-button-event'}
      title={t('button.execute')}
      containerStyle={styles.actionButtonContainerStyle}
      buttonStyle={styles.actionButtonStyle}
      titleStyle={styles.actionButtonTitle}
      onPress={() =>
        navigate('EventItem', {
          eventKey: eventKey,
        })
      }
    />
  );

  const mapEventItems = events.map((event, index: number) => {
    if (index === MAX_DISPLAYED_EVENTS) {
      return moreButton;
    }
    if (index > MAX_DISPLAYED_EVENTS) {
      return;
    }
    const isEnd = index !== events.length - 1;
    return (
      <View style={styles.eventView} key={index}>
        <View style={styles.eventTimeView}>
          <Icon name="arrow-right" size={30} color={currentTheme.icon} />
          <Text style={styles.date} numberOfLines={1}>
            {convertTimestampToDate(event.date!, 'DD-MM-YYYY HH:mm')}
          </Text>
          <Icon name="arrow-left" size={30} color={currentTheme.icon} />
        </View>
        <Text style={styles.eventTitle} numberOfLines={1}>
          {event.description}
        </Text>
        {actionButton(event.key)}
        {isEnd && <Divider style={styles.dividerStyle} />}
      </View>
    );
  });

  return <View style={styles.viewStyle}>{mapEventItems}</View>;
};

const useStyles = (theme: any) =>
  StyleSheet.create({
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

export default UpcomingEvents;
