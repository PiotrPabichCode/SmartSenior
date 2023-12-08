import { View, Text } from 'react-native';
import { UserEvent, UserEvents } from '../types';
import { useEffect, useState } from 'react';
import { ConnectedUser, EventGroups } from '@src/models';
import { createTags } from '@src/redux/events/events.api';
import { Timestamp } from 'firebase/firestore';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { useStyles } from './styles';
import { FlashList } from '@shopify/flash-list';
import { t } from '@src/localization/Localization';
import { convertTimestampToDate } from '@src/utils/utils';
import { handleCompleteEvent, handleDeleteEvent, sendEventNotificationReminder } from '../utils';
import { Button } from '@rneui/themed';

type Props = {
  eventGroups: EventGroups;
  user: ConnectedUser;
};

const EventsMapper = ({ eventGroups, user }: Props) => {
  const [events, setEvents] = useState<UserEvents>([]);
  const [isLoading, setIsLoading] = useState(true);
  const styles = useStyles();

  useEffect(() => {
    const prepareEvents = (eventGroups: EventGroups) => {
      const events: UserEvents = [];
      eventGroups = eventGroups.filter(e => e.active);
      const now = Timestamp.now().toMillis();
      for (const group of eventGroups) {
        let i = 0;
        const tags = createTags(group.tags);
        const dates = group.dates.filter(d => d.toMillis() >= now);
        for (const date of dates) {
          if (group.completedEvents.findIndex(e => e.isEqual(date)) !== -1) {
            continue;
          }
          events.push({
            date: date,
            title: group.title,
            groupKey: group.key,
            tags: tags,
          });
          i++;
        }
      }
      setEvents(
        events.sort((a, b) => {
          if (a.date && b.date) {
            return a.date.toMillis() - b.date.toMillis();
          }
          return 0;
        }),
      );
      setIsLoading(false);
    };

    prepareEvents(eventGroups);
  }, []);

  if (isLoading) {
    return <CustomActivityIndicator />;
  }

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
            onPress={() => sendEventNotificationReminder(item, user.user.uid, setIsLoading)}
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
            maxHeight: '95%',
            minHeight: 2,
            minWidth: '100%',
          }}>
          <View style={{ flex: 1 }}>
            <FlashList
              renderItem={renderItem}
              data={events}
              estimatedItemSize={113}
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
