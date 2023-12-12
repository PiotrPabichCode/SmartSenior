import CustomToast from '@src/components/CustomToast';
import { t } from '@src/localization/Localization';
import { completeEvent, deleteEvent } from '@src/redux/events/events.actions';
import { getEventForGroupAndDate } from '@src/redux/events/events.api';
import { convertTimestampToDate } from '@src/utils/utils';
import { Timestamp, collection, getDocs, limit, query, where } from 'firebase/firestore';
import { Alert } from 'react-native';
import { UserEvent, UserEvents } from './types';
import { db } from 'firebaseConfig';
import { UserToken } from '@src/models';
import { store } from '@src/redux/common';

const onEventComplete = async (groupKey: string, date: Timestamp, onComplete: () => void) => {
  try {
    const event = await getEventForGroupAndDate(groupKey, date, true);
    if (!event) {
      return;
    }
    delete event.days;
    const completedEvent = {
      ...event,
      completed: Timestamp.now(),
    };
    await store
      .dispatch(
        completeEvent({
          groupKey: groupKey,
          data: completedEvent,
          fetchGroup: true,
        }),
      )
      .unwrap();
    onComplete();
    CustomToast('success', t('message.success.completeEvent'));
  } catch (error) {
    console.log(error);
    CustomToast('error', t('message.error.completeEvent'));
  }
};

type onCompleteProps = {
  groupKey: string;
  title: string;
  date: Timestamp;
  onComplete: () => void;
};

export const handleCompleteEvent = ({ date, groupKey, onComplete, title }: onCompleteProps) => {
  Alert.alert(
    t('alertEventCompleteTitle'),
    t('alertEventCompleteQuestion', {
      title: title,
      date: convertTimestampToDate(date, 'DD-MM-YYYY HH:mm'),
    }),
    [
      {
        text: t('no'),
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: t('yes'),
        style: 'destructive',
        onPress: async () => await onEventComplete(groupKey, date, onComplete),
      },
    ],
  );
};

const onEventDelete = async (groupKey: string, date: Timestamp, onDelete: () => void) => {
  try {
    const event = await getEventForGroupAndDate(groupKey, date, true);
    if (!event) {
      return;
    }
    delete event.days;
    const deletedEvent = {
      ...event,
      deleted: true,
    };
    await store
      .dispatch(
        deleteEvent({
          groupKey: groupKey,
          data: deletedEvent,
          fetchGroup: true,
        }),
      )
      .unwrap();
    onDelete();
    CustomToast('success', t('message.success.deleteEvent'));
  } catch (error) {
    console.log(error);
    CustomToast('error', t('message.error.deleteEvent'));
  }
};

type onDeleteProps = {
  groupKey: string;
  title: string;
  date: Timestamp;
  onDelete: () => void;
};

export const handleDeleteEvent = ({ groupKey, title, date, onDelete }: onDeleteProps) => {
  Alert.alert(
    t('alertEventDeleteTitle'),
    t('alertEventDeleteQuestion', {
      title: title,
      date: convertTimestampToDate(date, 'DD-MM-YYYY HH:mm'),
    }),
    [
      {
        text: t('no'),
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: t('yes'),
        style: 'destructive',
        onPress: async () => await onEventDelete(groupKey, date, onDelete),
      },
    ],
  );
};

export async function sendEventNotificationReminder(
  userEvent: UserEvent,
  userID: string,
  onNotification: any,
) {
  try {
    onNotification(true);
    const _collection = collection(db, 'pushTokens');
    const q = query(_collection, where('user', '==', userID), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      throw new Error('User token does not exists');
    }
    const token = snapshot.docs[0].data() as UserToken;
    const message = {
      to: token.expoPushToken.data,
      sound: 'default',
      title: userEvent.title,
      body: t('notificationEventReminder', {
        date: convertTimestampToDate(userEvent.date, 'DD-MM-YYYY HH:mm'),
      }),
      data: { groupKey: userEvent.groupKey, date: userEvent.date },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    CustomToast('success', t('message.success.notificationReminder'));
    console.log('notification sent');
  } catch (error) {
    CustomToast('error', t('message.error.notificationReminder'));
    console.log(error);
  } finally {
    onNotification(false);
  }
}
