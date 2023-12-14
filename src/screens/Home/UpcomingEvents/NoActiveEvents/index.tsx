import { Text } from '@rneui/themed';
import { Button } from '@rneui/themed';
import Icons from '@src/components/Icons';
import useThemeColors from '@src/config/useThemeColors';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { View, StyleSheet } from 'react-native';

const NoActiveEvents = () => {
  const styles = useStyles();
  return (
    <View>
      <Text style={styles.title}>{t('homeScreen.noActiveEvents')}</Text>
      <Button
        size="lg"
        onPress={() => navigate('CreateEvent')}
        title={t('speedDial.addEvent')}
        buttonStyle={styles.button}
        icon={<Icons name="events-bottom-nav" />}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
};

export default NoActiveEvents;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    title: {
      fontSize: 17,
      textAlign: 'center',
      marginVertical: 10,
      maxWidth: '90%',
      letterSpacing: 0.5,
    },
    button: {
      backgroundColor: theme.customBtnBackground,
      gap: 20,
    },
    buttonContainer: {
      elevation: 5,
      marginVertical: 10,
    },
  });
