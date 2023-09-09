import { Button, Divider, Input } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import MedicineItem from './MedicineItem';
import {
  MedicinesItemDetailsProps,
  MedicinesProps,
} from '../../navigation/types';
import useLoadMedicinesFromWebsite from '../../api/useLoadMedicinesFromWebsite';
import { RootObject } from '../../api/medicalTypes';

const MedicinesScreen = ({ navigation }: MedicinesProps) => {
  const [items, setItems] = useState([]);

  const GOV_URL =
    'https://rejestrymedyczne.ezdrowie.gov.pl/api/rpl/medicinal-products/search/public?specimenTypeEnum=L';

  const loadData = async () => {
    try {
      const response = await fetch(GOV_URL);
      const json = await response.json();
      setItems(json.content);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.viewStyle}>
      <Text style={styles.title}>Lista leków</Text>
      <Divider style={styles.dividerStyle} />
      <Input placeholder='Wpisz nazwę leku...' />
      <Button
        containerStyle={styles.buttonSearchContainer}
        buttonStyle={styles.buttonSearchStyle}
        title='Szukaj'
      />

      {items &&
        items.map((item, index) => (
          <MedicineItem
            key={index}
            name={item['commonName']}
            price='35,20zł'
            onPress={() => navigation.navigate('MedicinesItemDetails')}
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
