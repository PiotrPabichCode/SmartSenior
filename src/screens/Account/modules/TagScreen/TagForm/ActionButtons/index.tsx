import { t } from '@src/localization/Localization';
import { StyleSheet, View } from 'react-native';
import { goBack } from '@src/navigation/navigationUtils';
import { Button } from '@src/components/shared';

type ActionButtonsProps = {
  onSubmit: () => void;
  isUpdate: boolean;
};

const ActionButtons = ({ onSubmit, isUpdate }: ActionButtonsProps) => {
  return (
    <View style={styles.container}>
      <Button
        color={'green'}
        onPress={() => onSubmit()}
        title={isUpdate ? t('tags.update') : t('tags.add')}
        containerStyle={styles.buttonContainer}
      />
      <Button
        color={'red'}
        onPress={() => goBack()}
        title={t('tags.cancel')}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});
