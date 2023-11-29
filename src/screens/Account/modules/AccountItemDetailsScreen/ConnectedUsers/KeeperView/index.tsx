import CustomToast from '@src/components/CustomToast';
import Icons from '@src/components/Icons';
import Colors from '@src/constants/Colors';
import { t } from '@src/localization/Localization';
import { ConnectedUser } from '@src/models';
import { navigate } from '@src/navigation/navigationUtils';
import { addConnectedUser } from '@src/redux/auth/auth.actions';
import { selectConnectedUsers } from '@src/redux/auth/auth.slice';
import { addChat } from '@src/redux/chats/chats.actions';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { createUserLabel } from '@src/utils/utils';
import { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const KeeperView = () => {
  const dispatch = useAppDispatch();
  const connectedUsers = useAppSelector(state => selectConnectedUsers(state));
  const [email, setEmail] = useState<string>('');
  const emailRef = useRef<TextInput | null>(null);

  const mapConnectedUsers = connectedUsers.map((user: ConnectedUser, index: number) => {
    const userData = user.user;
    return (
      <TouchableOpacity
        style={styles.mainContainer}
        key={index}
        onPress={() =>
          navigate('SeniorDashboard', {
            uid: user.user.uid,
            title: t('account.header.seniorDashboard', {
              firstName: user.user.firstName,
              lastName: user.user.lastName,
            }),
          })
        }>
        <View style={styles.avatar}>
          <Text style={styles.avatarLabel}>
            {createUserLabel(userData.firstName, userData.lastName)}
          </Text>
        </View>
        <View style={styles.keeperContainer}>
          <Text style={styles.keeperText} numberOfLines={1}>
            {userData.firstName} {userData.lastName}
          </Text>

          <Text style={styles.keeperText} numberOfLines={1}>
            E-mail: {userData.email}
          </Text>
        </View>
      </TouchableOpacity>
    );
  });

  const handleAddUser = async () => {
    try {
      const connectedUser: ConnectedUser = await dispatch(addConnectedUser(email)).unwrap();
      await dispatch(addChat(connectedUser.user)).unwrap();
      CustomToast('success', t('connectedUsers.message.success.add'));
    } catch (e) {
      console.log(e);
      CustomToast('error', t('connectedUsers.message.error.add'));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <View style={styles.input}>
          <TextInput
            ref={emailRef}
            cursorColor={'black'}
            placeholder={t('connectedUsers.placeholder')}
            value={email}
            style={[styles.inputTitle]}
            underlineColorAndroid="transparent"
            onChangeText={setEmail}
            keyboardType={'email-address'}
          />
          <Icons
            name="add"
            color="white"
            style={{ backgroundColor: 'blue', marginEnd: 5, padding: 5, borderRadius: 25 }}
            onPress={() => handleAddUser()}
          />
        </View>
      </View>
      {connectedUsers.length > 0 && (
        <View style={styles.container}>
          <Text style={styles.title}>{t('connectedUsers.keeperTitle')}</Text>
          <View style={[styles.container, styles.view]}>{mapConnectedUsers}</View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightblue',
    borderRadius: 25,
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 20,
    backgroundColor: 'darkblue',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLabel: {
    fontWeight: '600',
    fontSize: 18,
    color: 'white',
  },
  keeperContainer: {
    gap: 10,
  },
  keeperText: {
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    gap: 20,
    alignItems: 'center',
  },
  view: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 25,
    elevation: 5,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 25,
  },
  inputTitle: {
    fontWeight: '500',
    color: 'black',
    backgroundColor: 'white',
    height: 40,
    marginLeft: 18,
    width: '80%',
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: '600',
  },
});

export default KeeperView;
