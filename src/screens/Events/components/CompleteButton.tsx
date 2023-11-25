import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { Timestamp } from 'firebase/firestore';

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
        onChange(fieldName, Timestamp.now());
        onPress();
      }}
    />
  );
};

export default CompleteButton;
