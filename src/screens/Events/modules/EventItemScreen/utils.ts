import { Frequency, Image, Notifications, Tag } from '@src/models';
import { priorities } from '@src/redux/events/events.constants';
import { Timestamp } from 'firebase/firestore';
import * as Yup from 'yup';

export const ChangeEventSchema = Yup.object().shape({
  title: Yup.string().min(1).required(),
  tags: Yup.mixed<Tag>(),
  images: Yup.mixed<Image>(),
  description: Yup.string(),
  date: Yup.mixed<Timestamp>().nonNullable().required(),
  frequency: Yup.mixed<Frequency>().required(),
  notifications: Yup.mixed<Notifications>().required(),
  priority: Yup.number()
    .test('is-valid-priority', 'Invalid priority value', function (value) {
      return priorities.some(p => p.value === value);
    })
    .required(),
  deleted: Yup.boolean().required(),
});
