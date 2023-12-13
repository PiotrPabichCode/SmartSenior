import { Text } from '@rneui/themed';
import { t } from '@src/localization/Localization';

type Props = {
  type: 'delayed' | 'completed' | 'upcoming';
};

const Title = ({ type }: Props) => {
  let label = t('eventGroups.upcomingEventsTitle');
  if (type === 'delayed') {
    label = t('eventGroups.delayedEventsTitle');
  } else if (type === 'completed') {
    label = t('eventGroups.completedEventsTitle');
  }

  return (
    <Text
      h4
      numberOfLines={1}
      adjustsFontSizeToFit
      h4Style={{ marginVertical: 5, alignSelf: 'center' }}>
      {label}
    </Text>
  );
};

export default Title;
