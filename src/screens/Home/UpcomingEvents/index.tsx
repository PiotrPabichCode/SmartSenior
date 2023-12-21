import { StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { useAppSelector } from '@src/redux/types';
import NoActiveEvents from './NoActiveEvents';
import { useUpcomingEvents } from './useUpcomingEvents';
import { selectEventGroups } from '@src/redux/events/events.slice';
import { CustomActivityIndicator } from '@src/components';
import useThemeColors from '@src/config/useThemeColors';
import UpcomingEventsMapper from './UpcomingEventsMapper';

const UpcomingEvents = () => {
  const eventGroups = useAppSelector(state => selectEventGroups(state));
  const { upcomingEvents, isReady } = useUpcomingEvents(eventGroups);
  const styles = useStyles();

  if (!isReady) {
    return <CustomActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text h4>{t('upcomingEvents.title')}</Text>
      {upcomingEvents.length > 0 ? (
        <UpcomingEventsMapper upcomingEvents={upcomingEvents} />
      ) : (
        <NoActiveEvents />
      )}
    </View>
  );
};

export default UpcomingEvents;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: theme.upcomingEventsBackground,
      width: '95%',
      borderRadius: 20,
      overflow: 'hidden',
      paddingVertical: 5,
      elevation: 5,
    },
  });
