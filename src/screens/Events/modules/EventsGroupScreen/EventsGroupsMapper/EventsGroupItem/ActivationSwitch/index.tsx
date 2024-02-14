import { Switch, Text } from '@rneui/themed';
import { t } from '@src/localization/Localization';
import { EventGroup } from '@src/models';
import { View, StyleSheet } from 'react-native';
import { switchEventsGroup } from '../utils';

type ActivationSwitchProps = {
  active: boolean;
  eventsGroup: EventGroup;
  groupKey: string;
};

const ActivationSwitch = ({ active, eventsGroup, groupKey }: ActivationSwitchProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('eventGroups.switchEvent')}</Text>
      <Switch value={active} onTouchStart={() => switchEventsGroup(eventsGroup, groupKey)} />
    </View>
  );
};

export default ActivationSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  label: {
    fontSize: 16,
  },
});
