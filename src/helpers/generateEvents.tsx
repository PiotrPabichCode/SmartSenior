import CustomToast from '@src/components/CustomToast';
import { getAuth } from 'firebase/auth';
import { push, ref } from 'firebase/database';
import { db } from 'firebaseConfig';

const times = [
  { label: '5 minut', value: 5 },
  { label: '15 minut', value: 15 },
  { label: '30 minut', value: 30 },
  { label: '1h', value: 60 },
  { label: '3h', value: 60 * 3 },
];

const priorities = [
  { label: '50', value: 50 },
  { label: '100', value: 100 },
  { label: '300', value: 300 },
  { label: '500', value: 500 },
  { label: '1000', value: 1000 },
];

const cyclicValues = [
  { label: 'Codziennie', value: 1 },
  { label: 'Co 2 dni', value: 2 },
  { label: 'Co tydzień', value: 7 },
  { label: 'Co miesiąc - tego samego dnia', value: 30 },
  { label: 'Wpisz wartość: (liczba = ilość dni)', value: -1 },
];

const days = [
  { shortTitle: 'p', title: 'pon.', value: 1, active: false },
  { shortTitle: 'w', title: 'wt.', value: 2, active: false },
  { shortTitle: 'ś', title: 'śr.', value: 3, active: false },
  { shortTitle: 'c', title: 'czw.', value: 4, active: false },
  { shortTitle: 'p', title: 'pt.', value: 5, active: false },
  { shortTitle: 's', title: 'sob.', value: 6, active: false },
  { shortTitle: 'n', title: 'niedz.', value: 7, active: false },
];

export const events = [
  {
    title: 'Wizyta w parku',
    description: 'Spacer w pięknym parku miejskim',
    days: days.map((day) => ({
      name: day.title,
      active: day.title === 'pon.' || day.title === 'wt.',
    })),
    priority: priorities[0].value,
    isCyclic: false,
    cyclicTime: 0,
    isNotification: true,
    notificationTime: times[2].value, // 30 minut
    deleted: false,
  },
  {
    title: 'Klub seniora',
    description: 'Spotkanie w klubie seniora',
    days: days.map((day) => ({
      name: day.title,
      active:
        day.title === 'pon.' || day.title === 'śr.' || day.title === 'pt.',
    })),
    priority: priorities[1].value,
    isCyclic: true,
    cyclicTime: cyclicValues[2].value,
    isNotification: true,
    notificationTime: times[3].value, // 1 godzina
    deleted: false,
  },
  {
    title: 'Lekarz',
    description: 'Wizyta u lekarza',
    days: days.map((day) => ({ name: day.title, active: day.title === 'wt.' })),
    priority: priorities[2].value,
    isCyclic: true,
    cyclicTime: cyclicValues[2].value,
    isNotification: true,
    notificationTime: times[4].value, // 3 godziny
    deleted: false,
  },
  {
    title: 'Kino',
    description: 'Wizyta w kinie',
    days: days.map((day) => ({
      name: day.title,
      active: day.title === 'czw.',
    })),
    priority: priorities[1].value,
    isCyclic: false,
    cyclicTime: 0,
    isNotification: true,
    notificationTime: times[2].value, // 30 minut
    deleted: false,
  },
  {
    title: 'Zakupy spożywcze',
    description: 'Zakupy w lokalnym sklepie spożywczym',
    days: days.map((day) => ({
      name: day.title,
      active: day.title === 'pon.',
    })),
    priority: priorities[0].value,
    isCyclic: true,
    cyclicTime: cyclicValues[3].value,
    isNotification: true,
    notificationTime: times[3].value, // 1 godzina
    deleted: false,
  },
  {
    title: 'Muzeum',
    description: 'Wizyta w muzeum',
    days: days.map((day) => ({
      name: day.title,
      active: day.title === 'sob.',
    })),
    priority: priorities[1].value,
    isCyclic: false,
    cyclicTime: 0,
    isNotification: true,
    notificationTime: times[3].value, // 1 godzina
    deleted: false,
  },
  {
    title: 'Kawa z przyjacielem',
    description: 'Spotkanie na kawę z przyjacielem',
    days: days.map((day) => ({ name: day.title, active: day.title === 'śr.' })),
    priority: priorities[0].value,
    isCyclic: true,
    cyclicTime: cyclicValues[2].value,
    isNotification: true,
    notificationTime: times[4].value, // 3 godziny
    deleted: false,
  },
  {
    title: 'Szkolenie online',
    description: 'Szkolenie z obsługi komputera online',
    days: days.map((day) => ({ name: day.title, active: day.title === 'pt.' })),
    priority: priorities[1].value,
    isCyclic: true,
    cyclicTime: cyclicValues[0].value,
    isNotification: true,
    notificationTime: times[3].value, // 1 godzina
    deleted: false,
  },
  {
    title: 'Spacer po plaży',
    description: 'Relaksujący spacer po plaży',
    days: days.map((day) => ({
      name: day.title,
      active: day.title === 'niedz.',
    })),
    priority: priorities[0].value,
    isCyclic: false,
    cyclicTime: 0,
    isNotification: true,
    notificationTime: times[3].value, // 1 godzina
    deleted: false,
  },
  {
    title: 'Zajęcia rękodzielnicze',
    description: 'Warsztaty rękodzielnicze w centrum kultury',
    days: days.map((day) => ({
      name: day.title,
      active: day.title === 'czw.',
    })),
    priority: priorities[1].value,
    isCyclic: false,
    cyclicTime: 0,
    isNotification: true,
    notificationTime: times[2].value, // 30 minut
    deleted: false,
  },
];

export const generateEvents = () => {
  try {
    const eventsRef = ref(db, 'events/');
    const eventsData = events; // Assuming events is an array of event objects
    const now = new Date();

    eventsData.forEach((event, index) => {
      const userUid = getAuth().currentUser?.uid + '-deleted-false';
      const createdAt = now.getTime();
      const updatedAt = now.getTime();
      const executionTime = now.getTime() + index * 0.5 * 86400000;

      const modifiedEvent = {
        ...event,
        userUid,
        createdAt,
        updatedAt,
        executionTime,
      };
      // console.log(modifiedEvent);

      push(eventsRef, modifiedEvent);
    });

    CustomToast('success', 'Dodano testowe wydarzenia');
  } catch (e) {
    console.error(e);
  }
};
