import CustomButton from '@src/components/CustomButton';
import Icons from '@src/components/Icons';
import Colors from '@src/constants/Colors';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { useAppSelector } from '@src/redux/types';
import { View, Text } from 'react-native';

const EmptyPharmacies = () => {
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 30 }}>
      <Text
        style={{
          fontSize: 17,
          textAlign: 'center',
          marginVertical: 10,
          maxWidth: '85%',
          letterSpacing: 0.5,
        }}>
        {t('favouritePharmacies.description')}
      </Text>
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

export default EmptyPharmacies;
