import { Pharmacies } from '@src/models';
import FavouritePharmacy from './FavouritePharmacy';

type Props = {
  pharmacies: Pharmacies;
};

const PharmaciesMapper = ({ pharmacies }: Props) => {
  return pharmacies.map((pharmacy, index) => {
    return <FavouritePharmacy key={index} pharmacy={pharmacy} />;
  });
};

export default PharmaciesMapper;
