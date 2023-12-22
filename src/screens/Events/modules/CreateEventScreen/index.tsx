import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { t } from '@src/localization/Localization';
import {
  CustomScrollContainer,
  MultipleImagePicker,
  CustomToast,
  CustomActivityIndicator,
} from '@src/components';
import { createEventGroup } from '@src/redux/events/events.actions';
import { Timestamp } from 'firebase/firestore';
import { goBack } from '@src/navigation/navigationUtils';
import { Event } from '@src/models';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { selectTags, selectUserID } from '@src/redux/auth/auth.slice';
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
} from '../components';
import { selectEventsStatus } from '@src/redux/events/events.slice';
import { NewEventSchema } from './utils';
import { Text } from '@rneui/themed';
import { initialValues } from './types';

const CreateEventScreen = () => {
  const dispatch = useAppDispatch();
  const userID = useAppSelector(state => selectUserID(state));
  const tags = useAppSelector(state => selectTags(state));
  const status = useAppSelector(state => selectEventsStatus(state));

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);

  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);

  const [recurringValue, setRecurringValue] = useState(null);

  if (status === 'pending') {
    return <CustomActivityIndicator />;
  }

  return (
    <CustomScrollContainer>
      <Text h3>{t('createEvent.title')}</Text>
      <Formik
        initialValues={{ ...initialValues, userUid: userID }}
        onSubmit={values => {
          try {
            values.updatedAt = Timestamp.now();
            NewEventSchema.validate(values)
              .then(async () => {
                await dispatch(createEventGroup(values as Event)).unwrap();
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
            <TagsDisplay selectedTags={values.tags} fieldName={'tags'} onPress={setFieldValue} />
            <TagsPicker
              tags={tags}
              selectedTags={values.tags}
              fieldName={'tags'}
              onChange={setFieldValue}
            />
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
            <View style={styles.checkboxContainer}>
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
            <CreateButton onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </CustomScrollContainer>
  );
};

export default CreateEventScreen;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 21,
  },
});
