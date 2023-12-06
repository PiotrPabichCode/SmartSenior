import CustomButton from '@src/components/CustomButton';
import Icons from '@src/components/Icons';
import { t } from '@src/localization/Localization';
import { goBack, navigate } from '@src/navigation/navigationUtils';
import { selectConnectedUsers } from '@src/redux/auth/auth.slice';
import { useAppSelector } from '@src/redux/types';
import { View, Text, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';
import CustomToast from '@src/components/CustomToast';

const mainColor = '#FFFAF0';

const SeniorView = () => {
  const connectedUsers = useAppSelector(state => selectConnectedUsers(state));
  if (connectedUsers.length === 0) {
    goBack();
    return null;
  }
  const keeper = connectedUsers[0].user;
  return (
    <View style={styles.view}>
      <View style={styles.details}>
        <Text style={styles.title}>{t('connectedUsers.seniorTitle')}</Text>
        <View style={styles.detailsButtons}>
          <CustomButton
            title={keeper.firstName + ' ' + keeper.lastName}
            titleStyle={{ fontSize: 16 }}
            style={{ borderWidth: 2, borderColor: 'lightblue', gap: 20 }}
            color={'black'}
            backgroundColor={'white'}
            icon={<Icons name="user" color={'black'} size={24} />}
          />
          <CustomButton
            title={'' + keeper.email}
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
            if (!keeper.phoneNumber) {
              return CustomToast('error', t('message.error.keeperNoPhone'));
            }
            Linking.openURL(`tel:${keeper.phoneNumber}`);
          }}
          title={t('connectedUsers.callKeeper')}
          titleStyle={{ fontSize: 18 }}
          color={mainColor}
          style={{ gap: 20 }}
          backgroundColor={'green'}
          icon={<Icons name="phone" color={mainColor} size={24} />}
        />
        <CustomButton
          onPress={() => navigate('Chat')}
          title={t('connectedUsers.messageKeeper')}
          titleStyle={{ fontSize: 18 }}
          color={mainColor}
          style={{ gap: 20 }}
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