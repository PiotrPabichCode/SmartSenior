import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, CheckBox, Input } from '@rneui/themed';
import CustomDropdown from '@components/CustomDropdown';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DayFieldsRenderer from './DayFieldsRenderer';
import CustomToast from '@src/components/CustomToast';
import { getAuth } from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import { renderLocalDateWithTime } from '@src/utils/utils';
import { createDatetimeTimezone } from '@src/utils/utils';
import { days, priorities, times, cyclicValues } from '@src/redux/events/events.constants';
import { t } from '@src/localization/Localization';
import { Theme } from '@src/redux/types';
import Colors from '@src/constants/Colors';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { createEvent } from '@src/redux/events/events.actions';
import { EventDetails } from '@src/redux/events/events.types';

const CreateEventScreen = () => {
  const dispatch = useAppDispatch();
  const theme: Theme = useAppSelector(state => state.auth.theme);
  const currentTheme = Colors[theme];

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);
  const [timeValue, setTimeValue] = useState<Date | undefined>(undefined);

  const NewEventSchema = Yup.object().shape({
    title: Yup.string().min(1).required(),
    description: Yup.string(),
    executionTime: Yup.number().min(Date.now()).nonNullable().required(),
    days: Yup.array().required(),
    priority: Yup.number().required(),
    isCyclic: Yup.boolean().required(),
    cyclicTime: Yup.number(),
    isNotification: Yup.boolean().required(),
    notificationTime: Yup.number(),
    userUid: Yup.string().nonNullable().required(),
    createdAt: Yup.number().min(Date.now()).required(),
    updatedAt: Yup.number().min(Date.now()).required(),
    deleted: Yup.boolean().required(),
  });

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Text style={styles.header}>{t('createEvent.title')}</Text>
      <Formik
        initialValues={{
          title: '',
          description: '',
          executionTime: 0,
          days: days.map(day => ({ ...day, active: false })),
          priority: 0,
          isCyclic: false,
          cyclicTime: 0,
          isNotification: true,
          notificationTime: 0,
          createdAt: 0,
          updatedAt: 0,
          deleted: false,
          userUid: getAuth().currentUser?.uid + '-deleted-false',
        }}
        onSubmit={values => {
          try {
            values.createdAt = Date.now();
            values.updatedAt = Date.now();
            NewEventSchema.validate(values)
              .then(async () => {
                await dispatch(createEvent(values as EventDetails));
                CustomToast('success', t('createEvent.message.success.add'));
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
            <Input
              placeholder={t('createEvent.button.placeholder.description')}
              multiline={true}
              onChangeText={handleChange('description')}
              value={values.description}
            />
            <Button
              onPress={() => setShowDatePicker(true)}
              title={
                values.executionTime !== 0
                  ? t('createEvent.button.title.date', {
                      date: renderLocalDateWithTime(values.executionTime),
                    })
                  : t('createEvent.button.title.emptyDate')
              }
            />
            {values.executionTime !== 0 && (
              <DayFieldsRenderer
                days={values.days}
                startDate={values.executionTime}
                setFieldValue={setFieldValue}
              />
            )}

            {showDatePicker && (
              <RNDateTimePicker
                value={new Date()}
                minimumDate={new Date()}
                onChange={(e, newDate) => {
                  setFieldValue(
                    'days',
                    days.map(day => ({
                      ...day,
                      active: false,
                    })),
                  ).then(() => {
                    setShowDatePicker(false);
                    if (e.type === 'dismissed') {
                      return false;
                    }
                    setDateValue(newDate);
                    setShowTimePicker(true);
                  });
                }}
              />
            )}
            {showTimePicker && (
              <RNDateTimePicker
                value={new Date()}
                mode="time"
                onChange={(e, newTime) => {
                  setShowTimePicker(false);
                  if (e.type === 'dismissed') {
                    return false;
                  }
                  setTimeValue(newTime);
                  const datetime = createDatetimeTimezone(dateValue, timeValue);
                  if (!datetime) {
                    return false;
                  }
                  setFieldValue(`days[${datetime.getDay() - 1}].active`, true);
                  setFieldValue('executionTime', datetime.getTime());
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
                value={values.cyclicTime}
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
