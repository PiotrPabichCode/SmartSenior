import { Text, TouchableOpacity } from 'react-native';
import Icons from '@src/components/Icons';
import { logout } from '@src/redux/auth/auth.api';
import { t } from '@src/localization/Localization';
import { useStyles } from './styles';

const BackButton = () => {
  const styles = useStyles();
  return (
    <TouchableOpacity style={styles.logout} onPress={() => logout()}>
      <Text style={styles.logoutTitle}>{t('firstLoginWizard.button.title.logout')}</Text>
      <Icons name="logout-wizard" />
    </TouchableOpacity>
  );
};

export default BackButton;
