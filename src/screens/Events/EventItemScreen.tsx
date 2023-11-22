import { EventItemScreenProps } from '@src/navigation/types';
import { getUpdatedFields } from '@src/utils/utils';
import { View } from 'react-native';
import { priorities, RecurringValues, recurringTimes } from '@src/redux/events/events.constants';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomToast from '@src/components/CustomToast';
import Colors from '@src/constants/Colors';
import FormikObserver from '@src/utils/FormikObserver';
import DiscardChangesAlert from '@src/components/DiscardChangesAlert';
import { t } from '@src/localization/Localization';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { goBack } from '@src/navigation/navigationUtils';
import { Timestamp } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { selectTags, selectTheme } from '@src/redux/auth/auth.slice';
import { selectEventByKey } from '@src/redux/events/events.slice';
import { Event, FirebaseEvent, Frequency, Image, Notifications, Tag, Tags } from '@src/models';
import MultipleImagePicker from '@src/components/MultipleImagePicker';
import {
  CompleteButton,
  CustomRecurring,
  DateButton,
  DatePicker,
  Description,
  EndDateButton,
  EndDatePicker,
  Notification,
  NotificationsCheckbox,
  Priority,
  RecurringCheckbox,
  RecurringType,
  SpecificDaysRecurring,
  TagsDisplay,
  TagsPicker,
  TimePicker,
  Title,
  UpdateButton,
} from './components';
import { getOrCreateEventForGroupAndDate, updateEvent } from '@src/redux/events/events.api';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';

const EventItemScreen = ({ route, navigation }: EventItemScreenProps) => {
  const dispatch = useAppDispatch();
  const [isReady, setIsReady] = useState<boolean>(false);
  const theme = useAppSelector(state => selectTheme(state));
  const tags = useAppSelector(state => selectTags(state));
  const [event, setEvent] = useState<Event | null>(null);
  const [initialValues, setInitialValues] = useState<any>({});
  const currentTheme = Colors[theme];
  const { groupKey, date } = route.params;
  // const event = useAppSelector(state => selectEventByKey(state, eventKey));

  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);

  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);

  const [recurringValue, setRecurringValue] = useState<RecurringValues | null>(null);

  // useEffect(() => {
  //   const updateRecurringValue = () => {
  //     const interval = event.frequency.interval;
  //     const unit = event.frequency.unit;
  //     const matchedValue = recurringTimes.find(
  //       r => r.interval === interval && r.unit === unit,
  //     )?.value;
  //     if (matchedValue) {
  //       setRecurringValue(matchedValue);
  //     }
  //   };
  //   updateRecurringValue();
  // }, [event]);

  useEffect(() => {
    const prepareEvent = async () => {
      console.log(groupKey, date);
      try {
        if (groupKey && date) {
          const event = await getOrCreateEventForGroupAndDate(groupKey, date);
          setEvent(event);
          setIsReady(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    prepareEvent();
  }, [groupKey, date]);

  useEffect(() => {
    if (event) {
      setInitialValues({
        title: event.title,
        tags: event.tags,
        images: event.images,
        description: event.description,
        date: event.date,
        days: event.days,
        frequency: event.frequency,
        notifications: event.notifications,
        priority: event.priority,
        deleted: event.deleted,
        completed: event.completed,
        userUid: event.userUid,
      });
    }
  }, [event]);

  if (!isReady) {
    return <CustomActivityIndicator />;
  }

  if (!event) {
    goBack();
    return null;
  }

  const ChangeEventSchema = Yup.object().shape({
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

  const filterTags = (tagIds: Array<string>) => {
    let selectedTags = [] as Tags;
    if (tags) {
      selectedTags = tags.filter(t => tagIds.includes(t.id));
    }

    return selectedTags;
  };

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={values => {
          try {
            values.updatedAt = Timestamp.now();
            ChangeEventSchema.validate(values)
              .then(async () => {
                const updatedFields = getUpdatedFields(event, values);
                delete updatedFields.days;
                await updateEvent(event.groupKey, event.key, updatedFields);
                setInitialValues(values);
                CustomToast('success', t('eventItemScreen.message.success.change'));
                goBack();
              })
              .catch(error => {
                console.log(error);
                CustomToast('error', t('eventItemScreen.message.error.change'));
              });
          } catch (error) {
            console.log(error);
            CustomToast('error', t('error.unknown'));
          }
        }}>
        {({ values, handleChange, setFieldValue, handleSubmit }) => (
          <>
            <Title value={values.title} onChange={handleChange} />
            <TagsDisplay selectedTags={values.tags} fieldName={'tags'} onPress={setFieldValue} />
            <TagsPicker
              tags={tags}
              selectedTags={filterTags(values.tags.map((t: Tag) => t.id))}
              fieldName={'tags'}
              onChange={setFieldValue}
            />
            <Description value={values.description} onChange={handleChange} />
            <MultipleImagePicker onChange={setFieldValue} initialValues={values.images} />
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
            <Priority onChange={setFieldValue} fieldName={'priority'} priority={values.priority} />
            <UpdateButton visible={isUpdate} onPress={handleSubmit} />
            <CompleteButton
              fieldName={'completed'}
              onChange={setFieldValue}
              onPress={handleSubmit}
            />
            <FormikObserver
              onChange={(data: any) => {
                const changedFields = getUpdatedFields(data.initialValues, data.values);
                if (Object.keys(changedFields).length > 0) {
                  setIsUpdate(true);
                } else {
                  setIsUpdate(false);
                }
              }}
            />
            <DiscardChangesAlert navigation={navigation} isUpdate={isUpdate} />
          </>
        )}
      </Formik>
    </CustomScrollContainer>
  );
};

export default EventItemScreen;
