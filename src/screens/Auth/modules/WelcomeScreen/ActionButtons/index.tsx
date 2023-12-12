import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { View, Text, StyleSheet } from 'react-native';

const ActionButtons = () => {
  return (
    <View style={styles.container}>
      {/* Buttons at the bottom */}
      <Button
        size="lg"
        title={t('welcome.signUp')}
        buttonStyle={[styles.buttonSignUpStyle, styles.button]}
        onPress={() => navigate('SignUp')}
      />
      <Button
        size="lg"
        title={t('welcome.signIn')}
        buttonStyle={styles.button}
        onPress={() => navigate('SignIn')}
      />
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    gap: 10,
    bottom: 10,
  },
  button: {
    paddingVertical: 15,
  },
  buttonSignUpStyle: {
    backgroundColor: 'rgba(39, 39, 39, 1)',
  },
});
