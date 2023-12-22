import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { selectEventsGroupByKey, selectEventsStatus } from '@src/redux/events/events.slice';
import { goBack } from '@src/navigation/navigationUtils';
import { EventsGroupDetailsProps } from '@src/navigation/types';
import {
  CustomScrollContainer,
  CustomActivityIndicator,
  CustomToast,
  MultipleImagePicker,
  DiscardChangesAlert,
} from '@src/components';
import { selectTags } from '@src/redux/auth/auth.slice';
import { Formik } from 'formik';
import { Timestamp } from 'firebase/firestore';
import { getUpdatedFields } from '@src/utils/utils';
import { t } from '@src/localization/Localization';
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
import { Tag, Tags } from '@src/models';
import FormikObserver from '@src/utils/FormikObserver';
import { updateEventsGroup } from '@src/redux/events/events.actions';
import { ChangeEventSchema, filterTags } from './utils';
import { usePrepareEventsGroup } from './usePrepareEventsGroup';

const EventsGroupDetails = ({ route, navigation }: EventsGroupDetailsProps) => {
  const dispatch = useAppDispatch();
  const { groupKey } = route.params;
  const eventsGroup = useAppSelector(state => selectEventsGroupByKey(state, groupKey));
  const status = useAppSelector(state => selectEventsStatus(state));
  const tags = useAppSelector(state => selectTags(state));
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);

  if (!eventsGroup) {
    goBack();
    return null;
  }

  const { initialValues, setInitialValues, isReady, recurringValue, setRecurringValue } =
    usePrepareEventsGroup(eventsGroup);

  if (!isReady || status === 'pending') {
    return <CustomActivityIndicator />;
  }

  if (!initialValues) {
    goBack();
    return null;
  }
  return (
    <CustomScrollContainer>
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
              selectedTags={filterTags(
                tags,
                values.tags.map((t: Tag) => t.id),
              )}
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

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 21,
  },
});
