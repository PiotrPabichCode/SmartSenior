import { StyleSheet } from 'react-native';
import Icons from '@src/components/Icons';
import { t } from '@src/localization/Localization';
import { Button } from '@src/components/shared';
import { logout } from '@src/redux/auth/auth.api';

const BackButton = () => {
  return (
    <Button
      onPress={() => logout()}
      containerStyle={styles.logout}
      color="darkblue"
      icon={<Icons name="logout-wizard" />}
      iconRight>
      {t('firstLoginWizard.button.title.logout')}
    </Button>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  logout: {
    alignSelf: 'flex-end',
  },
});
