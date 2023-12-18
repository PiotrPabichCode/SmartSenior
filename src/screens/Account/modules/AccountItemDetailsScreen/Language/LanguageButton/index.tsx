import { Icons } from '@src/components';
import useThemeColors from '@src/config/useThemeColors';
import { StyleSheet } from 'react-native';
import { Button } from '@src/components/shared';

type Props = {
  title: string;
  onPress: any;
};

const LanguageButton = ({ title, onPress }: Props) => {
  const backgroundColor = useThemeColors().customBtnBackground;
  return (
    <Button
      size="lg"
      title={title}
      buttonStyle={[styles.button, { backgroundColor }]}
      titleStyle={styles.title}
      icon={<Icons name="language-account" />}
      onPress={onPress}
    />
  );
};

export default LanguageButton;

const styles = StyleSheet.create({
  button: {
    gap: 20,
  },
  title: {
    fontSize: 24,
  },
});
