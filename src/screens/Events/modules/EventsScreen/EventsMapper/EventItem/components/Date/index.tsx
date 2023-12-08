import { t } from '@src/localization/Localization';
import { convertTimestampToDate } from '@src/utils/utils';
import { Timestamp } from 'firebase/firestore';
import { View, Text } from 'react-native';

type Props = {
  date: Timestamp;
};

const Date = ({ date }: Props) => {
  return (
    <View style={{ flex: 2, alignItems: 'center' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{t('eventGroups.date')}</Text>
      <Text>{convertTimestampToDate(date, 'DD-MM-YYYY HH:mm')}</Text>
    </View>
  );
};

export default Date;
