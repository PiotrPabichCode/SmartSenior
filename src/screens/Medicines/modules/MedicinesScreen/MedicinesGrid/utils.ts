import CustomToast from '@src/components/CustomToast';
import { t } from '@src/localization/Localization';
import { Medicine } from '@src/models';
import { store } from '@src/redux/common';
import { addMedicine, deleteMedicine } from '@src/redux/medicines/medicines.actions';
import { Alert } from 'react-native';

export const handleAddMedicine = async (medicine: Medicine) => {
  try {
    await store.dispatch(addMedicine(medicine)).unwrap();
    CustomToast('success', t('favouriteMedicines.addSuccess'));
  } catch (error) {
    CustomToast('error', t('favouriteMedicines.addError'));
    console.log(error);
  }
};

const onPressDelete = async (key: string) => {
  try {
    await store.dispatch(deleteMedicine(key)).unwrap();
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
