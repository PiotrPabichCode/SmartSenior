import { View, StyleSheet } from 'react-native';
import { Button, Icon, Divider, Text } from '@rneui/themed';
import { navigate } from '@navigation/navigationUtils';
import { convertTimestampToDate } from '@src/utils/utils';
import { t } from '@src/localization/Localization';
import Colors from '@src/constants/Colors';
import { useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import NoActiveEvents from './NoActiveEvents';
import { UpcomingEventItems } from './HomeScreen';
import { Timestamp } from 'firebase/firestore';

interface Props {
  events: UpcomingEventItems;
}

const UpcomingEvents = ({ events }: Props) => {
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
  const actionButton = (groupKey: string, date: Timestamp) => (
    <Button
      key={'execute-button-event'}
      title={t('button.execute')}
      containerStyle={styles.actionButtonContainerStyle}
      buttonStyle={styles.actionButtonStyle}
      titleStyle={styles.actionButtonTitle}
      onPress={() =>
        navigate('EventItem', {
          groupKey: groupKey,
          date: date,
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
          {event.title}
        </Text>
        {actionButton(event.groupKey, event.date)}
        {isEnd && <Divider style={styles.dividerStyle} />}
      </View>
    );
  });

  return (
    <View style={styles.viewStyle}>
      <Text h4 style={{ marginVertical: 5 }}>
        {t('upcomingEvents.title')}
      </Text>
      {events.length > 0 ? mapEventItems : <NoActiveEvents />}
    </View>
  );
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
