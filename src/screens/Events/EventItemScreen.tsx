import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigation/types';
import {
  createDatetimeTimezone,
  getUpdatedFields,
  renderLocalDateWithTime,
} from '@src/utils/utils';
import { View, StyleSheet, ScrollView } from 'react-native';
import DayFieldsRenderer from './DayFieldsRenderer';
import CustomDropdown from '@src/components/CustomDropdown';
import { Button, CheckBox, Input } from '@rneui/themed';
import { days, cyclicValues, times, priorities } from '@src/redux/events/events.constants';
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomToast from '@src/components/CustomToast';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Colors from '@src/constants/Colors';
import FormikObserver from '@src/utils/FormikObserver';
import DiscardChangesAlert from '@src/components/DiscardChangesAlert';
import { EventDetails } from '@src/redux/events/events.types';
import Localization, { t } from '@src/localization/Localization';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { Theme } from '@src/redux/types';
import { updateEvent } from '@src/redux/events/events.actions';
import { goBack } from '@src/navigation/navigationUtils';

type Props = NativeStackScreenProps<RootStackParamList, 'EventItem'>;

const EventItemScreen = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch();
  const theme: Theme = useAppSelector(state => state.auth.theme);
  const currentTheme = Colors[theme];
  const styles = useStyles(currentTheme);
  const { eventKey } = route.params;
  const event: EventDetails = useAppSelector(state => state.events.events[eventKey]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  const [dateValue, setDateValue] = useState<Date | undefined>(undefined);
  const [timeValue, setTimeValue] = useState<Date | undefined>(undefined);

  const ChangeEventSchema = Yup.object().shape({
    title: Yup.string().min(1).required(),
    description: Yup.string(),
    executionTime: Yup.number().nonNullable().required(),
    days: Yup.array().required(),
    priority: Yup.number().required(),
    isCyclic: Yup.boolean().required(),
    cyclicTime: Yup.number(),
    isNotification: Yup.boolean().required(),
    notificationTime: Yup.number(),
    userUid: Yup.string().nonNullable().required(),
    createdAt: Yup.number(),
    updatedAt: Yup.number().required(),
    deleted: Yup.boolean().required(),
  });

  const [initialValues, setInitialValues] = useState({
    title: event.title,
    description: event.description,
    executionTime: event.executionTime,
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
            values.updatedAt = Date.now();
            const updatedFields = getUpdatedFields(event, values);
            ChangeEventSchema.validate(values)
              .then(async () => {
                await dispatch(
                  updateEvent({ eventKey: eventKey, data: updatedFields as EventDetails }),
                );
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
                values.executionTime !== 0
                  ? t('eventItemScreen.button.title.date', {
                      date: renderLocalDateWithTime(values.executionTime),
                    })
                  : t('eventItemScreen.button.title.emptyDate')
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
