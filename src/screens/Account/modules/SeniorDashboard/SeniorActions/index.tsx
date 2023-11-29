import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Button } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { ConnectedUser, EventGroups, Tags } from '@src/models';
import { convertTimestampToDate } from '@src/utils/utils';
import { t } from '@src/localization/Localization';
import { useAppDispatch } from '@src/redux/types';
import { deleteEvent, updateEvent } from '@src/redux/events/events.actions';
import CustomToast from '@src/components/CustomToast';
import { getSeniorLocation } from '@src/redux/auth/auth.api';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { Timestamp } from 'firebase/firestore';
import { createTags } from '@src/redux/events/events.api';

interface UserEvent {
  date: Timestamp;
  title: string;
  tags: Tags;
  groupKey: string;
}

type UserEvents = UserEvent[];

const SeniorActions = ({ user }: { user: ConnectedUser }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const eventGroups = user.eventGroups;
  const [events, setEvents] = useState<UserEvents>([]);

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

  if (isLoading) {
    return <CustomActivityIndicator />;
  }

  const onEventComplete = async (key: string) => {
    // try {
    //   await dispatch(
    //     updateEvent({
    //       eventKey: key,
    //       data: {},
    //     }),
    //   ).unwrap();
    //   CustomToast('success', t('eventItem.alert.success'));
    // } catch (error) {
    //   console.log(error);
    //   CustomToast('error', t('eventItem.alert.error'));
    // }
  };

  const handleCompleteEvent = (key: string) => {
    Alert.alert('Wykonanie zadania', 'Czy chcesz wykonać zadanie?', [
      {
        text: t('eventItem.alert.no'),
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: t('eventItem.alert.yes'),
        style: 'destructive',
        onPress: async () => await onEventComplete(key),
      },
    ]);
  };

  const onEventDelete = async (key: string) => {
    // try {
    //   await dispatch(deleteEvent(key)).unwrap();
    //   CustomToast('success', t('eventItem.alert.success'));
    // } catch (error) {
    //   console.log(error);
    //   CustomToast('error', t('eventItem.alert.error'));
    // }
  };

  const handleDeleteEvent = (key: string) => {
    Alert.alert(t('eventItem.alert.title'), t('eventItem.alert.message'), [
      {
        text: t('eventItem.alert.no'),
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: t('eventItem.alert.yes'),
        style: 'destructive',
        onPress: async () => await onEventDelete(key),
      },
    ]);
  };

  const mapEvents = events.map((event, index) => {
    return (
      <View key={index}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            marginVertical: 10,
          }}>
          <Text style={{ fontSize: 18 }}>{event.title}</Text>
          <Text style={{ fontSize: 18 }}>
            {convertTimestampToDate(event.date!, 'DD-MM-YYYY HH:mm')}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            minWidth: '100%',
          }}>
          <Button
            color={'green'}
            onPress={() => handleCompleteEvent('')}
            title={t('seniorDashboard.execute')}
          />
          <Button
            color={'orange'}
            onPress={() => console.log('przypomnij')}
            title={t('seniorDashboard.remind')}
          />
          <Button
            color={'red'}
            onPress={() => handleDeleteEvent('')}
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

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  actionContainer: {
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
    padding: 20,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default SeniorActions;
