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
import {
  cyclicValues,
  days,
  priorities,
  times,
} from '@src/redux/constants/eventsConstants';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomToast from '@src/components/CustomToast';
import { useAppDispatch } from '@src/redux/store';
import { updateEventAction } from '@src/redux/actions/eventsActions';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Colors from '@src/constants/Colors';
import FormikObserver from '@src/utils/FormikObserver';
import DiscardChangesAlert from '@src/components/DiscardChangesAlert';

type Props = NativeStackScreenProps<RootStackParamList, 'EventItem'>;

const EventItemScreen = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch();
  const { eventKey, event } = route.params;
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
    createdAt: Yup.number().required(),
    updatedAt: Yup.number().required(),
    deleted: Yup.boolean().required(),
  });

  return (
    <View style={styles.view}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Formik
            initialValues={{
              title: event.title,
              description: event.description,
              executionTime: event.executionTime,
              days: Object.values(event.days),
              priority: event.priority,
              isCyclic: event.isCyclic,
              cyclicTime: event.cyclicTime,
              isNotification: event.isNotification,
              notificationTime: event.notificationTime,
              createdAt: event.createdAt,
              updatedAt: event.updatedAt,
              deleted: false,
              userUid: event.userUid,
            }}
            onSubmit={(values) => {
              try {
                values.updatedAt = Date.now();
                const updatedFields = getUpdatedFields(event, values);
                ChangeEventSchema.validate(values)
                  .then(() => {
                    console.log('Zmienione pola: ', updatedFields);
                    dispatch(updateEventAction(eventKey, updatedFields));
                    CustomToast('success', 'Wydarzenie zaaktulizowane');
                  })
                  .catch((error) => {
                    console.log(error);
                    CustomToast(
                      'error',
                      'Nie udało się zaaktualizować wydarzenia'
                    );
                  });
              } catch (error) {
                console.log(error);
                CustomToast('error', 'Coś poszło nie tak');
              }
            }}>
            {({ values, handleChange, setFieldValue, handleSubmit }) => (
              <>
                <Input
                  placeholder='Tytuł wydarzenia'
                  onChangeText={handleChange('title')}
                  value={values.title}
                />
                <Input
                  placeholder='Opis wydarzenia'
                  multiline={true}
                  onChangeText={handleChange('description')}
                  value={values.description}
                />
                <Button
                  onPress={() => setShowDatePicker(true)}
                  title={
                    values.executionTime !== 0
                      ? 'Data wydarzenia: ' +
                        renderLocalDateWithTime(values.executionTime)
                      : 'Wybierz datę wydarzenia'
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
                        days.map((day) => ({
                          ...day,
                          active: false,
                        }))
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
                    mode='time'
                    onChange={(e, newTime) => {
                      setShowTimePicker(false);
                      if (e.type === 'dismissed') {
                        return false;
                      }
                      setTimeValue(newTime);
                      const datetime = createDatetimeTimezone(
                        dateValue,
                        timeValue
                      );
                      if (!datetime) {
                        return false;
                      }
                      setFieldValue(
                        `days[${datetime.getDay() - 1}].active`,
                        true
                      );
                      setFieldValue('executionTime', datetime.getTime());
                    }}
                  />
                )}
                <View style={styles.inlineView}>
                  <CheckBox
                    title='Powiadomienia'
                    checked={values.isNotification}
                    onPress={() =>
                      setFieldValue('isNotification', !values.isNotification)
                    }
                  />
                  <CheckBox
                    title='Wydarzenie cykliczne'
                    checked={values.isCyclic}
                    onPress={() => setFieldValue('isCyclic', !values.isCyclic)}
                  />
                </View>
                {values.isNotification && (
                  <CustomDropdown
                    data={times}
                    placeholder='Czas powiadomień'
                    value={values.notificationTime}
                    handleChange={(e: any) =>
                      setFieldValue('notificationTime', e.value)
                    }
                  />
                )}
                {values.isCyclic && (
                  <CustomDropdown
                    data={cyclicValues}
                    placeholder='Powtarzalność'
                    value={values.cyclicTime}
                    handleChange={(e: any) =>
                      setFieldValue('cyclicTime', e.value)
                    }
                  />
                )}
                <CustomDropdown
                  data={priorities}
                  placeholder='Priorytet'
                  value={values.priority}
                  handleChange={(e: any) => setFieldValue('priority', e.value)}
                />
                {isUpdate && (
                  <Button
                    title='Zaaktualizuj wydarzenie'
                    buttonStyle={styles.buttonUpdate}
                    containerStyle={styles.buttonContainer}
                    onPress={() => handleSubmit()}
                  />
                )}
                <Button
                  title='Wykonaj wydarzenie'
                  buttonStyle={styles.buttonSubmit}
                  containerStyle={styles.buttonContainer}
                  onPress={() => handleSubmit()}
                />
                <FormikObserver
                  onChange={(values: any) => {
                    const changedFields = getUpdatedFields(
                      event,
                      values.values
                    );
                    if (Object.keys(changedFields).length > 0) {
                      setIsUpdate(true);
                    } else {
                      setIsUpdate(false);
                    }
                  }}
                />
                <DiscardChangesAlert
                  navigation={navigation}
                  isUpdate={isUpdate}
                />
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    margin: 10,
    padding: 10,
    gap: 15,
    elevation: 5,
  },
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
  buttonUpdate: {
    backgroundColor: Colors.black,
    borderRadius: 25,
  },
  buttonContainer: {
    alignSelf: 'stretch',
  },
});

export default EventItemScreen;
