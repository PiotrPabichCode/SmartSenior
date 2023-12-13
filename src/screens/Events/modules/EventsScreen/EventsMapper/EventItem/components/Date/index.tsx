import { t } from '@src/localization/Localization';
import { convertTimestampToDate } from '@src/utils/utils';
import { Timestamp } from 'firebase/firestore';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  date: Timestamp;
};

const Date = ({ date }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('eventGroups.date')}</Text>
      <Text>{convertTimestampToDate(date, 'DD-MM-YYYY HH:mm')}</Text>
    </View>
  );
};

export default Date;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
