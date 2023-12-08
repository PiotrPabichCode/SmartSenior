import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { View } from 'react-native';
import { useStyles } from './styles';
import { ActionButtonsProps } from './types';
import { goBack } from '@src/navigation/navigationUtils';

const ActionButtons = ({ onSubmit, isUpdate }: ActionButtonsProps) => {
  const styles = useStyles();
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
