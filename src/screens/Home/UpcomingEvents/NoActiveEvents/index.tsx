import { Button } from '@rneui/themed';
import Icons from '@src/components/Icons';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { View, Text, StyleSheet } from 'react-native';

const NoActiveEvents = () => {
  return (
    <View>
      <Text style={styles.title}>{t('homeScreen.noActiveEvents')}</Text>
      <Button
        onPress={() => navigate('CreateEvent')}
        title={t('speedDial.addEvent')}
        buttonStyle={styles.button}
        icon={<Icons name="events-bottom-nav" color="white" />}
        iconPosition="left"
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
};

export default NoActiveEvents;

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    textAlign: 'center',
    marginVertical: 10,
    maxWidth: '90%',
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: 'black',
    gap: 20,
    padding: 10,
  },
  buttonContainer: {
    borderRadius: 25,
    backgroundColor: 'black',
    elevation: 5,
    marginVertical: 10,
  },
});
