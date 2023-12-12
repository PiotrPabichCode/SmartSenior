import { Button } from '@rneui/themed';
import { ChangePasswordButtonProps } from './types';
import { StyleSheet } from 'react-native';

const ChangePasswordButton = ({ title, onPress }: ChangePasswordButtonProps) => {
  return (
    <Button
      title={title}
      containerStyle={styles.container}
      buttonStyle={styles.button}
      onPress={onPress}
    />
  );
};

export default ChangePasswordButton;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  button: {
    padding: 15,
    backgroundColor: 'green',
  },
});
