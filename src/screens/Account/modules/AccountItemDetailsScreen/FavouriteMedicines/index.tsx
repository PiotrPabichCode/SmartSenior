import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { selectMedicines, selectMedicinesStatus } from '@src/redux/medicines/medicines.slice';
import { useAppSelector } from '@src/redux/types';
import { View, StyleSheet } from 'react-native';
import EmptyMedicines from './EmptyMedicines';
import AddMedicineButton from './AddMedicineButton';
import MedicinesMapper from './MedicinesMapper';

const FavouriteMedicines = () => {
  const medicines = useAppSelector(state => selectMedicines(state));
  const status = useAppSelector(state => selectMedicinesStatus(state));

  if (status === 'pending') {
    return <CustomActivityIndicator />;
  }

  if (medicines.length === 0) {
    return <EmptyMedicines />;
  }

  return (
    <View style={styles.container}>
      <MedicinesMapper medicines={medicines} />
      <View style={styles.buttonContainer}>
        <AddMedicineButton />
      </View>
    </View>
  );
};

export default FavouriteMedicines;

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  buttonContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});
