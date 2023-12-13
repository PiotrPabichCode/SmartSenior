import { useState } from 'react';
import { Text } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import Colors from '@src/constants/Colors';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { Pharmacies } from '@src/models';
import { selectPharmaciesStatus } from '@src/redux/pharmacies/pharmacies.slice';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import SearchForm from './SearchForm';
import PharmaciesMapper from './PharmaciesMapper';
import { CustomDivider } from '@src/components';

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
      <Text h3>{t('pharmaciesScreen.title')}</Text>
      <CustomDivider />
      <SearchForm onLoad={setApiPharmacies} />
      <PharmaciesMapper apiPharmacies={apiPharmacies} />
    </CustomScrollContainer>
  );
};

export default PharmaciesScreen;
