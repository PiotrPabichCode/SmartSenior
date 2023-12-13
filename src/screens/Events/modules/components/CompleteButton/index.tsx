import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { Timestamp } from 'firebase/firestore';
import { StyleSheet } from 'react-native';

type Props = {
  onPress: any;
  fieldName: string;
  onChange: any;
};

const CompleteButton = ({ onPress, onChange, fieldName }: Props) => {
  return (
    <Button
      size="lg"
      title={t('eventItemScreen.button.title.execute')}
      buttonStyle={styles.button}
      onPress={() => {
        onChange(fieldName, Timestamp.now());
        onPress();
      }}
    />
  );
};

export default CompleteButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'darkblue',
  },
});
