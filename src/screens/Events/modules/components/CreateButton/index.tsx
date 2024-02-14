import { t } from '@src/localization/Localization';
import { Button } from '@src/components/shared';

type CreateButtonProps = {
  onPress: () => void;
};

const CreateButton = ({ onPress }: CreateButtonProps) => {
  return <Button title={t('createEvent.button.submit')} onPress={() => onPress()} color="green" />;
};

export default CreateButton;
