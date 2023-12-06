import { t } from '@src/localization/Localization';
import { EventItems } from '../EventsScreen';
import NewEventItem from './NewEventItem';
import { Text } from '@rneui/themed';

type Props = {
  events: EventItems;
  visible: boolean;
};

const UpcomingEvents = ({ events, visible }: Props) => {
  const mapUpcomingEvents = events.map((e, index) => {
    return (
      <NewEventItem
        key={index}
        groupKey={e.groupKey}
        title={e.title}
        date={e.date}
        active={e.active}
        tags={e.tags}
        completed={e.completed}
      />
    );
  });

  return (
    visible &&
    events.length > 0 && (
      <>
        <Text h4 numberOfLines={1} adjustsFontSizeToFit h4Style={{ marginVertical: 5 }}>
          {t('eventGroups.upcomingEventsTitle')}
        </Text>
        {mapUpcomingEvents}
      </>
    )
  );
};

export default UpcomingEvents;