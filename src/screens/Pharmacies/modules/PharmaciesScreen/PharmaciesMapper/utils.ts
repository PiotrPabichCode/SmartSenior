import CustomToast from '@src/components/CustomToast';
import { t } from '@src/localization/Localization';
import { Pharmacies, Pharmacy } from '@src/models';
import { store } from '@src/redux/common';
import { addPharmacy, deletePharmacy } from '@src/redux/pharmacies/pharmacies.actions';
import { Alert } from 'react-native';

const onPressDelete = async (key: string) => {
  try {
    await store.dispatch(deletePharmacy(key)).unwrap();
    CustomToast('success', t('favouritePharmacies.deleteSuccess'));
  } catch (error) {
    CustomToast('error', t('favouritePharmacies.deleteError'));
    console.log(error);
  }
};

export const handleDeleteItem = (key: string) => {
  Alert.alert(t('favouritePharmacies.alertTitle'), t('favouritePharmacies.alertQuestion'), [
    {
      text: t('no'),
      style: 'cancel',
      onPress: () => {},
    },
    {
      text: t('yes'),
      style: 'destructive',
      onPress: async () => await onPressDelete(key),
    },
  ]);
};

export const handleAddPharmacy = async (pharmacy: Pharmacy) => {
  try {
    await store.dispatch(addPharmacy(pharmacy)).unwrap();
    CustomToast('success', t('favouritePharmacies.addSuccess'));
  } catch (error) {
    CustomToast('error', t('favouritePharmacies.addError'));
    console.log(error);
  }
};
