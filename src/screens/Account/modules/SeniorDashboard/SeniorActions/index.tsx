import { View, Text, TouchableOpacity } from 'react-native';
import { ConnectedUser } from '@src/models';
import { t } from '@src/localization/Localization';
import { getSeniorLocation } from '@src/redux/auth/auth.api';
import { useStyles } from './styles';
import EventsMapper from './EventsMapper';

const SeniorActions = ({ user }: { user: ConnectedUser }) => {
  const eventGroups = user.eventGroups;
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.actionContainer}
        onPress={() => {
          getSeniorLocation(user.user.uid);
        }}>
        <Text style={styles.actionText} numberOfLines={1}>
          {t('seniorDashboard.localization')}
        </Text>
      </TouchableOpacity>
      <EventsMapper eventGroups={eventGroups} user={user} />
    </View>
  );
};

export default SeniorActions;
