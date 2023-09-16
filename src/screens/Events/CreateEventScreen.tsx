import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { CreateEventProps } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { CheckBox, Input } from '@rneui/themed';
import DatePicker from 'react-native-date-picker';
import CustomDropdown from '../../components/CustomDropdown';
import SpeedDialMenu from '../../navigation/SpeedDialMenu';

const CreateEventScreen = ({ navigation }: CreateEventProps) => {
  const times = [
    { label: '5 minut', value: 5 },
    { label: '15 minut', value: 15 },
    { label: '30 minut', value: 30 },
    { label: '1h', value: 60 },
    { label: '3h', value: 60 * 3 },
  ];
  return (
    <SafeAreaView style={styles.view}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Nowe wydarzenie</Text>
        <Formik
          initialValues={{
            title: '',
            description: '',
            time: 0,
            cyclic: false,
            notification: true,
          }}
          onSubmit={(values) => {
            try {
              console.log(values); // Tworzenie wydarzenia
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
              <CheckBox
                center
                title='Powiadomienia'
                checked={values.notification}
                onPress={() =>
                  setFieldValue('notification', !values.notification)
                }
              />
              <CustomDropdown
                data={times}
                placeholder='Czas powiadomień'
                value={values.time}
                handleChange={handleChange('time')}
              />
              <CheckBox
                center
                title='Wydarzenie cykliczne'
                checked={values.cyclic}
                onPress={() => setFieldValue('cyclic', !values.cyclic)}
              />
            </>
          )}
        </Formik>
      </ScrollView>
      <SpeedDialMenu navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
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
});

export default CreateEventScreen;
