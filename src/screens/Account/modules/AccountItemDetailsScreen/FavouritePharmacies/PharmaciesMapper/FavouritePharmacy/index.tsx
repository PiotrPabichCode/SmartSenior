import { Pharmacy } from '@src/models';
import { navigate } from '@src/navigation/navigationUtils';
import { handleDeleteItem } from './utils';
import { PharmacyCard } from '@src/components';

type FavouritePharmacyProps = {
  pharmacy: Pharmacy;
};

const FavouritePharmacy = ({ pharmacy }: FavouritePharmacyProps) => {
  return (
    <PharmacyCard
      name={pharmacy.name}
      added={true}
      onPressFavourite={() => handleDeleteItem(pharmacy.key)}
      onPress={() => {
        navigate('PharmaciesItemDetails', {
          pharmacy: pharmacy,
        });
      }}
    />
  );
};

export default FavouritePharmacy;
