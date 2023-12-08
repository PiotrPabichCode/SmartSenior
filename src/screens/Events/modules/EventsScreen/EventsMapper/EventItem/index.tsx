import { View, TouchableOpacity } from 'react-native';
import { navigate } from '@src/navigation/navigationUtils';
import { useStyles } from './styles';
import { Title, Date, TagCard, ActivityStatus } from './components';
import { EventItemProps } from './utils';

const EventItem = ({ groupKey, title, date, tags, active, completed }: EventItemProps) => {
  const styles = useStyles();

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
