import { Text } from '@rneui/themed';
import { t } from '@src/localization/Localization';

type Props = {
  type: 'delayed' | 'completed' | 'upcoming';
};

const Title = ({ type }: Props) => {
  const renderTitle = () => {
    if (type === 'delayed') {
      return t('eventGroups.delayedEventsTitle');
    } else if (type === 'completed') {
      return t('eventGroups.completedEventsTitle');
    } else {
      return t('eventGroups.upcomingEventsTitle');
    }
  };

  return (
    <Text
      h4
      numberOfLines={1}
      adjustsFontSizeToFit
      h4Style={{ marginVertical: 5, alignSelf: 'center' }}>
      {renderTitle()}
    </Text>
  );
};

export default Title;
