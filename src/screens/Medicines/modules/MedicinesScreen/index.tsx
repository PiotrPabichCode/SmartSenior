import { useState } from 'react';
import { t } from '@src/localization/Localization';
import { CustomScrollContainer, CustomDivider, CustomActivityIndicator } from '@src/components';
import { useAppSelector } from '@src/redux/types';
import { Medicines } from '@src/models';
import { selectMedicinesStatus } from '@src/redux/medicines/medicines.slice';
import SearchForm from './SearchForm';
import MedicinesMapper from './MedicinesMapper';
import { Text } from '@rneui/themed';

const MedicinesScreen = () => {
  const [apiMedicines, setApiMedicines] = useState<Medicines>([]);
  const status = useAppSelector(state => selectMedicinesStatus(state));

  if (status === 'pending') {
    return <CustomActivityIndicator />;
  }

  return (
    <CustomScrollContainer>
      <Text h3>{t('medicinesScreen.title')}</Text>
      <CustomDivider />
      <SearchForm onLoad={setApiMedicines} />
      <MedicinesMapper apiMedicines={apiMedicines} />
    </CustomScrollContainer>
  );
};

export default MedicinesScreen;
