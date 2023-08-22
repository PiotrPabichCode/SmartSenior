import { Divider, Input } from '@rneui/themed';
import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import MedicineItem from './MedicineItem';
import {
  MedicinesItemDetailsProps,
  MedicinesProps,
} from '../../navigation/types';

const MedicinesScreen = ({ navigation }: MedicinesProps) => {
  return (
    <ScrollView contentContainerStyle={styles.viewStyle}>
      <Text style={styles.title}>Lista leków</Text>
      <Divider style={styles.dividerStyle} />
      <Input placeholder='Wpisz nazwę leku...' />
      <MedicineItem
        name='Ibuprom Max 400 mg'
        price='25,20zł'
        onPress={() => navigation.navigate('MedicinesItemDetails')}
      />
      <MedicineItem name='Ibuprom Max 500 mg' price='35,20zł' />
      <MedicineItem name='Ibuprom Max 600 mg' price='45,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
      <MedicineItem name='Ibuprom Max 700 mg' price='55,20zł' />
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
