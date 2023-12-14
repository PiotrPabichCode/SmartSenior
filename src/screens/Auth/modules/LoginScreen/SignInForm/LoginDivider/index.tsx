import { Text } from '@rneui/themed';
import useThemeColors from '@src/config/useThemeColors';
import { t } from '@src/localization/Localization';
import { View, StyleSheet } from 'react-native';

const LoginDivider = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{t('login.or')}</Text>
      <View style={styles.line} />
    </View>
  );
};

export default LoginDivider;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 20,
    },
    line: {
      flex: 1,
      height: 1,
      backgroundColor: theme.text,
    },
    text: { width: 50, textAlign: 'center', color: theme.text },
  });
