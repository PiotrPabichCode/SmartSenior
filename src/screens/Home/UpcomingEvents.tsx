import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Icon, Divider } from '@rneui/themed';
import { navigate } from '@navigation/navigationUtils';
import { EventDetails } from '@src/redux/types/eventsTypes';
import { renderLocalDateWithTime } from '@src/utils/utils';

interface UpcomingEventsProps {
  events: EventDetails[];
}

const UpcomingEvents = ({ events }: UpcomingEventsProps) => {
  const MAX_DISPLAYED_EVENTS = 3;
  const moreButton = (
    <Button
      key={'more-button-event'}
      title='Zobacz więcej'
      containerStyle={styles.moreButtonContainerStyle}
      buttonStyle={styles.moreButtonStyle}
      titleStyle={styles.moreButtonTitle}
      onPress={() => navigate('Events')}
    />
  );
  const actionButton = (eventKey: string, event: EventDetails) => (
    <Button
      title='Wykonaj'
      containerStyle={styles.actionButtonStyle}
      buttonStyle={styles.actionButtonStyle}
      titleStyle={styles.actionButtonTitle}
      onPress={() =>
        navigate('EventItem', {
          eventKey: eventKey,
          event: event,
        })
      }
    />
  );

  const mapEventItems = Object.entries(events)?.map(
    ([eventKey, event]: [string, EventDetails], index: number) => {
      if (index === MAX_DISPLAYED_EVENTS) {
        return moreButton;
      }
      if (index > 3) {
        return;
      }
      const isEnd = index !== events.length - 1;
      return (
        <View style={styles.eventView} key={eventKey}>
          <View style={styles.eventTimeView}>
            <Icon name='arrow-right' color='#000' size={30} />
            <Text style={styles.eventText} numberOfLines={1}>
              {renderLocalDateWithTime(event.executionTime)}
            </Text>
            <Icon name='arrow-left' color='#000' size={30} />
          </View>
          <Text style={styles.eventTitle} numberOfLines={1}>
            {event.description}
          </Text>
          {actionButton(eventKey, event)}
          {isEnd && <Divider style={styles.dividerStyle} />}
        </View>
      );
    }
  );

  const renderTitleAction = () => {
    if (events.length > 0) {
      return (
        <Text style={styles.titleStyle} numberOfLines={1}>
          Nadchodzące wydarzenia
        </Text>
      );
    }
  };

  return (
    <View style={styles.viewStyle}>
      {renderTitleAction()}
      {mapEventItems}
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FB6D6C',
    width: '95%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  actionButtonStyle: {
    backgroundColor: '#FFB909',
    width: 200,
    borderRadius: 25,
  },
  actionButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  moreButtonContainerStyle: {
    borderRadius: 25,
    marginBottom: 10,
    width: 200,
  },
  moreButtonStyle: {
    backgroundColor: '#0940FF',
  },
  moreButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  eventView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  eventTitle: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    marginVertical: 7,
  },
  eventTimeView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  eventText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  dividerStyle: {
    backgroundColor: 'white',
    color: 'white',
    width: 300,
    marginVertical: 5,
  },
});

export default UpcomingEvents;
