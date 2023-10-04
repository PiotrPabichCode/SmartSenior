import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatListComponent,
} from 'react-native';
import { CreateEventProps } from '@navigation/types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, CheckBox, Input } from '@rneui/themed';
import CustomDropdown from '@components/CustomDropdown';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DayFieldsRenderer from './DayFieldsRenderer';
import CustomToast from '@src/components/CustomToast';
import { getAuth } from 'firebase/auth';
import { FIREBASE_APP, db } from 'firebaseConfig';
import { push, ref } from 'firebase/database';

const CreateEventScreen = ({ navigation }: CreateEventProps) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [day, setDay] = useState<number>();
  const times = [
    { label: '5 minut', value: 5 },
    { label: '15 minut', value: 15 },
    { label: '30 minut', value: 30 },
    { label: '1h', value: 60 },
    { label: '3h', value: 60 * 3 },
  ];

  const priorities = [
    { label: '50', value: 50 },
    { label: '100', value: 100 },
    { label: '300', value: 300 },
    { label: '500', value: 500 },
    { label: '1000', value: 1000 },
  ];

  const cyclicValues = [
    { label: 'Codziennie', value: 1 },
    { label: 'Co 2 dni', value: 2 },
    { label: 'Co tydzień', value: 7 },
    { label: 'Co miesiąc - tego samego dnia', value: 30 },
    { label: 'Wpisz wartość: (liczba = ilość dni)', value: -1 },
  ];

  const days = [
    { shortTitle: 'p', title: 'pon.', value: 1, active: false },
    { shortTitle: 'w', title: 'wt.', value: 2, active: false },
    { shortTitle: 'ś', title: 'śr.', value: 3, active: false },
    { shortTitle: 'c', title: 'czw.', value: 4, active: false },
    { shortTitle: 'p', title: 'pt.', value: 5, active: false },
    { shortTitle: 's', title: 'sob.', value: 6, active: false },
    { shortTitle: 'n', title: 'niedz.', value: 7, active: false },
  ];

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
    <View style={styles.view}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Text style={styles.header}>Nowe wydarzenie</Text>
          <Formik
            initialValues={{
              title: '',
              description: '',
              executionTime: Date.now(),
              days: days.map((day) => ({ ...day, active: false })),
              priority: 0,
              isCyclic: false,
              cyclicTime: 0,
              isNotification: true,
              notificationTime: 0,
              createdAt: Date.now(),
              updatedAt: Date.now(),
              deleted: false,
              userUid: getAuth().currentUser?.uid + '-deleted-false',
            }}
            onSubmit={(values) => {
              try {
                values.createdAt = Date.now();
                values.updatedAt = Date.now();
                console.log(values);
                NewEventSchema.validate(values)
                  .then(() => {
                    const eventsRef = ref(db, 'events/');
                    push(eventsRef, values);
                    navigation.goBack();
                    CustomToast('success', 'Dodano nowe wydarzenie');
                  })
                  .catch((errors) => {
                    console.log(errors);
                    CustomToast('error', 'Nie podano wszystkich danych');
                  });
              } catch (e) {
                console.log(e);
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
                    values.executionTime
                      ? 'Data wydarzenia: ' +
                        new Date(values.executionTime).toLocaleDateString() +
                        ' ' +
                        new Date(values.executionTime).toLocaleTimeString()
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
                          return;
                        }
                        setDay(newDate!.getDate());
                        setMonth(newDate!.getMonth() + 1);
                        setYear(newDate!.getFullYear());
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
                        return;
                      }
                      const hours = newTime!.getHours();
                      const minutes = newTime!.getMinutes();
                      const datetime = new Date(
                        `${year}-${month}-${day}T${hours}:${minutes}`
                      );
                      !isNaN(datetime.getDay()) &&
                        setFieldValue(
                          `days[${datetime!.getDay() - 1}].active`,
                          true
                        );
                      !isNaN(datetime.getDate()) &&
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
                <Button
                  title='Utwórz wydarzenie'
                  buttonStyle={styles.buttonSubmit}
                  containerStyle={styles.buttonSubmitContainer}
                  titleStyle={styles.buttonSubmitTitle}
                  onPress={() => handleSubmit()}
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
  buttonSubmitTitle: {
    marginHorizontal: 20,
  },
  buttonSubmitContainer: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
});

export default CreateEventScreen;
