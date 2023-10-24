import { View, Text, useColorScheme } from 'react-native';
import React from 'react';
import CustomButton from '@src/components/CustomButton';
import { navigate } from '@src/navigation/navigationUtils';
import { translate } from '@src/localization/Localization';
import Icons from '@src/components/Icons';
import Colors from '@src/constants/Colors';
import { useAppSelector } from '@src/redux/store';
import { Theme } from '@src/redux/types';

const HomeButtons = () => {
  const theme: Theme = useAppSelector(state => state.auth.theme);
  const currentTheme = Colors[theme];
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <CustomButton
        onPress={() => navigate('Medicines')}
        title={translate('homeScreen.button.title.medicines')}
        color={'black'}
        backgroundColor={currentTheme.customBtnBackground}
        icon={<Icons name="pills" color="black" />}
      />
      <CustomButton
        title={translate('homeScreen.button.title.doctors')}
        color={'black'}
        backgroundColor={currentTheme.customBtnBackground}
        icon={<Icons name="doctor" color="black" />}
      />
      <CustomButton
        onPress={() => navigate('Pharmacies')}
        title={translate('homeScreen.button.title.pharmacies')}
        color={'black'}
        backgroundColor={currentTheme.customBtnBackground}
        icon={<Icons name="pharmacy" color="black" />}
      />
      <CustomButton
        title={translate('homeScreen.button.title.notes')}
        color={'black'}
        backgroundColor={currentTheme.customBtnBackground}
        icon={<Icons name="notes" color="black" />}
      />
    </View>
  );
};

export default HomeButtons;
