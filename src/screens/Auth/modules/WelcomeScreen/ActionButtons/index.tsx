import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { View, Text, StyleSheet } from 'react-native';

const ActionButtons = () => {
  return (
    <View style={styles.container}>
      {/* Buttons at the bottom */}
      <Button
        title={t('welcome.signUp')}
        buttonStyle={styles.buttonSignUpStyle}
        containerStyle={styles.buttonContainerStyle}
        titleStyle={styles.buttonSignUpTitleStyle}
        onPress={() => navigate('SignUp')}
      />
      <Button
        title={t('welcome.signIn')}
        buttonStyle={styles.buttonSignInStyle}
        containerStyle={styles.buttonContainerStyle}
        titleStyle={styles.buttonSignInTitleStyle}
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
    bottom: 0,
  },
  buttonContainerStyle: {
    margin: 10,
  },
  buttonSignUpStyle: {
    backgroundColor: 'rgba(39, 39, 39, 1)',
    borderRadius: 5,
  },
  buttonSignUpTitleStyle: {
    fontSize: 20,
    color: 'white',
  },
  buttonSignInStyle: {
    backgroundColor: 'blue',
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonSignInTitleStyle: {
    fontSize: 20,
    color: 'white',
  },
});
