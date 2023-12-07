import { View, Text, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { ConnectedUser, EventGroups } from '@src/models';
import { convertTimestampToDate } from '@src/utils/utils';
import { t } from '@src/localization/Localization';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { getSeniorLocation } from '@src/redux/auth/auth.api';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { Timestamp } from 'firebase/firestore';
import { createTags } from '@src/redux/events/events.api';
import { selectEventsStatus } from '@src/redux/events/events.slice';
import { useStyles } from './styles';
import { UserEvents } from './types';
import { handleCompleteEvent, handleDeleteEvent, sendEventNotificationReminder } from './utils';

const SeniorActions = ({ user }: { user: ConnectedUser }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => selectEventsStatus(state));
  const [isLoading, setIsLoading] = useState(true);
  const eventGroups = user.eventGroups;
  const [events, setEvents] = useState<UserEvents>([]);
  const styles = useStyles();

  useEffect(() => {
    const prepareEvents = (eventGroups: EventGroups) => {
      const events: UserEvents = [];
      eventGroups = eventGroups.filter(e => e.active);
      for (const group of eventGroups) {
        let i = 0;
        const tags = createTags(group.tags);
        const dates = group.dates.filter(d => d.toMillis() >= Timestamp.now().toMillis());
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

  if (isLoading || status === 'pending') {
    return <CustomActivityIndicator />;
  }

  const mapEvents = events.map((event, index) => {
    return (
      <View key={index}>
        <View style={styles.eventContainer}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDate}>
            {convertTimestampToDate(event.date!, 'DD-MM-YYYY HH:mm')}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            color={'green'}
            onPress={() =>
              handleCompleteEvent(
                event.groupKey,
                event.title,
                event.date,
                setEvents,
                dispatch,
                events,
              )
            }
            title={t('seniorDashboard.execute')}
          />
          <Button
            color={'orange'}
            onPress={() => sendEventNotificationReminder(event, user.user.uid)}
            title={t('seniorDashboard.remind')}
          />
          <Button
            color={'red'}
            onPress={() =>
              handleDeleteEvent(
                event.groupKey,
                event.title,
                event.date,
                setEvents,
                dispatch,
                events,
              )
            }
            title={t('seniorDashboard.delete')}
          />
        </View>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.actionContainer}
        onPress={() => {
          getSeniorLocation(user.user.uid);
        }}>
        <Text style={styles.actionText} numberOfLines={1}>
          {t('seniorDashboard.localization')}
        </Text>
      </TouchableOpacity>
      {events.length > 0 && (
        <View style={styles.actionContainer}>
          <Text style={styles.actionText}>{t('seniorDashboard.upcomingEvents')}</Text>
          {mapEvents}
        </View>
      )}
    </View>
  );
};

export default SeniorActions;
