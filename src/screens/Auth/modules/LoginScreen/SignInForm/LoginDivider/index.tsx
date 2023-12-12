import { t } from '@src/localization/Localization';
import { View, Text, StyleSheet } from 'react-native';

const LoginDivider = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{t('login.or')}</Text>
      <View style={styles.line} />
    </View>
  );
};

export default LoginDivider;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  text: { width: 50, textAlign: 'center' },
});
