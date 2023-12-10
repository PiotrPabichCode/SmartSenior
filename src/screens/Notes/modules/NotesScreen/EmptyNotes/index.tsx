import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '@src/components/CustomButton';
import Icons from '@src/components/Icons';
import { navigate } from '@src/navigation/navigationUtils';
import { useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import Colors from '@src/constants/Colors';
import { t } from '@src/localization/Localization';

const EmptyNotes = () => {
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{t('emptyNotesDescription')}</Text>
      <CustomButton
        onPress={() => navigate('CreateNote')}
        title={t('emptyNotesButton')}
        titleStyle={styles.buttonTitle}
        color={Colors.black}
        style={styles.button}
        backgroundColor={currentTheme.customBtnBackground}
        icon={<Icons name="notes" color={Colors.black} size={36} />}
      />
    </View>
  );
};

export default EmptyNotes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 0.2,
    maxWidth: '70%',
    marginBottom: 10,
  },
  button: {
    gap: 40,
  },
  buttonTitle: {
    fontSize: 18,
  },
});
