import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';

type Props = {
  onPress: any;
  fieldName: string;
  onChange: any;
};

const CompleteButton = ({ onPress, onChange, fieldName }: Props) => {
  return (
    <Button
      title={t('eventItemScreen.button.title.execute')}
      buttonStyle={{ backgroundColor: 'darkblue', borderRadius: 25 }}
      containerStyle={{ alignSelf: 'stretch' }}
      onPress={() => {
        onChange(fieldName, true);
        onPress();
      }}
    />
  );
};

export default CompleteButton;
