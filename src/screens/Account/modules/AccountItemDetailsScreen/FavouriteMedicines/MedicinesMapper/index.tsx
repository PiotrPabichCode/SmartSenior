import { Medicines } from '@src/models';
import FavouriteMedicine from './FavouriteMedicine';

type Props = {
  medicines: Medicines;
};

const MedicinesMapper = ({ medicines }: Props) => {
  return medicines.map((medicine, index) => {
    return <FavouriteMedicine key={index} medicine={medicine} />;
  });
};

export default MedicinesMapper;
