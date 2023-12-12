import { useAppSelector } from '@src/redux/types';
import { selectMedicines } from '@src/redux/medicines/medicines.slice';
import { navigate } from '@src/navigation/navigationUtils';
import { handleAddMedicine, handleDeleteItem } from './utils';
import { MedicineCard } from '@src/components';
import { Medicines } from '@src/models';

type Props = {
  apiMedicines: Medicines;
};

const MedicinesGrid = ({ apiMedicines }: Props) => {
  const medicines = useAppSelector(state => selectMedicines(state));
  return (
    apiMedicines &&
    apiMedicines.map((medicine, index) => (
      <MedicineCard
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
    ))
  );
};

export default MedicinesGrid;
