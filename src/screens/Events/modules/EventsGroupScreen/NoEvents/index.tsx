import { View, Text, StyleSheet } from 'react-native';
import { t } from '@src/localization/Localization';

const NoEvents = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('eventsScreen.noActiveEvents')}</Text>
    </View>
  );
};

export default NoEvents;

const styles = StyleSheet.create({
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
