import { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import Constants from 'expo-constants';
import { IS_ANDROID, convertTimestampToDate } from '@src/utils/utils';
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { selectUserID } from '@src/redux/auth/auth.slice';
import { store } from '@src/redux/common';
import { UserToken } from '@src/models';
import { navigate } from '@src/navigation/navigationUtils';

export interface PushNotificationState {
  expoPushToken?: Notifications.ExpoPushToken;
  notification?: Notifications.Notification;
}

interface NavigationData {
  groupKey: string;
  date: Timestamp;
}

export const usePushNotifications = (userReady: boolean): PushNotificationState => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true,
    }),
  });
  const [expoPushToken, setExpoPushToken] = useState<Notifications.ExpoPushToken | undefined>();
  const [tokenAdded, setTokenAdded] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notifications.Notification | undefined>();
  const [notificationResponse, setNotificationResponse] = useState<
    Notifications.NotificationResponse | undefined
  >();

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification');
        return;
      }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      });
    } else {
      alert('Push notifications works only for physical devices');
    }

    if (IS_ANDROID) {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  const saveTokenToDatabase = async (token: Notifications.ExpoPushToken) => {
    try {
      const userID = selectUserID(store.getState());
      if (!userID) {
        return;
      }
      const _collection = collection(db, 'pushTokens');
      const q = query(_collection, where('user', '==', userID), limit(1));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        await addDoc(_collection, {
          expoPushToken: token,
          user: userID,
        });
        console.log(
          'Token added: ',
          convertTimestampToDate(Timestamp.now(), 'DD-MM-YYYY HH:mm:ss'),
        );
      } else {
        const userToken = snapshot.docs[0].data() as UserToken;
        if (userToken.expoPushToken.data !== token.data) {
          await updateDoc(snapshot.docs[0].ref, {
            expoPushToken: token,
          });
          console.log(
            'Token updated: ',
            convertTimestampToDate(Timestamp.now(), 'DD-MM-YYYY HH:mm:ss'),
          );
        }
      }
      setTokenAdded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification listener', notification);
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response', response);
      setNotificationResponse(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current!);

      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  const handleNotificationResponse = () => {
    if (notificationResponse) {
      const data = notificationResponse.notification.request.content.data;
      if (data) {
        const date = Timestamp.fromMillis(data.date.seconds * 1000);
        const navigationData = {
          groupKey: data.groupKey,
          date: date,
        } as NavigationData;
        navigate('EventItem', {
          groupKey: navigationData.groupKey,
          date: navigationData.date,
        });
      }
      setNotificationResponse(undefined);
    }
  };

  useEffect(() => {
    if (!userReady || !expoPushToken) {
      setTokenAdded(false);
      return;
    }
    if (expoPushToken && userReady && !tokenAdded) {
      saveTokenToDatabase(expoPushToken);
    }
    handleNotificationResponse();
  }, [userReady, expoPushToken, notificationResponse]);

  return {
    expoPushToken,
    notification,
  };
};
