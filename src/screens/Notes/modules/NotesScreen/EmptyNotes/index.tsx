import { View, StyleSheet } from 'react-native';
import Icons from '@src/components/Icons';
import { navigate } from '@src/navigation/navigationUtils';
import { t } from '@src/localization/Localization';
import useThemeColors from '@src/config/useThemeColors';
import { Text } from '@rneui/themed';
import { Button } from '@src/components/shared';

const EmptyNotes = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{t('emptyNotesDescription')}</Text>
      <Button
        size="lg"
        onPress={() => navigate('CreateNote')}
        title={t('emptyNotesButton')}
        buttonStyle={styles.button}
        style={styles.button}
        icon={<Icons name="notes" size={30} />}
      />
    </View>
  );
};

export default EmptyNotes;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 15,
      backgroundColor: theme.cardBackground,
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
      letterSpacing: 0.2,
      maxWidth: '70%',
      marginBottom: 10,
      color: theme.text,
    },
    button: {
      gap: 15,
      paddingVertical: 18,
      backgroundColor: theme.customBtnBackground,
    },
    buttonTitle: {
      fontSize: 18,
    },
  });
