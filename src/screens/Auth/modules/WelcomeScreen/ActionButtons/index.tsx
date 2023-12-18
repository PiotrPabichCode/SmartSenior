import useThemeColors from '@src/config/useThemeColors';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { View, StyleSheet } from 'react-native';
import { Button } from '@src/components/shared';

const ActionButtons = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      {/* Buttons at the bottom */}
      <Button
        size="lg"
        title={t('welcome.signUp')}
        buttonStyle={[styles.buttonSignUp, styles.button]}
        onPress={() => navigate('SignUp')}
      />
      <Button
        size="lg"
        title={t('welcome.signIn')}
        buttonStyle={[styles.buttonSignIn, styles.button]}
        onPress={() => navigate('SignIn')}
      />
    </View>
  );
};

export default ActionButtons;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: {
      width: '100%',
      position: 'absolute',
      gap: 10,
      bottom: 10,
    },
    button: {
      paddingVertical: 15,
    },
    buttonSignUp: {
      backgroundColor: theme.background,
    },
    buttonSignIn: {
      backgroundColor: theme.grey4,
    },
  });
