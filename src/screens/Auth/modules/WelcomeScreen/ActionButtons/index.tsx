import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { View, Text } from 'react-native';
import { useStyles } from './styles';

const ActionButtons = () => {
  const styles = useStyles();
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
