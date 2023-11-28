import { navigate } from '@src/navigation/navigationUtils';
import { PharmaciesGridProps } from './types';
import PharmacyCard from './PharmacyCard';
import { handleAddPharmacy, handleDeleteItem } from './utils';
import { useAppSelector } from '@src/redux/types';
import { selectPharmacies } from '@src/redux/pharmacies/pharmacies.slice';

const PharmaciesGrid = ({ apiPharmacies }: PharmaciesGridProps) => {
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
