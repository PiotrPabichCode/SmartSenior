import { t } from '@src/localization/Localization';
import { ConnectedUser } from '@src/models';
import { getSeniorLocation } from '@src/redux/auth/auth.api';
import { StyleSheet } from 'react-native';
import { Button } from '@src/components/shared';

type SeniorLocationButtonProps = {
  user: ConnectedUser;
};

const SeniorLocationButton = ({ user }: SeniorLocationButtonProps) => {
  return (
    <Button
      title={t('seniorDashboard.localization')}
      buttonStyle={styles.button}
      onPress={() => {
        getSeniorLocation(user.user.uid);
      }}
    />
  );
};

export default SeniorLocationButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'green',
  },
});
