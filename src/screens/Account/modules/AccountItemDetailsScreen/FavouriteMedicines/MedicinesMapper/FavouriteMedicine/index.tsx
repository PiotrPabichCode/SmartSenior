import { Medicine } from '@src/models';
import { navigate } from '@src/navigation/navigationUtils';
import { handleDeleteItem } from './utils';
import { MedicineCard } from '@src/components';

type Props = {
  medicine: Medicine;
};

const FavouriteMedicine = ({ medicine }: Props) => {
  return (
    <MedicineCard
      name={medicine.commonName}
      added={true}
      onPressFavourite={() => handleDeleteItem(medicine.key)}
      onPress={() => {
        navigate('MedicinesItemDetails', {
          medicine: medicine,
        });
      }}
    />
  );
};

export default FavouriteMedicine;
