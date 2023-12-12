import CustomButton from '@src/components/CustomButton';
import Icons from '@src/components/Icons';
import Colors from '@src/constants/Colors';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { useAppSelector } from '@src/redux/types';
import { View, Text, StyleSheet } from 'react-native';

const EmptyMedicines = () => {
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{t('favouriteMedicines.description')}</Text>
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

export default EmptyMedicines;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 30 },
  description: {
    fontSize: 17,
    textAlign: 'center',
    marginVertical: 10,
    maxWidth: '90%',
    letterSpacing: 0.8,
  },
});
