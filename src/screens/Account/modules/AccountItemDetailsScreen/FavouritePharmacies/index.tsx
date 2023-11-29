import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { useAppSelector } from '@src/redux/types';
import { View, Text } from 'react-native';
import { selectPharmacies, selectPharmaciesStatus } from '@src/redux/pharmacies/pharmacies.slice';
import EmptyPharmacies from './EmptyPharmacies';
import FavouritePharmacy from './FavouritePharmacy';
import CustomButton from '@src/components/CustomButton';
import { navigate } from '@src/navigation/navigationUtils';
import { t } from '@src/localization/Localization';
import Icons from '@src/components/Icons';
import { selectTheme } from '@src/redux/auth/auth.slice';
import Colors from '@src/constants/Colors';

const FavouritePharmacies = () => {
  const pharmacies = useAppSelector(state => selectPharmacies(state));
  const status = useAppSelector(state => selectPharmaciesStatus(state));
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];

  if (status === 'pending') {
    return <CustomActivityIndicator />;
  }

  if (pharmacies.length === 0) {
    return <EmptyPharmacies />;
  }

  const mapPharmacies = pharmacies.map((pharmacy, index) => {
    return <FavouritePharmacy key={index} pharmacy={pharmacy} />;
  });

  return (
    <View style={{ gap: 15, flex: 1 }}>
      {mapPharmacies}
      <CustomButton
        onPress={() => navigate('Pharmacies')}
        title={t('favouritePharmacies.add')}
        color={'black'}
        backgroundColor={currentTheme.customBtnBackground}
        icon={<Icons name="pharmacy" color="black" />}
      />
    </View>
  );
};

export default FavouritePharmacies;
