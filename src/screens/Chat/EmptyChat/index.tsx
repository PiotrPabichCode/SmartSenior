import { View, Text, StyleSheet } from 'react-native';
import { t } from '@src/localization/Localization';

const EmptyChat = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('chat.noActiveChats')}</Text>
    </View>
  );
};

export default EmptyChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
  },
});
