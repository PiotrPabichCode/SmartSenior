import { View, StyleSheet } from 'react-native';
import { t } from '@src/localization/Localization';
import useThemeColors from '@src/config/useThemeColors';
import { Text } from '@rneui/themed';

const EmptyChat = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('chat.noActiveChats')}</Text>
    </View>
  );
};

export default EmptyChat;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.cardBackground,
    },
    title: {
      textAlign: 'center',
      fontSize: 24,
      color: theme.text,
    },
  });
