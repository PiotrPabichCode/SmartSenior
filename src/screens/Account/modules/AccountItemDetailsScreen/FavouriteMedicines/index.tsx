import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { selectMedicines, selectMedicinesStatus } from '@src/redux/medicines/medicines.slice';
import { useAppSelector } from '@src/redux/types';
import { View, Text } from 'react-native';
import EmptyMedicines from './EmptyMedicines';
import FavouriteMedicine from './FavouriteMedicine';
import { selectTheme } from '@src/redux/auth/auth.slice';
import Colors from '@src/constants/Colors';
import CustomButton from '@src/components/CustomButton';
import { navigate } from '@src/navigation/navigationUtils';
import { t } from '@src/localization/Localization';
import Icons from '@src/components/Icons';

const FavouriteMedicines = () => {
  const medicines = useAppSelector(state => selectMedicines(state));
  const status = useAppSelector(state => selectMedicinesStatus(state));
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];

  if (status === 'pending') {
    return <CustomActivityIndicator />;
  }

  if (medicines.length === 0) {
    return <EmptyMedicines />;
  }

  const mapMedicines = medicines.map((medicine, index) => {
    return <FavouriteMedicine key={index} medicine={medicine} />;
  });

  return (
    <View style={{ gap: 15, flex: 1 }}>
      {mapMedicines}
      <CustomButton
        onPress={() => navigate('Medicines')}
        title={t('favouriteMedicines.add')}
        color={'black'}
        backgroundColor={currentTheme.customBtnBackground}
        icon={<Icons name="pills" color="black" />}
      />
    </View>
  );
};

export default FavouriteMedicines;
