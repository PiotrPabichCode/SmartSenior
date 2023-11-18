import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomToast from '@src/components/CustomToast';
import { priorities } from '@src/redux/events/events.constants';
import { t } from '@src/localization/Localization';
import Colors from '@src/constants/Colors';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { createEvent, createRecurringEvents } from '@src/redux/events/events.actions';
import { Timestamp } from 'firebase/firestore';
import { goBack } from '@src/navigation/navigationUtils';
import { Event, Frequency, Image, Images, Notifications, Tag, Tags } from '@src/models';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { selectTags, selectTheme, selectUserID } from '@src/redux/auth/auth.slice';
import MultipleImagePicker from '@src/components/MultipleImagePicker';
import { Days } from './DayField';
import {
  Notification,
  Priority,
  CustomRecurring,
  SpecificDaysRecurring,
  RecurringType,
  EndDatePicker,
  EndDateButton,
  NotificationsCheckbox,
  RecurringCheckbox,
  TimePicker,
  DatePicker,
  CreateButton,
  Description,
  Title,
  TagsPicker,
  TagsDisplay,
  DateButton,
} from './components';

const CreateEventScreen = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => selectTheme(state));
  const userID = useAppSelector(state => selectUserID(state));
  const tags = useAppSelector(state => selectTags(state));
  const currentTheme = Colors[theme];

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);

  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);

  const [recurringValue, setRecurringValue] = useState(null);

  const NewEventSchema = Yup.object().shape({
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
    userUid: Yup.string().nonNullable().required(),
    createdAt: Yup.mixed<Timestamp>().required(),
    updatedAt: Yup.mixed<Timestamp>().required(),
    deleted: Yup.boolean().required(),
    active: Yup.boolean().required(),
  });

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Text style={{ fontSize: 30, fontWeight: '600', textAlign: 'center' }}>
        {t('createEvent.title')}
      </Text>
      <Formik
        initialValues={{
          key: '',
          groupKey: Date.now().toString(36),
          title: '',
          tags: [] as Tags,
          images: [] as Images,
          description: '',
          date: null as Timestamp | null,
          days: undefined as Days | undefined,
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
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          deleted: false,
          active: true,
          userUid: userID,
        }}
        onSubmit={values => {
          try {
            values.createdAt = Timestamp.now();
            values.updatedAt = Timestamp.now();
            const createValues = { ...values };
            delete createValues.days;
            NewEventSchema.validate(createValues)
              .then(async () => {
                if (!values.frequency.recurring) {
                  await dispatch(createEvent(values as Event)).unwrap();
                } else {
                  await dispatch(createRecurringEvents(values as Event)).unwrap();
                }
                CustomToast('success', t('createEvent.message.success.add'));
                goBack();
              })
              .catch(error => {
                console.log(error);
                CustomToast('error', t('error.missingData'));
              });
          } catch (error) {
            console.log(error);
            CustomToast('error', t('error.unknown'));
          }
        }}>
        {({ values, handleChange, setFieldValue, handleSubmit }) => (
          <>
            <Title value={values.title} onChange={handleChange} />
            <TagsDisplay selectedTags={values.tags} onPress={setFieldValue} />
            <TagsPicker tags={tags} selectedTags={values.tags} onChange={setFieldValue} />
            <Description value={values.description} onChange={handleChange} />
            <MultipleImagePicker onChange={setFieldValue} />
            <DateButton date={values.date} onPress={setShowDatePicker} />
            <DatePicker
              isVisible={showDatePicker}
              date={values.date}
              onChange={setDateValue}
              onClose={setShowDatePicker}
              onTimePickerOpen={setShowTimePicker}
            />
            <TimePicker
              isVisible={showTimePicker}
              newDate={dateValue}
              date={values.date}
              endDate={values.frequency.endDate}
              onChange={setFieldValue}
              onClose={setShowTimePicker}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                paddingHorizontal: 21,
              }}>
              <NotificationsCheckbox
                checked={values.notifications.enable}
                onPress={setFieldValue}
              />
              <RecurringCheckbox
                checked={values.frequency.recurring}
                date={values.date}
                onChange={setFieldValue}
              />
            </View>
            <EndDateButton
              isRecurring={values.frequency.recurring}
              onPress={setShowEndDatePicker}
              endDate={values.frequency.endDate}
            />
            <EndDatePicker
              isVisible={showEndDatePicker}
              date={values.date}
              endDate={values.frequency.endDate}
              onChange={setFieldValue}
              onClose={setShowEndDatePicker}
            />
            <RecurringType
              endDate={values.frequency.endDate}
              value={values.frequency.type}
              onChange={setFieldValue}
            />
            <SpecificDaysRecurring
              isRecurring={values.frequency.recurring}
              startDate={values.frequency.startDate}
              endDate={values.frequency.endDate}
              daysOfWeek={values.frequency.daysOfWeek}
              type={values.frequency.type}
              onChange={setFieldValue}
            />
            <CustomRecurring
              isRecurring={values.frequency.recurring}
              type={values.frequency.type}
              startDate={values.frequency.startDate}
              endDate={values.frequency.endDate}
              value={recurringValue}
              onValueChange={setRecurringValue}
              onChange={setFieldValue}
            />
            <Notification
              enabled={values.notifications.enable}
              onChange={setFieldValue}
              timeBefore={values.notifications.timeBefore}
            />
            <Priority onChange={setFieldValue} priority={values.priority} />
            <CreateButton onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </CustomScrollContainer>
  );
};

export default CreateEventScreen;
