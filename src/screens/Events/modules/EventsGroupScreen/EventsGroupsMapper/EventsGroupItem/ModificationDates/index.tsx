import { Text } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { convertTimestampToDate } from '@src/utils/utils';
import { Timestamp } from 'firebase/firestore';
import { View, StyleSheet } from 'react-native';

type Props = {
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

const ModificationDates = ({ createdAt, updatedAt }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.label}>{t('eventGroups.create')}</Text>
        <Text style={styles.date}>{convertTimestampToDate(createdAt, 'DD-MM-YYYY HH:mm')}</Text>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.label}>{t('eventGroups.update')}</Text>
        <Text style={styles.date}>{convertTimestampToDate(updatedAt, 'DD-MM-YYYY HH:mm')}</Text>
      </View>
    </View>
  );
};

export default ModificationDates;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  dateContainer: {
    alignItems: 'center',
    flex: 1,
  },
  label: { fontSize: 15, fontWeight: 'bold' },
  date: {
    flex: 2,
    fontWeight: '500',
    fontSize: 15,
  },
});
