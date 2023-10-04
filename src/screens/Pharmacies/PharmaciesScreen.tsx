import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PharmaciesProps } from '@navigation/types';
import { Formik } from 'formik';
import { buildRequest } from '@utils/utils';
import { Button, Divider, Input } from '@rneui/themed';
import PharmacyItem from './PharmacyItem';
import CustomDropdown from '@components/CustomDropdown';
import SpeedDialMenu from '@src/components/SpeedDialMenu';

const PharmaciesScreen = ({ navigation }: PharmaciesProps) => {
  const [pharmacies, setPharmacies] = useState([]);
  const BASE_URL =
    'https://rejestrymedyczne.ezdrowie.gov.pl/api/pharmacies/search?page=0&size=10&sortField=dateOfChanged&sortDirection=DESC&statusCode=AKTYWNA';

  const loadData = async (request: string) => {
    try {
      const response = await fetch(request);
      const json = await response.json();
      const key = Object.keys(json)[0];
      setPharmacies(json[key]);
    } catch (e) {
      console.log(e);
    }
  };

  const provinces = [
    { label: 'Kujawsko-pomorskie', value: 'kujawsko-pomorskie' },
    { label: 'Łódzkie', value: 'łódzkie' },
    { label: 'Dolnośląskie', value: 'dolnośląskie' },
    { label: 'Lubelskie', value: 'lubelskie' },
    { label: 'Lubuskie', value: 'lubuskie' },
    { label: 'Małopolskie', value: 'małopolskie' },
    { label: 'Mazowieckie', value: 'mazowieckie' },
    { label: 'Opolskie', value: 'opolskie' },
    { label: 'Podkarpackie', value: 'podkarpackie' },
    { label: 'Podlaskie', value: 'podlaskie' },
    { label: 'Pomorskie', value: 'pomorskie' },
    { label: 'Śląskie', value: 'śląskie' },
    { label: 'Świętokrzyskie', value: 'świętokrzyskie' },
    { label: 'Warmińsko-mazurskie', value: 'warmińsko-mazurskie' },
    { label: 'Wielkopolskie', value: 'wielkopolskie' },
    { label: 'Zachodniopomorskie', value: 'zachodniopomorskie' },
  ];

  return (
    <View style={styles.view}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Lista aptek</Text>
        <Divider style={styles.dividerStyle} />
        <Formik
          initialValues={{ name: '', companyCity: '', companyProvince: '' }}
          onSubmit={(values) => {
            try {
              console.log(values);
              // const request = buildRequest(BASE_URL, params);
              // loadData(request);
            } catch (e) {
              console.log(e);
            }
          }}>
          {({ values, handleChange, handleSubmit, setFieldValue }) => (
            <>
              <Input
                placeholder='Wpisz nazwę apteki...'
                onChangeText={handleChange('name')}
                value={values.name}
              />
              <Input
                placeholder='Wpisz miejscowość...'
                onChangeText={handleChange('companyCity')}
                value={values.companyCity}
              />
              <CustomDropdown
                data={provinces}
                placeholder={'Wybierz województwo'}
                value={values.companyProvince}
                handleChange={(e: any) =>
                  setFieldValue('companyProvince', e.value)
                }
              />
              <Button
                title='Szukaj'
                containerStyle={styles.buttonSearchContainer}
                buttonStyle={styles.buttonSearchStyle}
                onPress={() => handleSubmit()}
              />
            </>
          )}
        </Formik>

        {pharmacies &&
          pharmacies.map((item, index) => (
            <PharmacyItem
              key={index}
              name={item['name']}
              onPress={() =>
                navigation.navigate('PharmaciesItemDetails', {
                  item: item,
                })
              }
            />
          ))}
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
  buttonSearchContainer: {
    width: '90%',
    borderRadius: 25,
  },
  buttonSearchStyle: {
    backgroundColor: 'blue',
  },
  title: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: 'bold',
  },
  dividerStyle: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'black',
    height: 1,
  },
});

export default PharmaciesScreen;
