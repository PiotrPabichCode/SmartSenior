import { ConnectedUser, ConnectedUsers } from '@src/models';
import ConnectedUserItem from './ConnectedUserItem';
import { StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';
import { t } from '@src/localization/Localization';

type ConnectedUsersMapperProps = {
  connectedUsers: ConnectedUsers;
};

const ConnectedUsersMapper = ({ connectedUsers }: ConnectedUsersMapperProps) => {
  return (
    connectedUsers.length > 0 && (
      <View style={styles.container}>
        <Text style={styles.title}>{t('connectedUsers.keeperTitle')}</Text>
        <View style={styles.container}>
          {connectedUsers.map((connectedUser: ConnectedUser, index) => {
            return <ConnectedUserItem connectedUser={connectedUser} key={index} />;
          })}
        </View>
      </View>
    )
  );
};

export default ConnectedUsersMapper;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
});
