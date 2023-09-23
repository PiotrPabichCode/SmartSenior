import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { CreateEventProps } from '../../navigation/types';
import { Formik } from 'formik';
import { Button, CheckBox, Input } from '@rneui/themed';
import CustomDropdown from '../../components/CustomDropdown';
import SpeedDialMenu from '../../navigation/SpeedDialMenu';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DayFieldsRenderer from './DayFieldsRenderer';

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

  const repeatValues = [
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

  return (
    <View style={styles.view}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Nowe wydarzenie</Text>
        <Formik
          initialValues={{
            title: '',
            description: '',
            date: 0,
            priority: '',
            repeat: 0,
            days: days.map((day) => ({ ...day, active: false })),
            time: 0,
            cyclic: false,
            notification: true,
          }}
          onSubmit={(values) => {
            try {
              console.log(values.days); // Tworzenie wydarzenia
            } catch (e) {
              console.error(e);
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
                  values.date > 0
                    ? values.date.toLocaleString()
                    : 'Wybierz datę wydarzenia'
                }
              />
              {values.date !== 0 && (
                <DayFieldsRenderer
                  days={values.days}
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
                      days.map((day) => ({ ...day, active: false }))
                    );
                    setShowDatePicker(false);
                    if (e.type === 'dismissed') {
                      return;
                    }
                    setFieldValue(
                      `days[${newDate!.getDay() - 1}].active`,
                      true
                    );
                    setDay(newDate!.getDate());
                    setMonth(newDate!.getMonth());
                    setYear(newDate!.getFullYear());
                    setShowTimePicker(true);
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
                    !isNaN(datetime.getDate()) &&
                      setFieldValue('date', datetime);
                  }}
                />
              )}
              <View style={styles.inlineView}>
                <CheckBox
                  center
                  title='Powiadomienia'
                  checked={values.notification}
                  onPress={() =>
                    setFieldValue('notification', !values.notification)
                  }
                />
                <CheckBox
                  center
                  title='Wydarzenie cykliczne'
                  checked={values.cyclic}
                  onPress={() => setFieldValue('cyclic', !values.cyclic)}
                />
              </View>
              {values.notification && (
                <CustomDropdown
                  data={times}
                  placeholder='Czas powiadomień'
                  value={values.time}
                  handleChange={handleChange('time')}
                />
              )}
              {values.cyclic && (
                <CustomDropdown
                  data={repeatValues}
                  placeholder='Powtarzalność'
                  value={values.repeat}
                  handleChange={handleChange('repeat')}
                />
              )}
              <CustomDropdown
                data={priorities}
                placeholder='Priorytet'
                value={values.priority}
                handleChange={handleChange('priority')}
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
      </ScrollView>
      <SpeedDialMenu navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    height: '100%',
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inlineView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
  },
  dropdown: {
    margin: 16,
    height: 50,
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
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
    color: 'white',
    marginHorizontal: 20,
  },
  buttonSubmitContainer: {
    height: 40,
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
  },
});

export default CreateEventScreen;
