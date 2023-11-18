import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';

type Props = {
  onPress: any;
};

const CompleteButton = ({ onPress }: Props) => {
  return (
    <Button
      title={t('eventItemScreen.button.title.execute')}
      buttonStyle={{ backgroundColor: 'darkblue', borderRadius: 25 }}
      containerStyle={{ alignSelf: 'stretch' }}
      onPress={() => onPress()}
    />
  );
};

export default CompleteButton;
