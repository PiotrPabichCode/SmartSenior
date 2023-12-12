import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';

type Props = {
  visible: boolean;
  onSubmit: () => void;
};

const ChangeDataButton = ({ visible, onSubmit }: Props) => {
  return (
    visible && (
      <Button
        title={t('account.changeData')}
        buttonStyle={styles.changeDataButton}
        onPress={() => onSubmit()}
      />
    )
  );
};

export default ChangeDataButton;

const styles = StyleSheet.create({
  changeDataButton: {
    padding: 15,
  },
});
