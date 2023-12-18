import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { StyleSheet } from 'react-native';
import { Button } from '@src/components/shared';

const AddTagButton = () => {
  return (
    <Button
      size="md"
      title={t('tags.addTitle')}
      titleStyle={styles.title}
      color={'green'}
      onPress={() => navigate('TagScreen')}
    />
  );
};

export default AddTagButton;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
});
