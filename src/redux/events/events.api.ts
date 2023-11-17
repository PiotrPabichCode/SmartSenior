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
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage';

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

export const createEvent = async (newEventData: Event) => {
  try {
    const _collection = collection(db, 'events');
    const response = await addDoc(_collection, newEventData);
    if (!response || !response.id) {
      throw new Error('Unable to add new event.');
    }
    const key = response.id;
    const images = await uploadImages(newEventData.images, key);
    const currentEventRef = doc(db, response.path);
    await updateDoc(currentEventRef, {
      key: key,
      images: images,
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
    if (data.images) {
      const newImages = await uploadImages(data.images, eventKey);
      let images = _data.images;
      if (!images) {
        images = newImages;
      } else {
        images = [...images, ...newImages];
      }
      data.images = newImages;
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
