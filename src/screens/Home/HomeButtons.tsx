import { View, Text } from 'react-native';
import React from 'react';
import CustomButton from '@src/components/CustomButton';
import { navigate } from '@src/navigation/navigationUtils';
import { translate } from '@src/localization/Localization';

const HomeButtons = () => {
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <CustomButton
        onPress={() => navigate('Medicines')}
        title={translate('homeScreen.button.title.medicines')}
        backgroundColor={'#FB6D6C'}
        icon={'pills'}
      />
      <CustomButton
        title={translate('homeScreen.button.title.doctors')}
        backgroundColor={'#fb8500'}
        icon={'doctor'}
      />
      <CustomButton
        onPress={() => navigate('Pharmacies')}
        title={translate('homeScreen.button.title.pharmacies')}
        backgroundColor={'#9564FE'}
        icon={'pharmacy'}
      />
      <CustomButton
        title={translate('homeScreen.button.title.notes')}
        backgroundColor={'#469323'}
        icon={'notes'}
      />
    </View>
  );
};

export default HomeButtons;
