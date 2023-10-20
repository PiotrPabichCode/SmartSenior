import { Button, Divider, Input } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import MedicineItem from './MedicineItem';
import { Formik } from 'formik';
import { buildRequest } from '@utils/utils';
import { navigate } from '@src/navigation/navigationUtils';
import { translate } from '@src/localization/Localization';

const MedicinesScreen = () => {
  const [items, setItems] = useState([]);

  const BASE_URL =
    'https://rejestrymedyczne.ezdrowie.gov.pl/api/rpl/medicinal-products/search/public?specimenTypeEnum=L&';

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
    <View style={styles.view}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>{translate('medicinesScreen.title')}</Text>
        <Divider style={styles.dividerStyle} />
        <Formik
          initialValues={{ name: '' }}
          onSubmit={params => {
            try {
              const request = buildRequest(BASE_URL, params);
              loadData(request);
            } catch (e) {
              console.log(e);
            }
          }}>
          {({ values, handleChange, handleSubmit }) => (
            <>
              <Input
                placeholder={translate('medicinesScreen.placeholder')}
                onChangeText={handleChange('name')}
                value={values.name}
              />
              <Button
                title={translate('button.search')}
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
              price="35,20zł"
              onPress={() =>
                navigate('MedicinesItemDetails', {
                  item: item,
                })
              }
            />
          ))}
      </ScrollView>
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

export default MedicinesScreen;
