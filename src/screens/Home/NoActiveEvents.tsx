import { Button } from '@rneui/themed';
import Icons from '@src/components/Icons';
import { t } from '@src/localization/Localization';
import { navigate } from '@src/navigation/navigationUtils';
import { selectTheme } from '@src/redux/auth/auth.slice';
import { useAppSelector } from '@src/redux/types';
import { View, Text } from 'react-native';

const NoActiveEvents = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: 17,
          textAlign: 'center',
          marginVertical: 10,
          maxWidth: '90%',
          letterSpacing: 0.5,
        }}>
        {t('homeScreen.noActiveEvents')}
      </Text>
      <Button
        onPress={() => navigate('CreateEvent')}
        title={t('speedDial.addEvent')}
        buttonStyle={{ backgroundColor: 'black', gap: 20, padding: 10 }}
        icon={<Icons name="events-bottom-nav" color="white" />}
        iconPosition="left"
        containerStyle={{
          borderRadius: 25,
          backgroundColor: 'black',
          elevation: 5,
          marginVertical: 10,
        }}
      />
    </View>
  );
};

export default NoActiveEvents;
