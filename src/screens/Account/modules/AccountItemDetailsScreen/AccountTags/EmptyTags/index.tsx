import { t } from '@src/localization/Localization';
import { View, StyleSheet } from 'react-native';
import AddTagButton from '../AddTagButton';
import useThemeColors from '@src/config/useThemeColors';
import { Text } from '@rneui/themed';

const EmptyTags = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('tags.noAssignedTags')}</Text>
      <Text style={styles.description}>{t('tags.description')}</Text>
      <AddTagButton />
    </View>
  );
};

export default EmptyTags;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    title: {
      fontSize: 22,
      textAlign: 'center',
      color: theme.text,
    },
    description: {
      fontSize: 17,
      textAlign: 'center',
      marginVertical: 10,
      maxWidth: '90%',
      letterSpacing: 0.5,
      color: theme.text,
    },
  });
