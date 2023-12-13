import { t } from '@src/localization/Localization';
import { store } from '@src/redux/common';
import { downloadMedicineFile } from '@src/redux/medicines/medicines.actions';
import { Alert } from 'react-native';

export const onPress = (name: string, url: string) => {
  Alert.alert(
    t('medicineItem.alertDownloadTitle'),
    t('medicineItem.alertDownloadCharacteristicQuestion', {
      name: name,
    }),
    [
      {
        text: t('no'),
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: t('yes'),
        style: 'destructive',
        onPress: () => {
          store.dispatch(downloadMedicineFile(url));
        },
      },
    ],
  );
};
