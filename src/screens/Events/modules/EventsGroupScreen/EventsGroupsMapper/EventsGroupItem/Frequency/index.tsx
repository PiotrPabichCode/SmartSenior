import { Frequency as FrequencyModel } from '@src/models';
import FrequencyDates from './FrequencyDates';
import Recurrence from './Recurrence';
import { StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';

type Props = {
  frequency: FrequencyModel;
};

const Frequency = ({ frequency }: Props) => {
  return (
    frequency && (
      <>
        <View style={styles.container}>
          <Text style={styles.label}>
            <Recurrence
              daysOfWeek={frequency.daysOfWeek}
              interval={frequency.interval}
              type={frequency.type}
              unit={frequency.unit}
            />
          </Text>
        </View>
        <FrequencyDates startDate={frequency.startDate} endDate={frequency.endDate} />
      </>
    )
  );
};

export default Frequency;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
