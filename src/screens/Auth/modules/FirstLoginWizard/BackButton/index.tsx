import { StyleSheet, TouchableOpacity } from 'react-native';
import Icons from '@src/components/Icons';
import { logout } from '@src/redux/auth/auth.api';
import { t } from '@src/localization/Localization';
import useThemeColors from '@src/config/useThemeColors';
import { Text } from '@rneui/themed';

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

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    logout: {
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignSelf: 'flex-end',
      alignItems: 'center',
      borderRadius: 25,
      gap: 10,
      margin: 5,
      borderWidth: 0.5,
      elevation: 5,
      backgroundColor: 'darkblue',
    },
    logoutTitle: {
      fontWeight: '500',
    },
  });
