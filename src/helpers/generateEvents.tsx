import CustomToast from '@src/components/CustomToast';
import {
  DAYS,
  cyclicValues,
  days,
  priorities,
  times,
} from '@src/redux/constants/eventsConstants';
import { getAuth } from 'firebase/auth';
import { push, ref } from 'firebase/database';
import { db } from 'firebaseConfig';

export const events = [
  {
    title: 'Wizyta w parku',
    description: 'Spacer w pięknym parku miejskim',
    days: days.map((day) => ({
      value: day.value,
      active: day.value === DAYS.MONDAY || day.value === DAYS.TUESDAY,
    })),
    priority: priorities[0].value,
    isCyclic: false,
    cyclicTime: 0,
    isNotification: true,
    notificationTime: times[2].value, // 30 minut
    deleted: false,
    active: true,
  },
  {
    title: 'Klub seniora',
    description: 'Spotkanie w klubie seniora',
    days: days.map((day) => ({
      value: day.value,
      active:
        day.value === DAYS.MONDAY ||
        day.value === DAYS.WEDNESDAY ||
        day.value === DAYS.FRIDAY,
    })),
    priority: priorities[1].value,
    isCyclic: true,
    cyclicTime: cyclicValues[2].value,
    isNotification: true,
    notificationTime: times[3].value, // 1 godzina
    deleted: false,
    active: true,
  },
  {
    title: 'Lekarz',
    description: 'Wizyta u lekarza',
    days: days.map((day) => ({
      value: day.value,
      active: day.value === DAYS.TUESDAY,
    })),
    priority: priorities[2].value,
    isCyclic: true,
    cyclicTime: cyclicValues[2].value,
    isNotification: true,
    notificationTime: times[4].value, // 3 godziny
    deleted: false,
    active: false,
  },
  {
    title: 'Kino',
    description: 'Wizyta w kinie',
    days: days.map((day) => ({
      value: day.value,
      active: day.value === DAYS.THURSDAY,
    })),
    priority: priorities[1].value,
    isCyclic: false,
    cyclicTime: 0,
    isNotification: true,
    notificationTime: times[2].value, // 30 minut
    deleted: false,
    active: true,
  },
  {
    title: 'Zakupy spożywcze',
    description: 'Zakupy w lokalnym sklepie spożywczym',
    days: days.map((day) => ({
      value: day.value,
      active: day.value === DAYS.MONDAY,
    })),
    priority: priorities[0].value,
    isCyclic: true,
    cyclicTime: cyclicValues[3].value,
    isNotification: true,
    notificationTime: times[3].value, // 1 godzina
    deleted: false,
    active: true,
  },
  {
    title: 'Muzeum',
    description: 'Wizyta w muzeum',
    days: days.map((day) => ({
      value: day.value,
      active: day.value === DAYS.SATURDAY,
    })),
    priority: priorities[1].value,
    isCyclic: false,
    cyclicTime: 0,
    isNotification: true,
    notificationTime: times[3].value, // 1 godzina
    deleted: false,
    active: false,
  },
  {
    title: 'Kawa z przyjacielem',
    description: 'Spotkanie na kawę z przyjacielem',
    days: days.map((day) => ({
      value: day.value,
      active: day.value === DAYS.WEDNESDAY,
    })),
    priority: priorities[0].value,
    isCyclic: true,
    cyclicTime: cyclicValues[2].value,
    isNotification: true,
    notificationTime: times[4].value, // 3 godziny
    deleted: false,
    active: true,
  },
  {
    title: 'Szkolenie online',
    description: 'Szkolenie z obsługi komputera online',
    days: days.map((day) => ({
      value: day.value,
      active: day.value === DAYS.FRIDAY,
    })),
    priority: priorities[1].value,
    isCyclic: true,
    cyclicTime: cyclicValues[0].value,
    isNotification: true,
    notificationTime: times[3].value, // 1 godzina
    deleted: false,
    active: true,
  },
  {
    title: 'Spacer po plaży',
    description: 'Relaksujący spacer po plaży',
    days: days.map((day) => ({
      value: day.value,
      active: day.value === DAYS.SUNDAY,
    })),
    priority: priorities[0].value,
    isCyclic: false,
    cyclicTime: 0,
    isNotification: true,
    notificationTime: times[3].value, // 1 godzina
    deleted: false,
    active: false,
  },
  {
    title: 'Zajęcia rękodzielnicze',
    description: 'Warsztaty rękodzielnicze w centrum kultury',
    days: days.map((day) => ({
      value: day.value,
      active: day.value === DAYS.THURSDAY,
    })),
    priority: priorities[1].value,
    isCyclic: false,
    cyclicTime: 0,
    isNotification: true,
    notificationTime: times[2].value, // 30 minut
    deleted: false,
    active: true,
  },
];

export const generateEvents = () => {
  try {
    const eventsRef = ref(db, 'events/');
    const eventsData = events;
    const now = new Date();

    eventsData.forEach((event, index) => {
      const userUid = getAuth().currentUser?.uid + '-deleted-false';
      const createdAt = now.getTime();
      const updatedAt = now.getTime();
      const updatedDays = event.days.map((day) => ({
        value: day.value,
        active: now.getDay() ? true : day.active,
      }));
      const executionTime = now.getTime() + index * 0.5 * 86400000;

      const modifiedEvent = {
        ...event,
        days: updatedDays,
        userUid,
        createdAt,
        updatedAt,
        executionTime,
      };

      push(eventsRef, modifiedEvent);
    });

    CustomToast('success', 'Dodano testowe wydarzenia');
  } catch (e) {
    console.error(e);
  }
};
