import { Text } from '@rneui/themed';
import CustomButton from '@src/components/CustomButton';
import Icons from '@src/components/Icons';
import useThemeColors from '@src/config/useThemeColors';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { View, StyleSheet } from 'react-native';

const EmptyMedicines = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{t('favouriteMedicines.description')}</Text>
      <CustomButton
        onPress={() => navigate('Medicines')}
        title={t('favouriteMedicines.add')}
        icon={<Icons name="pills" />}
      />
    </View>
  );
};

export default EmptyMedicines;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 30,
      backgroundColor: theme.cardBackground,
    },
    description: {
      fontSize: 17,
      textAlign: 'center',
      marginVertical: 10,
      maxWidth: '90%',
      letterSpacing: 0.8,
      color: theme.text,
    },
  });
