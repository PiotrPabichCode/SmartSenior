import { Button } from '@rneui/themed';
import { StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress: any;
};

const LanguageButton = ({ title, onPress }: Props) => {
  return (
    <Button
      size="lg"
      title={title}
      buttonStyle={styles.button}
      titleStyle={styles.title}
      icon={{ type: 'font-awesome', name: 'language', color: 'white' }}
      onPress={onPress}
    />
  );
};

export default LanguageButton;

const styles = StyleSheet.create({
  button: {
    gap: 10,
  },
  title: {
    fontSize: 20,
  },
});
