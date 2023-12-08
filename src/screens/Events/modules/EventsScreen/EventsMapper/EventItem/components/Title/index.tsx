import { Text } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { Timestamp } from 'firebase/firestore';

type Props = {
  completed?: boolean;
  title: string;
  date: Timestamp;
};

const Title = ({ completed, title, date }: Props) => {
  const renderLabel = () => {
    if (completed) {
      return t('eventGroups.completedEvent', {
        title: title,
      });
    }
    if (date.toMillis() < Timestamp.now().toMillis()) {
      return t('eventGroups.delayedEvent', {
        title: title,
      });
    }
    if (!completed) {
      return t('eventGroups.upcomingEvent', {
        title: title,
      });
    }
  };
  return <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{renderLabel()}</Text>;
};

export default Title;
