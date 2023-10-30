import CustomButton from '@src/components/CustomButton';
import Icons from '@src/components/Icons';
import { translate } from '@src/localization/Localization';
import { View, Text, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

const mainColor = '#FFFAF0';

interface PushNotification {
  title: string;
  body: string;
  time: number;
  data?: object;
}

const schedulePushNotification = async ({ title, body, time, data }: PushNotification) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: {
        data: data,
      },
    },
    trigger: { seconds: time },
  });
};

const SeniorView = () => {
  return (
    <View style={styles.view}>
      <View style={styles.details}>
        <Text style={styles.title}>{translate('connectedUsers.seniorTitle')}</Text>
        <View style={styles.detailsButtons}>
          <CustomButton
            title={'Natalia Pabich'}
            titleStyle={{ fontSize: 16 }}
            style={{ borderWidth: 2, borderColor: 'lightblue', gap: 20 }}
            color={'black'}
            backgroundColor={'white'}
            icon={<Icons name="user" color={'black'} size={24} />}
          />
          <CustomButton
            title={'235944@edu.p.lodz.pl'}
            titleStyle={{ fontSize: 16 }}
            style={{ borderWidth: 2, borderColor: 'lightblue', gap: 20 }}
            color={'black'}
            backgroundColor={'white'}
            icon={<Icons name="email" color={'black'} size={24} />}
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <CustomButton
          onPress={() => {
            schedulePushNotification({
              title: 'Testowe powiadomienie',
              body: 'To jest testowe powiadomienia. Opis zadania',
              time: 20,
            });
          }}
          title={'Zadzwoń do opiekuna'}
          titleStyle={{ fontSize: 20 }}
          color={mainColor}
          backgroundColor={'green'}
          icon={<Icons name="phone" color={mainColor} size={24} />}
        />
        <CustomButton
          onPress={() => console.log('message keeper')}
          title={'Napisz do opiekuna'}
          titleStyle={{ fontSize: 20 }}
          color={mainColor}
          backgroundColor={'black'}
          icon={<Icons name="chat" color={mainColor} size={24} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    gap: 20,
  },
  details: {
    flex: 1,
    marginVertical: 60,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'darkblue',
    borderRadius: 25,
    padding: 10,
  },
  detailsButtons: {
    gap: 25,
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center',
  },
  view: {
    height: '100%',
    width: '100%',
  },
  title: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
  },
});

export default SeniorView;
