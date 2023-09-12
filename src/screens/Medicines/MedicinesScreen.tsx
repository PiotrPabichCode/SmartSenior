import { Button, Divider, Input } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import MedicineItem from './MedicineItem';
import { MedicinesProps } from '../../navigation/types';
import { Formik } from 'formik';

const MedicinesScreen = ({ navigation }: MedicinesProps) => {
  const [items, setItems] = useState([]);

  const BASE_URL =
    'https://rejestrymedyczne.ezdrowie.gov.pl/api/rpl/medicinal-products/search/public?specimenTypeEnum=L&';

  const buildRequest = (params: any) => {
    const entries = Object.entries(params).filter(
      ([key, value]) => String(value).trim() !== ''
    );
    return (
      BASE_URL + entries.map(([key, value]) => `${key}=${value}`).join('&')
    );
  };

  const loadData = async (request: string) => {
    try {
      const response = await fetch(request);
      const json = await response.json();
      setItems(json.content);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.viewStyle}>
      <Text style={styles.title}>Lista leków</Text>
      <Divider style={styles.dividerStyle} />
      <Formik
        initialValues={{ name: '' }}
        onSubmit={(params) => {
          try {
            console.log('Params', params);
            const request = buildRequest(params);
            console.log('Request', request);
            loadData(request);
          } catch (e) {
            console.log(e);
          }
        }}>
        {({ values, handleChange, handleSubmit }) => (
          <>
            <Input
              placeholder='Wpisz nazwę leku...'
              onChangeText={handleChange('name')}
              value={values.name}
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

      {items &&
        items.map((item, index) => (
          <MedicineItem
            key={index}
            name={item['medicinalProductName']}
            price='35,20zł'
            onPress={() =>
              navigation.navigate('MedicinesItemDetails', {
                item: item,
              })
            }
          />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFAFA',
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

export default MedicinesScreen;
