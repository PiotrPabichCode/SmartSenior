import { StyleSheet, View } from 'react-native';
import CustomButton from '@src/components/CustomButton';
import { navigate } from '@src/navigation/navigationUtils';
import { t } from '@src/localization/Localization';
import Icons from '@src/components/Icons';
import Colors from '@src/constants/Colors';
import useThemeColors from '@src/config/useThemeColors';

const HomeButtons = () => {
  const iconColor = useThemeColors().icon;
  return (
    <View style={styles.container}>
      <CustomButton
        onPress={() => navigate('Medicines')}
        title={t('homeScreen.button.title.medicines')}
        icon={<Icons name="pills" color={iconColor} />}
      />
      <CustomButton
        onPress={() => navigate('Pharmacies')}
        title={t('homeScreen.button.title.pharmacies')}
        icon={<Icons name="pharmacy" color={iconColor} />}
      />
      <CustomButton
        onPress={() => navigate('Notes')}
        title={t('homeScreen.button.title.notes')}
        icon={<Icons name="notes" color={iconColor} />}
      />
    </View>
  );
};

export default HomeButtons;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
