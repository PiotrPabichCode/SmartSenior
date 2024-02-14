import { UserEvent, UserEvents } from '../types';
import { ConnectedUser } from '@src/models';
import { t } from '@src/localization/Localization';
import EventItem from './EventItem';
import { Dispatch, SetStateAction } from 'react';
import { Text } from '@rneui/themed';
import { FlatList, ScrollView } from 'react-native';

type EventsMapperProps = {
  events: UserEvents;
  user: ConnectedUser;
  onEvent: (newEvents: UserEvents) => void;
  onLoad: Dispatch<SetStateAction<boolean>>;
};

const EventsMapper = ({ user, events, onEvent, onLoad }: EventsMapperProps) => {
  const renderItem = ({ item }: { item: UserEvent }) => {
    return (
      <EventItem
        event={item}
        userID={user.user.uid}
        onEvent={() => onEvent(events.filter(event => event.date !== item.date))}
        onLoad={onLoad}
      />
    );
  };

  return (
    events.length > 0 && (
      <>
        <Text h3 h3Style={{ alignSelf: 'center' }}>
          {t('seniorDashboard.upcomingEvents')}
        </Text>
        <ScrollView horizontal scrollEnabled={false}>
          <FlatList
            renderItem={renderItem}
            initialNumToRender={50}
            scrollEventThrottle={16}
            data={events}
            nestedScrollEnabled={true}
            contentContainerStyle={{ paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      </>
    )
  );
};

export default EventsMapper;
