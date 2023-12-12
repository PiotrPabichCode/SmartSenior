import { navigate } from '@src/navigation/navigationUtils';
import { handleAddPharmacy, handleDeleteItem } from './utils';
import { useAppSelector } from '@src/redux/types';
import { selectPharmacies } from '@src/redux/pharmacies/pharmacies.slice';
import { Pharmacies } from '@src/models';
import { PharmacyCard } from '@src/components';

type Props = {
  apiPharmacies: Pharmacies;
};

const PharmaciesGrid = ({ apiPharmacies }: Props) => {
  const pharmacies = useAppSelector(state => selectPharmacies(state));
  return (
    apiPharmacies &&
    apiPharmacies.map((pharmacy, index) => (
      <PharmacyCard
        key={index}
        name={pharmacy.name}
        added={pharmacies.findIndex(m => m.address === pharmacy.address) !== -1}
        onPress={() =>
          navigate('PharmaciesItemDetails', {
            pharmacy: pharmacy,
          })
        }
        onPressFavourite={async () => {
          const p = pharmacies.find(p => p.address === pharmacy.address);
          if (p) {
            handleDeleteItem(p.key);
          } else {
            await handleAddPharmacy(pharmacy);
          }
        }}
      />
    ))
  );
};

export default PharmaciesGrid;
