import { View, Text } from 'react-native';
import { t } from '@src/localization/Localization';
import { useStyles } from './styles';

const EmptyChat = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('chat.noActiveChats')}</Text>
    </View>
  );
};

export default EmptyChat;
