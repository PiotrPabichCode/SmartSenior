import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { StyleSheet, View } from 'react-native';
import { ActionButtonsProps } from './types';
import { goBack } from '@src/navigation/navigationUtils';

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
    gap: 10,
    minWidth: '100%',
  },
  buttonContainer: {
    flex: 1,
  },
});
