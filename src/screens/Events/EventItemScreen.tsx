import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigation/types';
import { convertTimestampToDate, createDatetimeTimezone, getUpdatedFields } from '@src/utils/utils';
import { View, StyleSheet } from 'react-native';
import DayFieldsRenderer from './DayFieldsRenderer';
import CustomDropdown from '@src/components/CustomDropdown';
import { Button, CheckBox, Input } from '@rneui/themed';
import { days, cyclicValues, times, priorities } from '@src/redux/events/events.constants';
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomToast from '@src/components/CustomToast';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Colors from '@src/constants/Colors';
import FormikObserver from '@src/utils/FormikObserver';
import DiscardChangesAlert from '@src/components/DiscardChangesAlert';
import Localization, { t } from '@src/localization/Localization';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { updateEvent } from '@src/redux/events/events.actions';
import { goBack } from '@src/navigation/navigationUtils';
import { Timestamp } from 'firebase/firestore';
import { Event } from '@src/models';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { selectEventByKey } from '@src/redux/events/events.slice';

type Props = NativeStackScreenProps<RootStackParamList, 'EventItem'>;

const EventItemScreen = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];
  const styles = useStyles(currentTheme);
  const { eventKey } = route.params;
  const event = useAppSelector(state => selectEventByKey(state, eventKey));

  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);

  if (!event) {
    goBack();
    return null;
  }

  const ChangeEventSchema = Yup.object().shape({
    title: Yup.string().min(1).required(),
    description: Yup.string(),
    date: Yup.mixed<Timestamp>().nonNullable().required(),
    days: Yup.array().required(),
    priority: Yup.number().required(),
    isCyclic: Yup.boolean().required(),
    cyclicTime: Yup.number(),
    isNotification: Yup.boolean().required(),
    notificationTime: Yup.number(),
    userUid: Yup.string().nonNullable().required(),
    createdAt: Yup.mixed<Timestamp>(),
    updatedAt: Yup.mixed<Timestamp>().required(),
    deleted: Yup.boolean().required(),
  });

  const [initialValues, setInitialValues] = useState({
    title: event.title,
    description: event.description,
    date: event.date,
    days: Object.values(event.days).map(day => ({
      ...day,
    })),
    priority: event.priority,
    isCyclic: event.isCyclic,
    cyclicTime: event.cyclicTime,
    isNotification: event.isNotification,
    notificationTime: event.notificationTime,
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
            const updatedFields = getUpdatedFields(event, values);
            ChangeEventSchema.validate(values)
              .then(async () => {
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
            <Input
              placeholder={t('eventItemScreen.button.placeholder.title')}
              onChangeText={handleChange('title')}
              value={values.title}
            />
            <Input
              placeholder={t('eventItemScreen.button.placeholder.description')}
              multiline={true}
              onChangeText={handleChange('description')}
              value={values.description}
            />
            <Button
              onPress={() => setShowDatePicker(true)}
              title={
                values.date
                  ? t('eventItemScreen.button.title.date', {
                      date: convertTimestampToDate(values.date, 'DD-MM-YYYY HH:mm'),
                    })
                  : t('eventItemScreen.button.title.emptyDate')
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
                value={values.date ? new Date(values.date.seconds) : new Date()}
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
                value={values.date ? new Date(values.date.seconds) : new Date()}
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
                  setFieldValue('executionTime', Timestamp.fromMillis(datetime.getTime()));
                }}
              />
            )}
            <View style={styles.inlineView}>
              <CheckBox
                title={t('eventItemScreen.button.title.notification')}
                checked={values.isNotification}
                onPress={() => setFieldValue('isNotification', !values.isNotification)}
              />
              <CheckBox
                title={t('eventItemScreen.button.title.cyclic')}
                checked={values.isCyclic}
                onPress={() => setFieldValue('isCyclic', !values.isCyclic)}
              />
            </View>
            {values.isNotification && (
              <CustomDropdown
                data={times}
                placeholder={t('eventItemScreen.button.placeholder.notificationTime')}
                value={values.notificationTime}
                handleChange={(e: any) => setFieldValue('notificationTime', e.value)}
              />
            )}
            {values.isCyclic && Localization.localizationReady && (
              <CustomDropdown
                data={cyclicValues}
                placeholder={t('eventItemScreen.button.placeholder.cyclicTime')}
                value={values.cyclicTime}
                handleChange={(e: any) => setFieldValue('cyclicTime', e.value)}
              />
            )}
            <CustomDropdown
              data={priorities}
              placeholder={t('eventItemScreen.button.placeholder.priority')}
              value={values.priority}
              handleChange={(e: any) => setFieldValue('priority', e.value)}
            />
            {isUpdate && (
              <Button
                title={t('eventItemScreen.button.title.update')}
                buttonStyle={styles.buttonUpdate}
                containerStyle={styles.buttonContainer}
                onPress={() => handleSubmit()}
              />
            )}
            <Button
              title={t('eventItemScreen.button.title.execute')}
              buttonStyle={styles.buttonSubmit}
              containerStyle={styles.buttonContainer}
              onPress={() => handleSubmit()}
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

const useStyles = (theme: any) =>
  StyleSheet.create({
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
      backgroundColor: 'darkblue',
      borderRadius: 25,
    },
    buttonUpdate: {
      backgroundColor: Colors.black,
      borderRadius: 25,
    },
    buttonContainer: {
      alignSelf: 'stretch',
    },
  });

export default EventItemScreen;
