import { View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import React from 'react';
import { ConnectedUser } from '@src/models';
import { convertTimestampToDate } from '@src/utils/utils';
import { t } from '@src/localization/Localization';
import { useAppDispatch } from '@src/redux/types';
import { deleteEvent, updateEvent } from '@src/redux/events/events.actions';
import CustomToast from '@src/components/CustomToast';
import { getSeniorLocation } from '@src/redux/auth/auth.api';

const SeniorActions = ({ user }: { user: ConnectedUser }) => {
  const dispatch = useAppDispatch();
  const events = user.events;

  const onEventComplete = async (key: string) => {
    try {
      await dispatch(
        updateEvent({
          eventKey: key,
          data: {},
        }),
      ).unwrap();
      CustomToast('success', t('eventItem.alert.success'));
    } catch (error) {
      console.log(error);
      CustomToast('error', t('eventItem.alert.error'));
    }
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
    try {
      await dispatch(deleteEvent(key)).unwrap();
      CustomToast('success', t('eventItem.alert.success'));
    } catch (error) {
      console.log(error);
      CustomToast('error', t('eventItem.alert.error'));
    }
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

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button
            color={'green'}
            onPress={() => handleCompleteEvent(event.key)}
            title={t('seniorDashboard.execute')}
          />
          <Button
            color={'orange'}
            onPress={() => console.log('przypomnij')}
            title={t('seniorDashboard.remind')}
          />
          <Button
            color={'red'}
            onPress={() => handleDeleteEvent(event.key)}
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
