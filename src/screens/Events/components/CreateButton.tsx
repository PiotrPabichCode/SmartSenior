import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';

type Props = {
  onPress: any;
};

const CreateButton = ({ onPress }: Props) => {
  return (
    <Button
      size="lg"
      title={t('createEvent.button.submit')}
      buttonStyle={{ backgroundColor: 'rgba(127, 220, 103, 1)' }}
      containerStyle={{ minWidth: '95%', borderRadius: 25 }}
      onPress={() => onPress()}
    />
  );
};

export default CreateButton;
