import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { selectMedicines, selectMedicinesStatus } from '@src/redux/medicines/medicines.slice';
import { useAppSelector } from '@src/redux/types';
import { View, Text } from 'react-native';
import EmptyMedicines from './EmptyMedicines';
import FavouriteMedicine from './FavouriteMedicine';

const FavouriteMedicinesScreen = () => {
  const medicines = useAppSelector(state => selectMedicines(state));
  const status = useAppSelector(state => selectMedicinesStatus(state));

  if (status === 'pending') {
    return <CustomActivityIndicator />;
  }

  if (medicines.length === 0) {
    return <EmptyMedicines />;
  }

  const mapMedicines = medicines.map((medicine, index) => {
    return <FavouriteMedicine key={index} medicine={medicine} />;
  });

  return <View style={{ gap: 15 }}>{mapMedicines}</View>;
};

export default FavouriteMedicinesScreen;
