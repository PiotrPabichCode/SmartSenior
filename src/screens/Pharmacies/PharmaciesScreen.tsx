import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import { Button, Divider, Input } from '@rneui/themed';
import PharmacyItem from './PharmacyItem';
import CustomDropdown from '@components/CustomDropdown';
import { navigate } from '@src/navigation/navigationUtils';
import { t } from '@src/localization/Localization';
import { buildRequest } from '@src/utils/utils';
import Colors from '@src/constants/Colors';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';

const PharmaciesScreen = () => {
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];
  const [pharmacies, setPharmacies] = useState([]);
  const BASE_URL =
    'https://rejestrymedyczne.ezdrowie.gov.pl/api/pharmacies/search?page=0&size=10&sortField=dateOfChanged&sortDirection=DESC&statusCode=AKTYWNA&';

  const loadData = async (request: string) => {
    try {
      console.log(request);
      const response = await fetch(request);
      const json = await response.json();
      const key = Object.keys(json)[0];
      const values = Object.values(json[key]).filter((item: any) => item.name !== '');
      setPharmacies(values as any);
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
    <CustomScrollContainer theme={currentTheme}>
      <Text style={styles.title}>{t('pharmaciesScreen.title')}</Text>
      <Divider style={styles.dividerStyle} />
      <Formik
        initialValues={{ name: '', companyCity: '', companyProvince: '' }}
        onSubmit={params => {
          try {
            const request = buildRequest(BASE_URL, params);
            loadData(request);
          } catch (e) {
            console.log(e);
          }
        }}>
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <>
            <Input
              placeholder={t('pharmaciesScreen.placeholder.name')}
              onChangeText={handleChange('name')}
              value={values.name}
            />
            <Input
              placeholder={t('pharmaciesScreen.placeholder.city')}
              onChangeText={handleChange('companyCity')}
              value={values.companyCity}
            />
            <CustomDropdown
              data={provinces}
              placeholder={t('pharmaciesScreen.placeholder.province')}
              value={values.companyProvince}
              handleChange={(e: any) => setFieldValue('companyProvince', e.value)}
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

      {pharmacies &&
        pharmacies.map((item, index) => (
          <PharmacyItem
            key={index}
            name={item['name']}
            onPress={() =>
              navigate('PharmaciesItemDetails', {
                item: item,
              })
            }
          />
        ))}
    </CustomScrollContainer>
  );
};

const styles = StyleSheet.create({
  buttonSearchContainer: {
    width: '90%',
    borderRadius: 25,
    marginTop: 10,
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
