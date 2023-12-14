import { Text } from '@rneui/themed';
import CustomButton from '@src/components/CustomButton';
import Icons from '@src/components/Icons';
import useThemeColors from '@src/config/useThemeColors';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { View, StyleSheet } from 'react-native';

const EmptyPharmacies = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{t('favouritePharmacies.description')}</Text>
      <CustomButton
        onPress={() => navigate('Pharmacies')}
        title={t('favouritePharmacies.add')}
        icon={<Icons name="pharmacy" />}
      />
    </View>
  );
};

export default EmptyPharmacies;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 30 },
    description: {
      fontSize: 17,
      textAlign: 'center',
      marginVertical: 10,
      maxWidth: '85%',
      letterSpacing: 0.5,
      color: theme.text,
    },
  });
