import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { useAppSelector } from '@src/redux/types';
import { View, Text } from 'react-native';
import { selectPharmacies, selectPharmaciesStatus } from '@src/redux/pharmacies/pharmacies.slice';
import EmptyPharmacies from './EmptyPharmacies';
import FavouritePharmacy from './FavouritePharmacy';

const FavouritePharmaciesScreen = () => {
  const pharmacies = useAppSelector(state => selectPharmacies(state));
  const status = useAppSelector(state => selectPharmaciesStatus(state));

  if (status === 'pending') {
    return <CustomActivityIndicator />;
  }

  if (pharmacies.length === 0) {
    return <EmptyPharmacies />;
  }

  const mapPharmacies = pharmacies.map((pharmacy, index) => {
    return <FavouritePharmacy key={index} pharmacy={pharmacy} />;
  });

  return <View style={{ gap: 15 }}>{mapPharmacies}</View>;
};

export default FavouritePharmaciesScreen;
