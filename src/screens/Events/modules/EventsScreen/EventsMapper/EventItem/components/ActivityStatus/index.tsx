import { Text } from '@rneui/themed';
import Icons from '@src/components/Icons';
import { t } from '@src/localization/Localization';
import { View, StyleSheet } from 'react-native';

type Props = {
  active: boolean;
};

const ActivityStatus = ({ active }: Props) => {
  return (
    <View style={styles.container}>
      {active ? (
        <>
          <Icons name={'active-tick'} />
          <Text style={styles.active}>{t('eventGroups.active')}</Text>
        </>
      ) : (
        <>
          <Icons name={'active-untick'} />
          <Text style={styles.inactive}>{t('eventGroups.inactive')}</Text>
        </>
      )}
    </View>
  );
};

export default ActivityStatus;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  active: {
    fontWeight: '700',
    color: 'green',
  },
  inactive: {
    fontWeight: '700',
    color: 'red',
  },
});
