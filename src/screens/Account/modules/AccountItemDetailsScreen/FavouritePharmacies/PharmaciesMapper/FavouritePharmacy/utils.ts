import { CustomToast } from '@src/components';
import { t } from '@src/localization/Localization';
import { store } from '@src/redux/common';
import { deletePharmacy } from '@src/redux/pharmacies/pharmacies.actions';
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
