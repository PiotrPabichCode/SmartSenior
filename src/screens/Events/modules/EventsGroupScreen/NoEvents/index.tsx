import { View, StyleSheet } from 'react-native';
import { t } from '@src/localization/Localization';
import useThemeColors from '@src/config/useThemeColors';
import { Text } from '@rneui/themed';

const NoEvents = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('eventsScreen.noActiveEvents')}</Text>
    </View>
  );
};

export default NoEvents;

const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 50,
    },
  });
