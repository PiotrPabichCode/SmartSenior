import { Pharmacies } from '@src/models';
import FavouritePharmacy from './FavouritePharmacy';

type PharmaciesMapperProps = {
  pharmacies: Pharmacies;
};

const PharmaciesMapper = ({ pharmacies }: PharmaciesMapperProps) => {
  return pharmacies.map((pharmacy, index) => {
    return <FavouritePharmacy key={index} pharmacy={pharmacy} />;
  });
};

export default PharmaciesMapper;
