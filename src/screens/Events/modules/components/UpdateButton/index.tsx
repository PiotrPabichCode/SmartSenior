import { t } from '@src/localization/Localization';
import Colors from '@src/constants/Colors';
import { Button } from '@src/components/shared';

type UpdateButtonProps = {
  visible: boolean;
  onPress: () => void;
};

const UpdateButton = ({ visible, onPress }: UpdateButtonProps) => {
  return (
    visible && (
      <Button
        title={t('eventItemScreen.button.title.update')}
        buttonStyle={{ backgroundColor: Colors.black }}
        onPress={() => onPress()}
      />
    )
  );
};

export default UpdateButton;
