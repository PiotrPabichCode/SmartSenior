import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Divider } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import Colors from '@src/constants/Colors';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { Pharmacies } from '@src/models';
import { selectPharmaciesStatus } from '@src/redux/pharmacies/pharmacies.slice';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import SearchForm from './SearchForm';
import PharmaciesGrid from './PharmaciesGrid';

const PharmaciesScreen = () => {
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];
  const [apiPharmacies, setApiPharmacies] = useState<Pharmacies>([]);
  const status = useAppSelector(state => selectPharmaciesStatus(state));

  if (status === 'pending') {
    return <CustomActivityIndicator />;
  }

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Text style={styles.title}>{t('pharmaciesScreen.title')}</Text>
      <Divider style={styles.dividerStyle} />
      <SearchForm onLoad={setApiPharmacies} />
      <PharmaciesGrid apiPharmacies={apiPharmacies} />
    </CustomScrollContainer>
  );
};

export default PharmaciesScreen;

const styles = StyleSheet.create({
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
