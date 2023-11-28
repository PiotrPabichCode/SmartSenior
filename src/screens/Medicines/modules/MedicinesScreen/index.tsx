import { useState } from 'react';
import { Text } from 'react-native';
import { t } from '@src/localization/Localization';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import Colors from '@src/constants/Colors';
import CustomDivider from '@src/components/CustomDivider';
import { useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { Medicines } from '@src/models';
import { selectMedicinesStatus } from '@src/redux/medicines/medicines.slice';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { useStyles } from './styles';
import SearchForm from './SearchForm';
import MedicinesGrid from './MedicinesGrid';

const MedicinesScreen = () => {
  const [apiMedicines, setApiMedicines] = useState<Medicines>([]);
  const theme = useAppSelector(state => selectTheme(state));
  const status = useAppSelector(state => selectMedicinesStatus(state));
  const currentTheme = Colors[theme];
  const styles = useStyles();

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
