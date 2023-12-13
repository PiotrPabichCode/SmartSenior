import { View, Text, StyleSheet } from 'react-native';
import { Divider } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import LeafletButton from './LeafletButton';
import CharacteristicButton from './CharacteristicButton';
import { useAppSelector } from '@src/redux/types';
import { selectMedicinesStatus } from '@src/redux/medicines/medicines.slice';
import DetailsItem from './DetailsItem';
import { Medicine } from '@src/models';

type Props = {
  medicineItem: Medicine;
};

const Details = ({ medicineItem }: Props) => {
  const status = useAppSelector(state => selectMedicinesStatus(state));

  if (status === 'pending') {
    return <CustomActivityIndicator />;
  }

  return (
    <>
      <Text style={styles.name}>{medicineItem.productName}</Text>
      <DetailsItem title={t('medicineItem.commonName')} detail={medicineItem.commonName} />
      <DetailsItem title={t('medicineItem.power')} detail={medicineItem.power} />
      <DetailsItem
        title={t('medicineItem.pharmaceuticalForm')}
        detail={medicineItem.pharmaceuticalForm}
      />
      <DetailsItem
        title={t('medicineItem.activeSubstance')}
        detail={medicineItem.activeSubstance}
      />
      <DetailsItem title={t('medicineItem.packaging')} detail={medicineItem.packaging} />
      <DetailsItem title={t('medicineItem.expiration')} detail={medicineItem.expiration} />
      <DetailsItem title={t('medicineItem.company')} detail={medicineItem.company} />
      <DetailsItem title={t('medicineItem.country')} detail={medicineItem.country} />
      <Divider style={styles.divider} />
      {medicineItem.leafletUrl && medicineItem.characteristicUrl && (
        <View style={styles.buttons}>
          <LeafletButton url={medicineItem.leafletUrl} name={medicineItem.commonName} />
          <CharacteristicButton url={medicineItem.leafletUrl} name={medicineItem.commonName} />
        </View>
      )}
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  name: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'black',
    height: 1,
  },
  buttons: {
    flexDirection: 'row',
  },
});
