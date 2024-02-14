import { Medicines } from '@src/models';
import FavouriteMedicine from './FavouriteMedicine';

type MedicinesMapperProps = {
  medicines: Medicines;
};

const MedicinesMapper = ({ medicines }: MedicinesMapperProps) => {
  return medicines.map((medicine, index) => {
    return <FavouriteMedicine key={index} medicine={medicine} />;
  });
};

export default MedicinesMapper;
