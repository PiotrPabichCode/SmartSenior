import { db } from 'firebaseConfig';
import * as firebase from './events.firebase';
import {
  Timestamp,
  addDoc,
  arrayUnion,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Event, EventGroup, FirebaseEvent, Image, Tag, Tags } from '@src/models';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { store } from '../common';
import { days } from './events.constants';
import type { RootState } from '../store';
import { setupEventsGroupNotification } from '@src/components/Notifications/EventNotifications';
import { cancelNotification } from '@src/components/Notifications/Notifications';

const selectTags = (state: RootState) => state.auth.user?.tags;
const selectEventGroups = (state: RootState) => state.events.eventGroups;
const selectEventsGroupByKey = (state: RootState, key: string) => {
  const eventGroups = selectEventGroups(state);
  return eventGroups.find(group => group.key === key);
};

async function uploadImageAsync(uri: string, eventPath: string) {
  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const fileRef = ref(getStorage(), `events/${eventPath}/${Date.now()}`);
  await uploadBytes(fileRef, blob);

  return await getDownloadURL(fileRef);
}

const uploadImages = async (images: Image[], eventPath: string): Promise<Image[]> => {
  for (const image of images) {
    const uri = await uploadImageAsync(image.uri, eventPath);
    image.uri = uri;
  }
  return images;
};

function getAllDates(event: Partial<Event>): Array<Timestamp> {
  const { date, frequency } = event;
  const { type, daysOfWeek, unit, interval, endDate } = frequency!;
  const dates = [];
  const _endDate = endDate?.toDate()!;
  _endDate.setDate(_endDate.getDate() + 1);
  const currentDate = date?.toDate()!;

  while (currentDate <= _endDate) {
    if (type === 'specificDays') {
      if (daysOfWeek!.includes(currentDate.getDay())) {
        dates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    } else {
      dates.push(new Date(currentDate));
      switch (unit) {
        case 'day':
          currentDate.setDate(currentDate.getDate() + interval!);
          break;
        case 'week':
          currentDate.setDate(currentDate.getDate() + 7 * interval!);
          break;
        case 'month':
          currentDate.setMonth(currentDate.getMonth() + interval!);
          break;
        default:
          break;
      }
    }
  }

  return dates.map(d => Timestamp.fromDate(d));
}

export const createEventGroup = async (event: Event) => {
  try {
    await uploadImages(event.images, event.groupKey);
    const groupDoc = firebase.eventGroupsDoc(event.groupKey);
    let group = {
      key: event.groupKey,
      userID: event.userUid,
      active: true,
      deleted: false,
      numOfEvents: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      title: event.title,
      description: event.description,
      notifications: event.notifications,
      priority: event.priority,
      frequency: event.frequency,
      images: event.images.map(i => i.uri),
      tags: event.tags.map(t => t.id),
      dates: getAllDates(event),
      completedEvents: [],
      deletedEvents: [],
    };
    const notificationId = await setupEventsGroupNotification(group, group.dates[0]);
    if (notificationId) {
      group = {
        ...group,
        notifications: {
          ...group.notifications,
          notificationId: notificationId,
        },
      };
    }

    await setDoc(groupDoc, group);
    return group as EventGroup;
  } catch (error) {
    throw error;
  }
};

const prepareEventByGroupAndDate = (date: Timestamp, group: EventGroup) => {
  return {
    date: date,
    active: group.active,
    deleted: group.deleted,
    description: group.description,
    frequency: group.frequency,
    notifications: group.notifications,
    title: group.title,
    priority: group.priority,
    updatedAt: Timestamp.now(),
    userUid: group.userID,
    groupKey: group.key,
    images: group.images,
    tags: group.tags,
    days: group.frequency.daysOfWeek,
  };
};

const prepareImages = (groupImages: Array<string>, eventImages: Array<string>) => {
  const uris = [...groupImages, ...eventImages];
  return createImages(uris);
};

const getEventGroupFromStoreByKey = (key: string) => {
  const group = selectEventsGroupByKey(store.getState(), key);
  if (!group) {
    throw new Error('Group does not exists');
  }
  return group;
};

const getOrFetchEventGroup = async (
  groupKey: string,
  fetchGroup?: boolean,
): Promise<EventGroup> => {
  if (fetchGroup) {
    return await fetchEventGroupDetails(groupKey);
  }
  return getEventGroupFromStoreByKey(groupKey);
};

export const getEventForGroupAndDate = async (
  groupKey: string,
  date: Timestamp,
  fetchGroup?: boolean,
): Promise<Event> => {
  try {
    const group = await getOrFetchEventGroup(groupKey, fetchGroup);
    const completedEventsCollection = firebase.completedEventsCollection(groupKey);
    const q = query(completedEventsCollection, where('date', '==', date), limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const firebaseEvent = snapshot.docs[0].data();
      return {
        ...firebaseEvent,
        images: prepareImages(group.images, firebaseEvent.images ?? []),
        tags: firebaseEvent.tags ? createTags(firebaseEvent.tags) : [],
        days: createDays(group.frequency.daysOfWeek),
      } as Event;
    }
    const event = prepareEventByGroupAndDate(date, group);
    if (!event) {
      throw new Error('Unable to create event');
    }
    return {
      ...event,
      images: createImages(event.images),
      tags: createTags(event.tags),
      days: createDays(event.frequency.daysOfWeek),
    } as Event;
  } catch (error) {
    throw error;
  }
};

export const updateEventsGroup = async (key: string, data: Partial<any>) => {
  try {
    const group = getEventGroupFromStoreByKey(key);
    const firebaseData = { ...data };
    if (data.tags) {
      firebaseData.tags = data.tags.map((t: Tag) => t.id);
    }
    if (data.images) {
      const oldImages: Image[] = data.images.filter((image: Image) =>
        image.uri.startsWith('https://'),
      );
      const newImages = data.images.filter((image: Image) => image.uri.startsWith('file://'));
      const uploadedImages = await uploadImages(newImages, `${key}`);
      firebaseData.images = [...oldImages.map(i => i.uri), ...uploadedImages.map(i => i.uri)];
    }
    if (data.frequency || data.date) {
      firebaseData.dates = getAllDates({
        frequency: data.frequency ?? group.frequency,
        date: data.date ?? group.dates[0],
      });
      const notificationId = await setupEventsGroupNotification(group, firebaseData.dates[0]);
      firebaseData.notifications = {
        ...firebaseData.notifications,
        notificationId: notificationId,
      };
    }
    if (firebaseData.notifications?.enable === false) {
      await cancelNotification(group.notifications.notificationId);
      firebaseData.notifications = {
        ...firebaseData.notifications,
        notificationId: null,
      };
    }
    const eventGroupsDoc = firebase.eventGroupsDoc(key);
    await updateDoc(eventGroupsDoc, firebaseData);
    return {
      key: key,
      data: firebaseData,
    };
  } catch (error) {
    throw error;
  }
};

export const completeEvent = async (
  groupKey: string,
  data: Partial<Event>,
  fetchGroup?: boolean,
) => {
  try {
    const groupData = await getOrFetchEventGroup(groupKey, fetchGroup);
    const firebaseData = { ...data } as Partial<FirebaseEvent>;
    delete firebaseData.images;
    if (data.tags) {
      firebaseData.tags = data.tags.map(t => t.id);
    }
    const completedEventsCollection = firebase.completedEventsCollection(groupKey);
    const snapshot = await addDoc(completedEventsCollection, firebaseData);
    if (snapshot.id) {
      await updateDoc(doc(db, snapshot.path), {
        key: snapshot.id,
      });
    }

    if (data.images) {
      const filteredImages = data.images.filter(i => !groupData.images.includes(i.uri));
      const newImages = await uploadImages(filteredImages, `${groupKey}`);
      await updateDoc(doc(db, snapshot.path), {
        images: newImages.map(i => i.uri),
      });
    }

    const groupDoc = firebase.eventGroupsDoc(groupKey);
    await updateDoc(groupDoc, {
      completedEvents: arrayUnion(data.date),
    });

    return {
      group: groupKey,
      date: data.date,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (groupKey: string, data: Partial<Event>, fetchGroup?: boolean) => {
  try {
    const groupData = await getOrFetchEventGroup(groupKey, fetchGroup);
    const firebaseData = { ...data } as Partial<FirebaseEvent>;
    delete firebaseData.images;
    if (data.tags) {
      firebaseData.tags = data.tags.map(t => t.id);
    }
    const deletedEventsCollection = firebase.deletedEventsCollection(groupKey);
    const snapshot = await addDoc(deletedEventsCollection, firebaseData);
    if (!snapshot.id) {
      throw new Error('Unable to delete event');
    }

    let updateData: any = {
      key: snapshot.id,
    };
    if (snapshot.id) {
      await updateDoc(doc(db, snapshot.path), {
        key: snapshot.id,
      });
    }

    if (data.images) {
      const filteredImages = data.images.filter(i => !groupData.images.includes(i.uri));
      const newImages = await uploadImages(filteredImages, `${groupKey}`);
      updateData = {
        ...updateData,
        images: newImages.map(i => i.uri),
      };
    }

    await updateDoc(doc(db, snapshot.path), updateData);

    const groupDoc = firebase.eventGroupsDoc(groupKey);
    await updateDoc(groupDoc, {
      deletedEvents: arrayUnion(data.date),
    });

    return {
      group: groupKey,
      date: data.date,
    };
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (group: string, key: string, data: Partial<Event>) => {
  try {
    const firebaseData = { ...data } as Partial<FirebaseEvent>;
    if (data.tags) {
      firebaseData.tags = data.tags.map(t => t.id);
    }
    if (data.images) {
      const newImages = await uploadImages(data.images, `${group}/${key}`);
      firebaseData.images = newImages.map(i => i.uri);
    }
    // if (data.frequency) {
    //   await updateGroupEvents(group, data.frequency);
    // }
    const eventDoc = firebase.eventDoc(group, key);
    await updateDoc(eventDoc, firebaseData);
  } catch (error) {
    throw error;
  }
};

export const createDays = (data: Array<number> | null | undefined) => {
  if (!data) {
    return days.map(day => ({ ...day, active: false }));
  }
  return days.map(day => ({ ...day, active: data.includes(day.value) ? true : false }));
};

export const createTags = (tagIds: Array<string> | null): Tags => {
  const tags = selectTags(store.getState());
  if (!tagIds || !tags) {
    return [];
  }
  return tags.filter(t => tagIds.includes(t.id));
};

export const createImages = (imageUris: Array<string> | null): Image[] => {
  if (!imageUris) {
    return [];
  }
  return imageUris.map(i => ({
    uri: i,
    base64: null,
  }));
};

export const sortEvents = (events: Event[]): Event[] => {
  return events.sort((a, b) => {
    if (a.date && b.date) {
      return a.date.toMillis() - b.date.toMillis();
    }
    return 0;
  });
};

export const prepareCalendarEvents = (eventGroups: EventGroup[]) => {
  const calendarItems = [];
  for (const group of eventGroups) {
    for (const date of group.dates) {
      calendarItems.push({
        groupKey: group.key,
        description: group.description,
        date: date,
        priority: group.priority,
        name: group.title,
      });
    }
  }
  return calendarItems;
};

export const fetchEventGroupDetails = async (groupKey: string): Promise<EventGroup> => {
  try {
    const eventGroupsDoc = firebase.eventGroupsDoc(groupKey);
    const snapshot = await getDoc(eventGroupsDoc);
    if (!snapshot.exists()) {
      throw new Error(`Event group with this key doesn't exists`);
    }
    return snapshot.data();
  } catch (error) {
    throw error;
  }
};

export const fetchEventGroupsByID = async (uid: string): Promise<EventGroup[]> => {
  try {
    const eventGroupsCollection = firebase.eventGroupsCollection();
    let q = query(eventGroupsCollection, where('deleted', '==', false), where('userID', '==', uid));
    let snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    throw error;
  }
};
