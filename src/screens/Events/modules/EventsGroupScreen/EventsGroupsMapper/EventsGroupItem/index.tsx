import { View, TouchableOpacity } from 'react-native';
import { Text } from '@rneui/themed';
import { useAppSelector } from '@src/redux/types';
import { selectEventsGroupByKey } from '@src/redux/events/events.slice';
import { goBack, navigate } from '@src/navigation/navigationUtils';
import { StyleSheet } from 'react-native';
import Icons from '@src/components/Icons';
import Frequency from './Frequency';
import ActivationSwitch from './ActivationSwitch';
import ModificationDates from './ModificationDates';

type Props = {
  groupKey: string;
};

const EventsGroupItem = ({ groupKey }: Props) => {
  const eventsGroup = useAppSelector(state => selectEventsGroupByKey(state, groupKey));

  if (!eventsGroup) {
    goBack();
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.innerContainer}
        onPress={() =>
          navigate('EventsGroup', {
            groupKey: groupKey,
          })
        }>
        <Icons
          name="settings"
          style={styles.settings}
          size={28}
          onPress={() =>
            navigate('EventsGroupDetails', {
              groupKey: groupKey,
            })
          }
        />
        <Text h4 numberOfLines={1} style={styles.title}>
          {eventsGroup.title}
        </Text>

        <View style={styles.datesContainer}>
          <ModificationDates createdAt={eventsGroup.createdAt} updatedAt={eventsGroup.updatedAt} />
          <Frequency frequency={eventsGroup.frequency} />
          <ActivationSwitch
            active={eventsGroup.active}
            groupKey={groupKey}
            eventsGroup={eventsGroup}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EventsGroupItem;

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  innerContainer: { minWidth: '100%', alignItems: 'center' },
  divider: { minWidth: '100%', height: 1, backgroundColor: 'black' },
  title: {
    textAlign: 'center',
    marginHorizontal: 20,
  },
  settings: {
    alignSelf: 'flex-end',
  },
  datesContainer: {
    alignItems: 'center',
  },
});
