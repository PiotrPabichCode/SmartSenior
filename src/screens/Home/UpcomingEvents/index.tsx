import { View } from 'react-native';
import { Icon, Divider, Text } from '@rneui/themed';
import { convertTimestampToDate } from '@src/utils/utils';
import { t } from '@src/localization/Localization';
import { useAppSelector } from '@src/redux/types';
import { selectTheme } from '@src/redux/auth/auth.slice';
import NoActiveEvents from './NoActiveEvents';
import { UpcomingEventsProps } from './types';
import MoreButton from './MoreButton';
import ActionButton from './ActionButton';
import { useStyles } from './styles';
import Colors from '@src/constants/Colors';

const UpcomingEvents = ({ upcomingEvents }: UpcomingEventsProps) => {
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];
  const styles = useStyles(currentTheme);

  const MAX_DISPLAYED_EVENTS = 3;

  const mapEventItems = upcomingEvents.map((event, index: number) => {
    if (index === MAX_DISPLAYED_EVENTS) {
      return <MoreButton key={index} />;
    }
    if (index > MAX_DISPLAYED_EVENTS) {
      return;
    }
    const isEnd = index !== upcomingEvents.length - 1;
    return (
      <View style={styles.eventView} key={index}>
        <View style={styles.eventTimeView}>
          <Icon name="arrow-right" size={30} color={currentTheme.icon} />
          <Text style={styles.date} numberOfLines={1}>
            {convertTimestampToDate(event.date!, 'DD-MM-YYYY HH:mm')}
          </Text>
          <Icon name="arrow-left" size={30} color={currentTheme.icon} />
        </View>
        <Text style={styles.eventTitle} numberOfLines={1}>
          {event.title}
        </Text>
        <ActionButton date={event.date} groupKey={event.groupKey} />
        {isEnd && <Divider style={styles.dividerStyle} />}
      </View>
    );
  });

  return (
    <View style={styles.viewStyle}>
      <Text h4 style={{ marginVertical: 5 }}>
        {t('upcomingEvents.title')}
      </Text>
      {upcomingEvents.length > 0 ? mapEventItems : <NoActiveEvents />}
    </View>
  );
};

export default UpcomingEvents;
