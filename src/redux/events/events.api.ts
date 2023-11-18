import { db } from 'firebaseConfig';
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Event, Events, Images } from '@src/models';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

async function uploadImageAsync(uri: string, eventID: string) {
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

  const fileRef = ref(getStorage(), `events/${eventID}/${Date.now()}`);
  await uploadBytes(fileRef, blob);

  return await getDownloadURL(fileRef);
}

const uploadImages = async (images: Images, eventID: string): Promise<Images> => {
  for (const image of images) {
    const uri = await uploadImageAsync(image.uri, eventID);
    image.uri = uri;
    image.base64 = null;
  }
  return images;
};

function getAllDates(event: Event): Array<Date> {
  const { date, frequency } = event;
  const { type, daysOfWeek, unit, interval, endDate } = frequency;
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

  return dates;
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
      date: Timestamp.fromDate(date),
      images: images,
    };

    const _event = await createEvent(newEvent);
    events.push(_event);
    i++;
  }
  return events;
};

export const createEvent = async (newEventData: Event) => {
  try {
    const _collection = collection(db, 'events');
    const response = await addDoc(_collection, newEventData);
    if (!response || !response.id) {
      throw new Error('Unable to add new event.');
    }
    const key = response.id;
    const currentEventRef = doc(db, response.path);
    await updateDoc(currentEventRef, {
      key: key,
    });
    newEventData.key = key;
    return newEventData;
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (eventKey: string, data: Partial<Event>) => {
  try {
    const ref = doc(db, 'events', eventKey);
    const snapshot = await getDoc(ref);
    if (!snapshot.exists()) {
      throw new Error('Event does not exists');
    }
    const _data = snapshot.data();
    let images: Images = [];
    if (data.images) {
      const newImages = await uploadImages(data.images, `${_data.groupKey}/${eventKey}`);
      images = _data.images;
      if (!images) {
        images = newImages;
      } else {
        images = [...images, ...newImages];
      }
      data.images = images;
    }
    await updateDoc(ref, data);
    return {
      key: eventKey,
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (key: string) => {
  try {
    const ref = doc(db, 'events', key);
    await updateDoc(ref, {
      deleted: true,
    });
    return key;
  } catch (error) {
    throw error;
  }
};

export const fetchEventsByID = async (uid: string): Promise<Events> => {
  try {
    const _collection = collection(db, `events`);
    const q = query(
      _collection,
      where('deleted', '==', false),
      where('active', '==', true),
      where('userUid', '==', uid),
      orderBy('date', 'asc'),
    );
    const snapshot = await getDocs(q);
    const events = snapshot.docs.map(doc => doc.data());
    return events as Events;
  } catch (error) {
    throw error;
  }
};
