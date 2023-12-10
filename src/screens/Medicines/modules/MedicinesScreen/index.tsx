import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { t } from '@src/localization/Localization';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import Colors from '@src/constants/Colors';
import CustomDivider from '@src/components/CustomDivider';
import { useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { Medicines } from '@src/models';
import { selectMedicinesStatus } from '@src/redux/medicines/medicines.slice';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import SearchForm from './SearchForm';
import MedicinesGrid from './MedicinesGrid';

const MedicinesScreen = () => {
  const [apiMedicines, setApiMedicines] = useState<Medicines>([]);
  const theme = useAppSelector(state => selectTheme(state));
  const status = useAppSelector(state => selectMedicinesStatus(state));
  const currentTheme = Colors[theme];

  if (status === 'pending') {
    return <CustomActivityIndicator />;
  }

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Text style={styles.title}>{t('medicinesScreen.title')}</Text>
      <CustomDivider />
      <SearchForm onLoad={setApiMedicines} />
      <MedicinesGrid apiMedicines={apiMedicines} />
    </CustomScrollContainer>
  );
};

export default MedicinesScreen;

const styles = StyleSheet.create({
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
