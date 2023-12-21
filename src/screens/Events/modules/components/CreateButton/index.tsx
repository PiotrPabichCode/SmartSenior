import { t } from '@src/localization/Localization';
import { Button } from '@src/components/shared';

type Props = {
  onPress: any;
};

const CreateButton = ({ onPress }: Props) => {
  return <Button title={t('createEvent.button.submit')} onPress={() => onPress()} color="green" />;
};

export default CreateButton;
