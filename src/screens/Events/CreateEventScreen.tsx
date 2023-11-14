import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, CheckBox, Input } from '@rneui/themed';
import CustomDropdown from '@components/CustomDropdown';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DayFieldsRenderer from './DayFieldsRenderer';
import CustomToast from '@src/components/CustomToast';
import { getAuth } from 'firebase/auth';
import { convertTimestampToDate } from '@src/utils/utils';
import { createDatetimeTimezone } from '@src/utils/utils';
import { days, priorities, times, cyclicValues } from '@src/redux/events/events.constants';
import { t } from '@src/localization/Localization';
import Colors from '@src/constants/Colors';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { createEvent } from '@src/redux/events/events.actions';
import { Timestamp } from 'firebase/firestore';
import { goBack } from '@src/navigation/navigationUtils';
import { Event, Tag, Tags } from '@src/models';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { selectTags, selectTheme, selectUserID } from '@src/redux/auth/auth.slice';
import TagView from '../Account/Tag';

const CreateEventScreen = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => selectTheme(state));
  const userID = useAppSelector(state => selectUserID(state));
  const tags = useAppSelector(state => selectTags(state));
  const currentTheme = Colors[theme];

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);

  const NewEventSchema = Yup.object().shape({
    title: Yup.string().min(1).required(),
    tags: Yup.mixed<Tag>(),
    description: Yup.string(),
    date: Yup.mixed<Timestamp>().nonNullable().required(),
    days: Yup.array().required(),
    priority: Yup.number().required(),
    isCyclic: Yup.boolean().required(),
    cyclicTime: Yup.number(),
    isNotification: Yup.boolean().required(),
    notificationTime: Yup.number(),
    userUid: Yup.string().nonNullable().required(),
    createdAt: Yup.mixed<Timestamp>().required(),
    updatedAt: Yup.mixed<Timestamp>().required(),
    deleted: Yup.boolean().required(),
    active: Yup.boolean().required(),
  });

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Text style={styles.header}>{t('createEvent.title')}</Text>
      <Formik
        initialValues={{
          title: '',
          tags: [] as Tags,
          description: '',
          date: null,
          days: days.map(day => ({ ...day, active: false })),
          priority: 0,
          isCyclic: false,
          cyclicTime: 0,
          isNotification: true,
          notificationTime: 0,
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
                placeholder={'Wybierz znacznik wydarzenia...'}
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
            <Button
              onPress={() => setShowDatePicker(true)}
              containerStyle={{ minWidth: '95%', borderRadius: 25 }}
              title={
                values.date
                  ? t('createEvent.button.title.date', {
                      date: convertTimestampToDate(values.date, 'DD-MM-YYYY HH:mm'),
                    })
                  : t('createEvent.button.title.emptyDate')
              }
            />
            {values.date && (
              <DayFieldsRenderer
                days={values.days}
                startDate={values.date}
                setFieldValue={setFieldValue}
              />
            )}

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
                }}
              />
            )}
            <View style={styles.inlineView}>
              <CheckBox
                title={t('createEvent.button.title.notification')}
                checked={values.isNotification}
                onPress={() => setFieldValue('isNotification', !values.isNotification)}
              />
              <CheckBox
                title={t('createEvent.button.title.cyclic')}
                checked={values.isCyclic}
                onPress={() => setFieldValue('isCyclic', !values.isCyclic)}
              />
            </View>
            {values.isNotification && (
              <CustomDropdown
                data={times}
                placeholder={t('createEvent.button.placeholder.notificationTime')}
                value={values.notificationTime}
                handleChange={(e: any) => setFieldValue('notificationTime', e.value)}
              />
            )}
            {values.isCyclic && (
              <CustomDropdown
                data={cyclicValues}
                placeholder={t('createEvent.button.placeholder.cyclicTime')}
                handleChange={(e: any) => setFieldValue('cyclicTime', e.value)}
              />
            )}
            <CustomDropdown
              data={priorities}
              placeholder={t('createEvent.button.placeholder.priority')}
              value={values.priority}
              handleChange={(e: any) => setFieldValue('priority', e.value)}
            />
            <Button
              title={t('createEvent.button.submit')}
              buttonStyle={styles.buttonSubmit}
              containerStyle={styles.buttonSubmitContainer}
              titleStyle={styles.buttonSubmitTitle}
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
    borderRadius: 25,
  },
  buttonSubmitTitle: {
    marginHorizontal: 20,
  },
  buttonSubmitContainer: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
});

export default CreateEventScreen;
