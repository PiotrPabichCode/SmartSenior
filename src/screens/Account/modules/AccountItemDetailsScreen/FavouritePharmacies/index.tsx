import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { useAppSelector } from '@src/redux/types';
import { View, StyleSheet } from 'react-native';
import { selectPharmacies, selectPharmaciesStatus } from '@src/redux/pharmacies/pharmacies.slice';
import EmptyPharmacies from './EmptyPharmacies';
import AddPharmacyButton from './AddPharmacyButton';
import PharmaciesMapper from './PharmaciesMapper';

const FavouritePharmacies = () => {
  const pharmacies = useAppSelector(state => selectPharmacies(state));
  const status = useAppSelector(state => selectPharmaciesStatus(state));

  if (status === 'pending') {
    return <CustomActivityIndicator />;
  }

  if (pharmacies.length === 0) {
    return <EmptyPharmacies />;
  }

  return (
    <View style={styles.container}>
      <PharmaciesMapper pharmacies={pharmacies} />
      <AddPharmacyButton />
    </View>
  );
};

export default FavouritePharmacies;

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
});
