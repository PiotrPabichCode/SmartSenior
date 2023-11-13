import { Button, Input } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import MedicineItem from './MedicineItem';
import { Formik } from 'formik';
import { buildRequest } from '@utils/utils';
import { navigate } from '@src/navigation/navigationUtils';
import { t } from '@src/localization/Localization';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import Colors from '@src/constants/Colors';
import CustomDivider from '@src/components/CustomDivider';
import { useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';

const MedicinesScreen = () => {
  const [items, setItems] = useState([]);
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];
  const styles = useStyles(currentTheme);

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
    <CustomScrollContainer theme={currentTheme}>
      <Text style={styles.title}>{t('medicinesScreen.title')}</Text>
      <CustomDivider />
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
              placeholder={t('medicinesScreen.placeholder')}
              onChangeText={handleChange('name')}
              value={values.name}
            />
            <Button
              title={t('button.search')}
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
            onPress={() =>
              navigate('MedicinesItemDetails', {
                item: item,
              })
            }
          />
        ))}
    </CustomScrollContainer>
  );
};

const useStyles = (theme: any) =>
  StyleSheet.create({
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
  });

export default MedicinesScreen;
