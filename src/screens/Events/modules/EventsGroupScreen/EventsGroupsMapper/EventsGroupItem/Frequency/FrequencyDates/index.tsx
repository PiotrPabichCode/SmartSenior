import { Text } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { convertTimestampToDate } from '@src/utils/utils';
import { Timestamp } from 'firebase/firestore';
import { StyleSheet } from 'react-native';

type Props = {
  startDate: Timestamp | null;
  endDate: Timestamp | null;
};

const FrequencyDates = ({ startDate, endDate }: Props) => {
  return (
    startDate &&
    endDate && (
      <Text style={styles.label}>
        {t('eventGroups.frequencyDates', {
          startDate: convertTimestampToDate(startDate, 'DD-MM-YYYY'),
          endDate: convertTimestampToDate(endDate, 'DD-MM-YYYY'),
        })}
      </Text>
    )
  );
};

export default FrequencyDates;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
