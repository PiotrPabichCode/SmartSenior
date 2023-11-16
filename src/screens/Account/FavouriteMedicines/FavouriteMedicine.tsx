import { Button } from '@rneui/themed';
import CustomToast from '@src/components/CustomToast';
import Icons, { renderIcon } from '@src/components/Icons';
import { t } from '@src/localization/Localization';
import { Medicine } from '@src/models';
import { navigate } from '@src/navigation/navigationUtils';
import { deleteMedicine } from '@src/redux/medicines/medicines.actions';
import { useAppDispatch } from '@src/redux/types';
import { View, Text, Alert } from 'react-native';

const FavouriteMedicine = ({ medicine }: { medicine: Medicine }) => {
  const dispatch = useAppDispatch();
  const onPressDelete = async () => {
    try {
      await dispatch(deleteMedicine(medicine.key)).unwrap();
      CustomToast('success', t('favouritePharmacies.deleteSuccess'));
    } catch (error) {
      CustomToast('error', t('favouritePharmacies.deleteError'));
      console.log(error);
    }
  };

  const handleDeleteItem = () => {
    Alert.alert(t('favouritePharmacies.alertTitle'), t('favouritePharmacies.alertQuestion'), [
      {
        text: t('no'),
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: t('yes'),
        style: 'destructive',
        onPress: async () => await onPressDelete(),
      },
    ]);
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 60,
        padding: 5,
      }}>
      {renderIcon({ name: 'pills', size: 24 })}
      <Text style={{ width: 150 }} numberOfLines={2} adjustsFontSizeToFit={true}>
        {medicine.productName}
      </Text>
      <Button
        title={t('button.more')}
        onPress={() => {
          navigate('MedicinesItemDetails', {
            medicine: medicine,
          });
        }}
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 25,
        }}
        titleStyle={{
          fontSize: 10,
        }}
      />
      <Icons name={'heart'} size={20} onPress={handleDeleteItem} />
    </View>
  );
};

export default FavouriteMedicine;