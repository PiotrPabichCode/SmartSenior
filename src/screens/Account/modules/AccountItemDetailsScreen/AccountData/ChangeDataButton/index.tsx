import useThemeColors from '@src/config/useThemeColors';
import { t } from '@src/localization/Localization';
import { StyleSheet } from 'react-native';
import { Button } from '@src/components/shared';

type Props = {
  visible: boolean;
  onSubmit: () => void;
};

const ChangeDataButton = ({ visible, onSubmit }: Props) => {
  const backgroundColor = useThemeColors().grey4;
  return (
    visible && (
      <Button
        title={t('account.changeData')}
        buttonStyle={[styles.changeDataButton, { backgroundColor }]}
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
