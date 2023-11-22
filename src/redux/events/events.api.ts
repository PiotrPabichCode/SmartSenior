import { db } from 'firebaseConfig';
import {
  Timestamp,
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  Event,
  EventGroup,
  EventGroups,
  Events,
  FirebaseEvent,
  Frequency,
  Images,
  Tags,
} from '@src/models';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { store } from '../common';
import { days } from './events.constants';
import type { RootState } from '../store';

const selectTags = (state: RootState) => state.auth.user?.tags;
const selectEventGroups = (state: RootState) => state.events.eventGroups;
const selectEventsGroupByKey = (state: RootState, key: string) => {
  const eventGroups = selectEventGroups(state);
  return eventGroups.find(group => group.key === key);
};

async function uploadImageAsync(uri: string, eventPath: string) {
  const blob: any = await new Promise((resolve, reject) => {
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

const uploadImages = async (images: Images, eventPath: string): Promise<Images> => {
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
  const currentDate = date?.toDate()!;

  while (currentDate <= endDate?.toDate()!) {
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

export const createRecurringEvents = async (event: Event) => {
  const dates = getAllDates(event);
  const events: Events = [];
  let images: Images = [];
  let i = 0;
  for (const date of dates) {
    if (i === 0 && event.images) {
      images = await uploadImages(event.images, event.groupKey);
    }
    const newEvent: Event = {
      ...event,
      date: date,
      images: images,
    };

    const _event = await createEvent(newEvent, i > 0, true);
    events.push(_event);
    i++;
  }
  return events;
};

export const createEventGroup = async (event: Event) => {
  try {
    await uploadImages(event.images, event.groupKey);
    const groupDoc = doc(db, 'eventGroups', event.groupKey);
    const group = {
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
    };
    await setDoc(groupDoc, group);
    return group as EventGroup;
  } catch (error) {
    throw error;
  }
};

const prepareEventByGroupAndDate = (groupKey: string, date: Timestamp) => {
  const group = selectEventsGroupByKey(store.getState(), groupKey);
  if (!group) {
    return null;
  }
  return {
    date: date,
    active: true,
    deleted: false,
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
    completed: false,
  };
};

export const getOrCreateEventForGroupAndDate = async (
  groupKey: string,
  date: Timestamp,
): Promise<Event> => {
  try {
    const eventsCollection = collection(db, 'eventGroups', groupKey, 'events');
    const q = query(eventsCollection, where('date', '==', date), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      const event = prepareEventByGroupAndDate(groupKey, date);
      if (!event) {
        throw new Error('Unable to create event');
      }
      const response = await addDoc(eventsCollection, event);
      if (!response || !response.id) {
        throw new Error('Unable to create event');
      }
      await updateDoc(doc(db, response.path), {
        key: response.id,
      });

      console.log('New event created');
      return {
        ...event,
        key: response.id,
        images: createImages(event.images),
        tags: createTags(event.tags),
        days: createDays(event.days),
      } as Event;
    }
    console.log('Event loaded');
    const event = snapshot.docs[0].data();
    return {
      ...event,
      images: createImages(event.images),
      tags: createTags(event.tags),
      days: createDays(event.days),
    } as Event;
  } catch (error) {
    throw error;
  }
};

export const createEvent = async (event: Event, isGroup?: boolean, imagesUploaded?: boolean) => {
  try {
    const groupDoc = doc(db, 'eventGroups', event.groupKey);
    if (!isGroup) {
      await setDoc(groupDoc, {
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
        tags: event.tags.map(t => t.id),
        images: event.images.map(i => i.uri),
        dates: getAllDates(event),
      });
    }

    const firebaseEvent = {
      ...event,
      tags: event.tags.map(t => t.id),
      images: event.images.map(i => i.uri),
    } as FirebaseEvent;
    delete firebaseEvent.frequency;
    const eventsCollection = collection(db, 'eventGroups', event.groupKey, 'events');
    const response = await addDoc(eventsCollection, firebaseEvent);
    if (!response || !response.id) {
      throw new Error('Unable to add new event.');
    }
    await updateDoc(groupDoc, {
      numOfEvents: increment(1),
    });
    const key = response.id;
    const currentEventRef = doc(db, response.path);
    const updatedData = {
      key: key,
    } as { key: string; images?: Array<string> };
    if (!imagesUploaded && event.images) {
      const images = await uploadImages(event.images, event.groupKey);
      updatedData.images = images.map(i => i.uri);
      event.images = images;
    }
    console.log('ADDED EVENT');
    await updateDoc(currentEventRef, updatedData);
    event.key = key;
    if (!event.days) {
      event.days = createDays(event.days);
    }
    return event;
  } catch (error) {
    throw error;
  }
};

const updateGroupEvents = async (group: string, frequency: Frequency) => {
  const groupDoc = doc(db, 'eventGroups', group);
  await updateDoc(groupDoc, {
    frequency: frequency,
  });
  const dates = getAllDates({
    date: Timestamp.now(),
    frequency: frequency,
  });
  console.log(dates);
};

export const updateEventsGroup = async (key: string, data: Partial<EventGroup>) => {
  try {
    const ref = doc(db, 'eventGroups', key);
    await updateDoc(ref, data);
    return {
      key: key,
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (group: string, key: string, data: Partial<Event>) => {
  try {
    const ref = doc(db, 'eventGroups', group, 'events', key);
    const firebaseData = { ...data } as Partial<FirebaseEvent>;
    if (data.images) {
      const newImages = await uploadImages(data.images, `${group}/${key}`);
      firebaseData.images = newImages.map(i => i.uri);
    }
    // if (data.frequency) {
    //   await updateGroupEvents(group, data.frequency);
    // }

    await updateDoc(ref, firebaseData);
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (group: string, key: string) => {
  try {
    const ref = doc(db, 'eventGroups', group, 'events', key);
    await updateDoc(ref, {
      deleted: true,
      updatedAt: Timestamp.now(),
    });
    const groupDoc = doc(db, 'eventGroups', group);
    await updateDoc(groupDoc, {
      numOfEvents: increment(-1),
    });
    return key;
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

export const createImages = (imageUris: Array<string> | null): Images => {
  if (!imageUris) {
    return [];
  }
  return imageUris.map(i => ({
    uri: i,
    base64: null,
  }));
};

export const sortEvents = (events: Events): Events => {
  return events.sort((a, b) => {
    if (a.date && b.date) {
      return a.date.toMillis() - b.date.toMillis();
    }
    return 0;
  });
};

export const fetchEventGroupsByID = async (uid: string): Promise<EventGroups> => {
  try {
    const groupsCollection = collection(db, 'eventGroups');
    let q = query(
      groupsCollection,
      where('deleted', '==', false),
      where('active', '==', true),
      where('userID', '==', uid),
    );
    let snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data()) as EventGroups;
  } catch (error) {
    throw error;
  }
};

export const fetchEventsByID = async (uid: string): Promise<Events> => {
  try {
    const groupsCollection = collection(db, 'eventGroups');
    let q = query(
      groupsCollection,
      where('deleted', '==', false),
      where('active', '==', true),
      where('userID', '==', uid),
    );
    let snapshot = await getDocs(q);
    const events: Events = [];
    for (const groupDoc of snapshot.docs) {
      const groupDetails = groupDoc.data() as EventGroup;
      const eventsCollection = collection(groupDoc.ref, 'events');
      q = query(eventsCollection, where('deleted', '==', false));
      snapshot = await getDocs(q);
      snapshot.docs.map(doc => {
        const event = doc.data();
        const updatedEvent = {
          ...event,
          frequency: groupDetails.frequency,
          days: createDays(groupDetails.frequency.daysOfWeek),
          tags: createTags(event.tags),
          images: createImages(event.images),
        } as Event;
        events.push(updatedEvent);
      });
    }
    return sortEvents(events);
  } catch (error) {
    throw error;
  }
};
