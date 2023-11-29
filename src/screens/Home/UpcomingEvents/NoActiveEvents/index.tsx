import { Button } from '@rneui/themed';
import Icons from '@src/components/Icons';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { View, Text } from 'react-native';
import { useStyles } from './styles';

const NoActiveEvents = () => {
  const styles = useStyles();
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
