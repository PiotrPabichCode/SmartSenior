import { useState } from 'react';
import { Divider, Text } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { CustomScrollContainer, CustomActivityIndicator } from '@src/components';
import { useAppSelector } from '@src/redux/types';
import { Pharmacies } from '@src/models';
import { selectPharmaciesStatus } from '@src/redux/pharmacies/pharmacies.slice';
import SearchForm from './SearchForm';
import PharmaciesMapper from './PharmaciesMapper';

const PharmaciesScreen = () => {
  const [apiPharmacies, setApiPharmacies] = useState<Pharmacies>([]);
  const status = useAppSelector(state => selectPharmaciesStatus(state));

  if (status === 'pending') {
    return <CustomActivityIndicator />;
  }

  return (
    <CustomScrollContainer>
      <Text h3>{t('pharmaciesScreen.title')}</Text>
      <Divider />
      <SearchForm onLoad={setApiPharmacies} />
      <PharmaciesMapper apiPharmacies={apiPharmacies} />
    </CustomScrollContainer>
  );
};

export default PharmaciesScreen;
