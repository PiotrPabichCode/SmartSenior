import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, CheckBox, Input } from '@rneui/themed';
import CustomDropdown from '@components/CustomDropdown';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DayFieldsRenderer from './DayFieldsRenderer';
import CustomToast from '@src/components/CustomToast';
import { convertTimestampToDate } from '@src/utils/utils';
import { createDatetimeTimezone } from '@src/utils/utils';
import {
  days,
  priorities,
  times,
  recurringTypes,
  recurringTimes,
  RecurringValues,
} from '@src/redux/events/events.constants';
import { t } from '@src/localization/Localization';
import Colors from '@src/constants/Colors';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { createEvent } from '@src/redux/events/events.actions';
import { Timestamp } from 'firebase/firestore';
import { goBack } from '@src/navigation/navigationUtils';
import { Event, Frequency, Image, Images, Notifications, Tag, Tags } from '@src/models';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { selectTags, selectTheme, selectUserID } from '@src/redux/auth/auth.slice';
import TagView from '../Account/Tags/Tag';
import MultipleImagePicker from '@src/components/MultipleImagePicker';

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
    priority: Yup.number().required(),
    userUid: Yup.string().nonNullable().required(),
    createdAt: Yup.mixed<Timestamp>().required(),
    updatedAt: Yup.mixed<Timestamp>().required(),
    deleted: Yup.boolean().required(),
    active: Yup.boolean().required(),
  });

  const getStartingEndDate = (date: Timestamp) => {
    const newDate = date.toDate();
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
  };

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Text style={styles.header}>{t('createEvent.title')}</Text>
      <Formik
        initialValues={{
          key: '',
          title: '',
          tags: [] as Tags,
          images: [] as Images,
          description: '',
          date: null as Timestamp | null,
          days: days.map(day => ({ ...day, active: false })),
          frequency: {
            recurring: false,
            type: null,
            daysOfWeek: null,
            unit: 'day',
            interval: null,
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
            console.log(values);
            return;
            NewEventSchema.validate(values)
              .then(async () => {
                await dispatch(createEvent(values as Event)).unwrap();
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
            <Input
              placeholder={t('createEvent.button.placeholder.title')}
              onChangeText={handleChange('title')}
              value={values.title}
            />
            {values.tags.length > 0 && (
              <View style={{ gap: 10 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
                  {t('tags.selected')}
                </Text>
                {values.tags.map((tag, index) => {
                  return (
                    <TagView
                      key={index}
                      color={tag.color}
                      name={tag.name}
                      id={tag.id}
                      onPress={() => {
                        setFieldValue(
                          'tags',
                          values.tags.filter(t => t.id !== tag.id),
                        );
                      }}
                    />
                  );
                })}
              </View>
            )}
            {tags?.length !== values.tags.length && (
              <CustomDropdown
                data={
                  tags
                    ? tags.filter(tag => !values.tags.some(valueTag => valueTag.name === tag.name))
                    : []
                }
                labelField={'name'}
                valueField={'id'}
                placeholder={t('tags.selectPlaceholder')}
                value={values.tags}
                handleChange={(e: any) => {
                  setFieldValue('tags', [...values.tags, tags?.find(tag => tag.id === e.id)]);
                }}
              />
            )}
            <Input
              placeholder={t('createEvent.button.placeholder.description')}
              multiline={true}
              onChangeText={handleChange('description')}
              value={values.description}
            />
            <MultipleImagePicker onChange={setFieldValue} />
            <Button
              size="lg"
              onPress={() => setShowDatePicker(true)}
              buttonStyle={{ backgroundColor: 'green' }}
              containerStyle={{ minWidth: '90%', borderRadius: 25 }}
              title={
                values.date
                  ? t('createEvent.button.title.date', {
                      date: convertTimestampToDate(values.date, 'DD-MM-YYYY HH:mm'),
                    })
                  : t('createEvent.button.title.emptyDate')
              }
            />

            {showDatePicker && (
              <RNDateTimePicker
                value={values.date ? new Date((values.date as Timestamp).seconds) : new Date()}
                minimumDate={new Date()}
                onChange={(e, newDate) => {
                  setShowDatePicker(false);
                  if (e.type !== 'set') {
                    return false;
                  }
                  setDateValue(newDate);
                  setShowTimePicker(true);
                }}
              />
            )}
            {showTimePicker && (
              <RNDateTimePicker
                value={values.date ? new Date((values.date as Timestamp).seconds) : new Date()}
                mode="time"
                onChange={(e, newTime) => {
                  setShowTimePicker(false);
                  if (e.type !== 'set') {
                    return false;
                  }
                  const datetime = createDatetimeTimezone(dateValue, newTime);
                  if (!datetime) {
                    return false;
                  }
                  setFieldValue(
                    'days',
                    days.map(day => ({
                      ...day,
                      active: false,
                    })),
                  );
                  setFieldValue(`days[${datetime.getDay() - 1}].active`, true);
                  setFieldValue('date', Timestamp.fromMillis(datetime.getTime()));
                  if (
                    values.frequency.endDate &&
                    Timestamp.fromMillis(datetime.getTime()) >= values.frequency.endDate
                  ) {
                    setFieldValue('frequency.endDate', null);
                  }
                }}
              />
            )}
            <View style={styles.inlineView}>
              <CheckBox
                title={t('createEvent.button.title.notification')}
                checked={values.notifications.enable}
                onPress={() => setFieldValue('notifications.enable', !values.notifications.enable)}
              />
              <CheckBox
                title={t('createEvent.button.title.cyclic')}
                checked={values.frequency.recurring}
                onPress={() => {
                  if (!values.date) {
                    const now = Timestamp.now();
                    setFieldValue('date', now);
                    setFieldValue(
                      'days',
                      days.map(d => ({
                        ...d,
                        active: d.value === now.toDate().getDay() ? true : false,
                      })),
                    );
                    setFieldValue('frequency.daysOfWeek', [now.toDate().getDay()]);
                  }
                  setFieldValue('frequency.recurring', !values.frequency.recurring);
                }}
              />
            </View>
            {values.frequency.recurring && (
              <Button
                size="lg"
                onPress={() => setShowEndDatePicker(true)}
                containerStyle={{ minWidth: '90%', borderRadius: 25 }}
                title={
                  values.frequency.endDate
                    ? t('createEvent.button.title.endDate', {
                        endDate: convertTimestampToDate(
                          values.frequency.endDate,
                          'DD-MM-YYYY HH:mm',
                        ),
                      })
                    : t('createEvent.button.title.endDateEmpty')
                }
              />
            )}
            {showEndDatePicker && values.date && (
              <RNDateTimePicker
                value={
                  values.frequency.endDate
                    ? values.frequency.endDate.toDate()
                    : values.date.toDate()
                }
                minimumDate={getStartingEndDate(values.date)}
                onChange={(e, newDate) => {
                  setShowEndDatePicker(false);
                  if (e.type !== 'set' || !newDate) {
                    return false;
                  }
                  newDate.setHours(0);
                  newDate.setMinutes(0);
                  newDate.setSeconds(0);
                  newDate.setMilliseconds(0);
                  if (values.date && values.date.toDate().getTime() >= newDate.getTime()) {
                    newDate.setDate(newDate.getDate() + 1);
                  }

                  setFieldValue('frequency.endDate', Timestamp.fromDate(newDate));
                }}
              />
            )}
            {values.frequency.recurring && (
              <CustomDropdown
                data={recurringTypes}
                placeholder={t('createEvent.button.placeholder.recurringType')}
                value={values.frequency.type}
                handleChange={(e: any) => setFieldValue('frequency.type', e.value)}
              />
            )}
            {values.frequency.recurring && values.frequency.type === 'specificDays' && (
              <DayFieldsRenderer
                days={values.days}
                startDate={values.date || Timestamp.now()}
                setFieldValue={setFieldValue}
              />
            )}
            {values.frequency.recurring && values.frequency.type === 'custom' && (
              <CustomDropdown
                data={recurringTimes}
                placeholder={t('createEvent.button.placeholder.customRecurring')}
                value={recurringValue}
                handleChange={(e: any) => {
                  const type = e.value;
                  setRecurringValue(type);
                  if (type === RecurringValues.EVERYDAY) {
                    setFieldValue('frequency.unit', 'day');
                    setFieldValue('frequency.interval', 1);
                  } else if (type === RecurringValues.EVERY_2_DAYS) {
                    setFieldValue('frequency.unit', 'day');
                    setFieldValue('frequency.interval', 2);
                  } else if (type === RecurringValues.EVERY_WEEK) {
                    setFieldValue('frequency.unit', 'week');
                    setFieldValue('frequency.interval', 1);
                  } else if (type === RecurringValues.EVERY_MONTH) {
                    setFieldValue('frequency.unit', 'month');
                    setFieldValue('frequency.interval', 1);
                  } else if (type === RecurringValues.EVERY_3_MONTHS) {
                    setFieldValue('frequency.unit', 'month');
                    setFieldValue('frequency.interval', 3);
                  } else if (type === RecurringValues.EVERY_6_MONTHS) {
                    setFieldValue('frequency.unit', 'month');
                    setFieldValue('frequency.interval', 6);
                  } else if (type === RecurringValues.EVERY_YEAR) {
                    setFieldValue('frequency.unit', 'month');
                    setFieldValue('frequency.interval', 12);
                  }
                }}
              />
            )}
            {values.notifications.enable && (
              <CustomDropdown
                data={times}
                placeholder={t('createEvent.button.placeholder.notificationTime')}
                value={values.notifications.timeBefore}
                handleChange={(e: any) => setFieldValue('notifications.timeBefore', e.value)}
              />
            )}
            <CustomDropdown
              data={priorities}
              placeholder={t('createEvent.button.placeholder.priority')}
              value={values.priority}
              handleChange={(e: any) => setFieldValue('priority', e.value)}
            />
            <Button
              size="lg"
              title={t('createEvent.button.submit')}
              buttonStyle={styles.buttonSubmit}
              containerStyle={styles.buttonSubmitContainer}
              onPress={() => handleSubmit()}
            />
          </>
        )}
      </Formik>
    </CustomScrollContainer>
  );
};

const styles = StyleSheet.create({
  inlineView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 21,
  },
  header: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  buttonSubmit: {
    backgroundColor: 'rgba(127, 220, 103, 1)',
  },
  buttonSubmitContainer: {
    minWidth: '95%',
    borderRadius: 25,
  },
});

export default CreateEventScreen;
