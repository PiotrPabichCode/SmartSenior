import { Frequency, Images, Notifications, Tags } from '@src/models';
import { Timestamp } from 'firebase/firestore';

export const initialValues = {
  key: '',
  groupKey: Date.now().toString(36),
  title: '',
  tags: [] as Tags,
  images: [] as Images,
  description: '',
  date: null as Timestamp | null,
  frequency: {
    recurring: false,
    type: null,
    daysOfWeek: null,
    unit: 'day',
    interval: null,
    startDate: null,
    endDate: null,
  } as Frequency,
  notifications: {} as Notifications,
  priority: 0,
  updatedAt: Timestamp.now(),
  deleted: false,
  active: true,
};
