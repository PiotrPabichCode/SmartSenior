import { Button } from '@rneui/themed';
import { useStyles } from './styles';
import { ChangePasswordButtonProps } from './types';

const ChangePasswordButton = ({ title, onPress }: ChangePasswordButtonProps) => {
  const styles = useStyles();
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
