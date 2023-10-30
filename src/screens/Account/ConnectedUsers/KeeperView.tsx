import CustomButton from '@src/components/CustomButton';
import CustomDivider from '@src/components/CustomDivider';
import Icons from '@src/components/Icons';
import * as Notifications from 'expo-notifications';
import Colors from '@src/constants/Colors';
import { translate } from '@src/localization/Localization';
import { addConnectedUserAction } from '@src/redux/actions/authActions';
import { useAppDispatch } from '@src/redux/store';
import { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { scheduleNotification } from '@src/components/Notifications/Notifications';
import { now } from 'moment';

type Props = {
  connectedUsers: [];
};

type User = {
  firstName: string;
  lastName: string;
  email: string;
};

const KeeperView = ({ connectedUsers }: Props) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const emailRef = useRef<TextInput | null>(null);

  const createUserLabel = (firstName: string, lastName: string) => {
    const label = `${firstName[0]}${lastName[0]}`;
    return label.toUpperCase();
  };

  const mapConnectedUsers = connectedUsers.map((user: User, index: number) => {
    return (
      <TouchableOpacity style={styles.mainContainer} key={index}>
        <View style={styles.avatar}>
          <Text style={styles.avatarLabel}>{createUserLabel(user.firstName, user.lastName)}</Text>
        </View>
        <View style={styles.keeperContainer}>
          <View style={styles.userContainer}>
            <Text
              style={styles.keeperText}
              numberOfLines={1}>{`${user.firstName} ${user.lastName}`}</Text>
          </View>

          <Text style={styles.keeperText} numberOfLines={1}>
            E-mail: {user.email}
          </Text>
        </View>
      </TouchableOpacity>
    );
  });

  const handleAddUser = () => {
    dispatch(addConnectedUserAction(email));
  };

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <View style={styles.input}>
          <TextInput
            ref={emailRef}
            cursorColor={'black'}
            placeholder={translate('connectedUsers.placeholder')}
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
      <CustomButton
        title={'Wyślij powiadomienie'}
        titleStyle={{ fontSize: 16 }}
        style={{ borderWidth: 2, borderColor: 'lightblue', gap: 20 }}
        color={'black'}
        backgroundColor={'white'}
        icon={<Icons name="user" color={'black'} size={24} />}
        onPress={() => console.log('test')}
      />
      {connectedUsers.length > 0 && (
        <View style={[styles.container, styles.view]}>
          <Text style={styles.title}>{translate('connectedUsers.keeperTitle')}</Text>
          <View style={[styles.container, styles.view]}>{mapConnectedUsers}</View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderWidth: 1,
    borderColor: 'lightblue',
    borderRadius: 25,
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
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
    alignItems: 'center',
    gap: 5,
  },
  userContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },
  keeperText: {
    fontSize: 18,
    fontWeight: '600',
  },
  container: {
    width: '100%',
    padding: 10,
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
