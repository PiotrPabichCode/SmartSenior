import { View, Text, Modal } from 'react-native';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { selectEventsGroupByKey, selectEventsStatus } from '@src/redux/events/events.slice';
import { goBack } from '@src/navigation/navigationUtils';
import { EventsGroupDetailsProps } from '@src/navigation/types';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { selectTags, selectTheme } from '@src/redux/auth/auth.slice';
import Colors from '@src/constants/Colors';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Timestamp } from 'firebase/firestore';
import { getUpdatedFields } from '@src/utils/utils';
import CustomToast from '@src/components/CustomToast';
import { t } from '@src/localization/Localization';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import {
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
} from '../components';
import { Frequency, Image, Notifications, Tag, Tags } from '@src/models';
import MultipleImagePicker from '@src/components/MultipleImagePicker';
import FormikObserver from '@src/utils/FormikObserver';
import DiscardChangesAlert from '@src/components/DiscardChangesAlert';
import { RecurringValues, priorities, recurringTimes } from '@src/redux/events/events.constants';
import { createDays, createImages, createTags } from '@src/redux/events/events.api';
import { updateEventsGroup } from '@src/redux/events/events.actions';

const EventsGroupDetails = ({ route, navigation }: EventsGroupDetailsProps) => {
  const dispatch = useAppDispatch();
  const { groupKey } = route.params;
  const eventsGroup = useAppSelector(state => selectEventsGroupByKey(state, groupKey));
  const status = useAppSelector(state => selectEventsStatus(state));
  const theme = useAppSelector(state => selectTheme(state));
  const tags = useAppSelector(state => selectTags(state));
  const [initialValues, setInitialValues] = useState<any>({});
  const [isReady, setIsReady] = useState(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);
  const [recurringValue, setRecurringValue] = useState<RecurringValues | null>(null);
  const currentTheme = Colors[theme];

  if (!eventsGroup) {
    goBack();
    return null;
  }

  if (status === 'pending') {
    return <CustomActivityIndicator />;
  }

  useEffect(() => {
    if (eventsGroup) {
      setInitialValues({
        title: eventsGroup.title,
        tags: createTags(eventsGroup.tags),
        images: createImages(eventsGroup.images),
        description: eventsGroup.description,
        date: eventsGroup.dates[0],
        days: createDays(eventsGroup.frequency.daysOfWeek),
        frequency: eventsGroup.frequency,
        notifications: eventsGroup.notifications,
        priority: eventsGroup.priority,
        deleted: eventsGroup.deleted,
        updatedAt: eventsGroup.updatedAt,
        userUid: eventsGroup.userID,
      });
      const interval = eventsGroup.frequency.interval;
      const unit = eventsGroup.frequency.unit;
      const matchedValue = recurringTimes.find(
        r => r.interval === interval && r.unit === unit,
      )?.value;
      if (matchedValue) {
        setRecurringValue(matchedValue);
      }
      setIsReady(true);
    }
  }, [eventsGroup]);

  if (!isReady) {
    return <CustomActivityIndicator />;
  }

  if (!initialValues) {
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
                const updatedFields = getUpdatedFields(initialValues, values);
                delete updatedFields.days;
                // console.log(updatedFields);
                await dispatch(updateEventsGroup({ key: groupKey, data: updatedFields })).unwrap();
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

export default EventsGroupDetails;
