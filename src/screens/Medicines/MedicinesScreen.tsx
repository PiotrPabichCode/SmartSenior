import { Button, Input } from '@rneui/themed';
import { useState } from 'react';
import { StyleSheet, Text, Alert } from 'react-native';
import MedicineItem from './MedicineItem';
import { Formik } from 'formik';
import { buildRequest } from '@utils/utils';
import { navigate } from '@src/navigation/navigationUtils';
import { t } from '@src/localization/Localization';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import Colors from '@src/constants/Colors';
import CustomDivider from '@src/components/CustomDivider';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { Medicine, Medicines } from '@src/models';
import { addMedicine, deleteMedicine } from '@src/redux/medicines/medicines.actions';
import CustomToast from '@src/components/CustomToast';
import { selectMedicines } from '@src/redux/medicines/medicines.slice';

const MedicinesScreen = () => {
  const dispatch = useAppDispatch();
  const [apiMedicines, setApiMedicines] = useState<Medicines>([]);
  const theme = useAppSelector(state => selectTheme(state));
  const medicines = useAppSelector(state => selectMedicines(state));
  const currentTheme = Colors[theme];
  const styles = useStyles(currentTheme);

  const BASE_URL = 'https://rejestrymedyczne.ezdrowie.gov.pl/api/rpl/medicinal-products/';
  const BASE_SEARCH_URL = BASE_URL + 'search/public?specimenTypeEnum=L&';

  const loadData = async (request: string) => {
    try {
      console.log(request);
      const response = await fetch(request);
      const json = await response.json();
      const data: Array<any> = json.content;
      const medicines: Medicines = data.map(item => ({
        key: '',
        productName: item['medicinalProductName'],
        commonName: item['commonName'],
        power: item['medicinalProductPower'],
        pharmaceuticalForm: item['pharmaceuticalFormName'],
        activeSubstance: item['activeSubstanceName'],
        packaging: item['packaging'].replaceAll('\\n', '\n'),
        expiration: item['expirationDateString'],
        company: item['subjectMedicinalProductName'],
        country: item.manufacturersDtos[0]?.countryName,
        leafletUrl: item['id'] ? BASE_URL + item['id'] + '/leaflet' : null,
        characteristicUrl: item['id'] ? BASE_URL + item['id'] + '/characteristic' : null,
      }));
      setApiMedicines(medicines.filter(m => m.country));
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddMedicine = async (medicine: Medicine) => {
    try {
      await dispatch(addMedicine(medicine)).unwrap();
      CustomToast('success', t('favouriteMedicines.addSuccess'));
    } catch (error) {
      CustomToast('error', t('favouriteMedicines.addError'));
      console.log(error);
    }
  };

  const onPressDelete = async (key: string) => {
    try {
      await dispatch(deleteMedicine(key)).unwrap();
      CustomToast('success', t('favouritePharmacies.deleteSuccess'));
    } catch (error) {
      CustomToast('error', t('favouritePharmacies.deleteError'));
      console.log(error);
    }
  };

  const handleDeleteItem = (key: string) => {
    Alert.alert(t('favouritePharmacies.alertTitle'), t('favouritePharmacies.alertQuestion'), [
      {
        text: t('no'),
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: t('yes'),
        style: 'destructive',
        onPress: async () => await onPressDelete(key),
      },
    ]);
  };

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Text style={styles.title}>{t('medicinesScreen.title')}</Text>
      <CustomDivider />
      <Formik
        initialValues={{ name: '' }}
        onSubmit={params => {
          try {
            const request = buildRequest(BASE_SEARCH_URL, params);
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
      {apiMedicines &&
        apiMedicines.map((medicine, index) => (
          <MedicineItem
            key={index}
            name={medicine.productName}
            added={medicines.findIndex(m => m.productName === medicine.productName) !== -1}
            onPress={() =>
              navigate('MedicinesItemDetails', {
                medicine: medicine,
              })
            }
            onPressFavourite={async () => {
              const m = medicines.find(m => m.productName === medicine.productName);
              if (m) {
                handleDeleteItem(m.key);
              } else {
                await handleAddMedicine(medicine);
              }
            }}
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
