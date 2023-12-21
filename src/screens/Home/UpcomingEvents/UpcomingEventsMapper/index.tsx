import { View, StyleSheet } from 'react-native';
import { UpcomingEventItems } from '../../types';
import MoreButton from './MoreButton';
import useThemeColors from '@src/config/useThemeColors';
import ActionButton from './ActionButton';
import { Divider, Text } from '@rneui/themed';
import { Icon } from '@rneui/themed';
import { convertTimestampToDate } from '@src/utils/utils';

type EventMapperProps = {
  upcomingEvents: UpcomingEventItems;
};

const UpcomingEventsMapper = ({ upcomingEvents }: EventMapperProps) => {
  const { icon } = useThemeColors();
  const styles = useStyles();
  const MAX_DISPLAYED_EVENTS = 3;

  return upcomingEvents.map((event, index: number) => {
    if (index === MAX_DISPLAYED_EVENTS) {
      return <MoreButton key={index} />;
    }
    if (index > MAX_DISPLAYED_EVENTS) {
      return;
    }
    const isEnd = index !== upcomingEvents.length - 1;
    return (
      <View style={styles.container} key={index}>
        <View style={styles.dates}>
          <Icon name="arrow-right" size={30} color={icon} />
          <Text style={styles.date} numberOfLines={1}>
            {convertTimestampToDate(event.date!, 'DD-MM-YYYY HH:mm')}
          </Text>
          <Icon name="arrow-left" size={30} color={icon} />
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {event.title}
        </Text>
        <ActionButton date={event.date} groupKey={event.groupKey} />
        {isEnd && <Divider />}
      </View>
    );
  });
};

export default UpcomingEventsMapper;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      marginVertical: 5,
      gap: 5,
    },
    title: {
      fontSize: 17,
    },
    dates: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    date: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
