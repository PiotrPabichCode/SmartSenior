import { Text } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { Timestamp } from 'firebase/firestore';
import { StyleSheet } from 'react-native';

type TitleProps = {
  completed?: boolean;
  title: string;
  date: Timestamp;
};

const Title = ({ completed, title, date }: TitleProps) => {
  let label = t('eventGroups.upcomingEvent', {
    title: title,
  });
  if (completed) {
    label = t('eventGroups.completedEvent', {
      title: title,
    });
  } else if (date.toMillis() < Timestamp.now().toMillis()) {
    label = t('eventGroups.delayedEvent', {
      title: title,
    });
  }
  return <Text style={styles.label}>{label}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
