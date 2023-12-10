import { View, Text, StyleSheet } from 'react-native';
import { UserEvent, UserEvents } from '../types';
import { ConnectedUser } from '@src/models';
import { FlashList } from '@shopify/flash-list';
import { t } from '@src/localization/Localization';
import { convertTimestampToDate } from '@src/utils/utils';
import { handleCompleteEvent, handleDeleteEvent, sendEventNotificationReminder } from '../utils';
import { Button } from '@rneui/themed';

type Props = {
  events: UserEvents;
  setEvents: any;
  user: ConnectedUser;
  onLoad: any;
};

const EventsMapper = ({ user, events, setEvents, onLoad }: Props) => {
  const renderItem = ({ item }: { item: UserEvent }) => {
    return (
      <View>
        <View style={styles.eventContainer}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventDate}>
            {convertTimestampToDate(item.date!, 'DD-MM-YYYY HH:mm')}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            color={'green'}
            containerStyle={{ flex: 1 }}
            buttonStyle={{ height: 40 }}
            titleProps={{ adjustsFontSizeToFit: true, numberOfLines: 1 }}
            onPress={() =>
              handleCompleteEvent(item.groupKey, item.title, item.date, setEvents, events)
            }
            title={t('seniorDashboard.execute')}
          />
          <Button
            color={'orange'}
            containerStyle={{ flex: 1 }}
            buttonStyle={{ height: 40 }}
            titleProps={{ adjustsFontSizeToFit: true, numberOfLines: 1 }}
            onPress={() => sendEventNotificationReminder(item, user.user.uid, onLoad)}
            title={t('seniorDashboard.remind')}
          />
          <Button
            color={'red'}
            containerStyle={{ flex: 1 }}
            buttonStyle={{ height: 40 }}
            titleProps={{ adjustsFontSizeToFit: true, numberOfLines: 1 }}
            onPress={() =>
              handleDeleteEvent(item.groupKey, item.title, item.date, setEvents, events)
            }
            title={t('seniorDashboard.delete')}
          />
        </View>
      </View>
    );
  };

  return (
    events.length > 0 && (
      <View style={styles.actionContainer}>
        <Text style={styles.actionText}>{t('seniorDashboard.upcomingEvents')}</Text>
        <View
          style={{
            flexGrow: 1,
            minHeight: 2,
            minWidth: '100%',
          }}>
          <View style={{ flex: 1 }}>
            <FlashList
              renderItem={renderItem}
              data={events}
              estimatedItemSize={111}
              scrollEnabled={false}
              onLoad={e => {
                console.log(e);
              }}
            />
          </View>
        </View>
      </View>
    )
  );
};

export default EventsMapper;

const styles = StyleSheet.create({
  actionContainer: {
    flexGrow: 1,
    alignItems: 'center',
    borderRadius: 25,
    width: '100%',
    maxHeight: '95%',
    borderWidth: 1,
    padding: 20,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  eventContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginVertical: 10,
  },
  eventTitle: {
    fontSize: 18,
  },
  eventDate: {
    fontSize: 18,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
});
