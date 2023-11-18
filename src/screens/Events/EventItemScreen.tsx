import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigation/types';
import { getUpdatedFields } from '@src/utils/utils';
import { View, StyleSheet } from 'react-native';
import {
  days,
  priorities,
  RecurringValues,
  recurringTimes,
} from '@src/redux/events/events.constants';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomToast from '@src/components/CustomToast';
import Colors from '@src/constants/Colors';
import FormikObserver from '@src/utils/FormikObserver';
import DiscardChangesAlert from '@src/components/DiscardChangesAlert';
import { t } from '@src/localization/Localization';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { updateEvent } from '@src/redux/events/events.actions';
import { goBack } from '@src/navigation/navigationUtils';
import { Timestamp } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { selectTags, selectTheme } from '@src/redux/auth/auth.slice';
import { selectEventByKey } from '@src/redux/events/events.slice';
import { Frequency, Image, Notifications, Tag } from '@src/models';
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

type Props = NativeStackScreenProps<RootStackParamList, 'EventItem'>;

const EventItemScreen = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => selectTheme(state));
  const tags = useAppSelector(state => selectTags(state));
  const currentTheme = Colors[theme];
  const { eventKey } = route.params;
  const event = useAppSelector(state => selectEventByKey(state, eventKey));

  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);

  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);

  const [recurringValue, setRecurringValue] = useState<RecurringValues | null>(null);

  if (!event) {
    return null;
  }

  useEffect(() => {
    const updateRecurringValue = () => {
      const interval = event.frequency.interval;
      const unit = event.frequency.unit;
      const matchedValue = recurringTimes.find(
        r => r.interval === interval && r.unit === unit,
      )?.value;
      if (matchedValue) {
        setRecurringValue(matchedValue);
      }
    };
    updateRecurringValue();
  }, [event]);

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
    updatedAt: Yup.mixed<Timestamp>().required(),
    deleted: Yup.boolean().required(),
  });

  const createDays = (data: Array<number> | null) => {
    if (!data) {
      return days.map(day => ({ ...day, active: false }));
    }
    return days.map(day => ({ ...day, active: data.includes(day.value) ? true : false }));
  };

  const [initialValues, setInitialValues] = useState({
    title: event.title,
    tags: event.tags,
    images: event.images,
    description: event.description,
    date: event.date,
    days: createDays(event.frequency.daysOfWeek),
    frequency: event.frequency,
    notifications: event.notifications,
    priority: event.priority,
    updatedAt: event.updatedAt,
    deleted: event.deleted,
    userUid: event.userUid,
  });

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
                await dispatch(updateEvent({ eventKey: eventKey, data: updatedFields })).unwrap();
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
              selectedTags={values.tags}
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
            <CompleteButton onPress={handleSubmit} />
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
