import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { navigate } from '@src/navigation/navigationUtils';
import { Title, Date, TagCard, ActivityStatus } from './components';
import { EventItemProps } from './utils';

const EventItem = ({ groupKey, title, date, tags, active, completed }: EventItemProps) => {
  return (
    <>
      <View style={styles.divider} />
      <TouchableOpacity
        style={[styles.container, { opacity: completed ? 0.3 : 1 }]}
        onPress={() =>
          navigate('EventItem', {
            groupKey: groupKey,
            date: date,
          })
        }>
        <Title completed={completed} title={title} date={date} />
        <View style={styles.detailsContainer}>
          <Date date={date} />
          <TagCard tag={tags[0]} />
          <ActivityStatus active={active} />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default EventItem;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: 'black',
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    gap: 5,
  },
  detailsContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
