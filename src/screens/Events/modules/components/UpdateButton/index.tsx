import { t } from '@src/localization/Localization';
import Colors from '@src/constants/Colors';
import { Button } from '@src/components/shared';

type Props = {
  visible: boolean;
  onPress: any;
};

const UpdateButton = ({ visible, onPress }: Props) => {
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
