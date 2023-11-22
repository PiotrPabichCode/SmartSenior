import { View, TouchableOpacity, Alert } from 'react-native';
import { Switch, Text } from '@rneui/themed';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { selectEventsGroupByKey } from '@src/redux/events/events.slice';
import { goBack, navigate } from '@src/navigation/navigationUtils';
import { convertTimestampToDate, renderDayValue } from '@src/utils/utils';
import { t } from '@src/localization/Localization';
import { recurringTimes } from '@src/redux/events/events.constants';
import { StyleSheet } from 'react-native';
import { updateEventsGroup } from '@src/redux/events/events.actions';

type Props = {
  groupKey: string;
};

const EventsGroupItem = ({ groupKey }: Props) => {
  const dispatch = useAppDispatch();
  const eventsGroup = useAppSelector(state => selectEventsGroupByKey(state, groupKey));

  if (!eventsGroup) {
    goBack();
    return null;
  }

  const renderRecurring = () => {
    if (eventsGroup.frequency.type === 'specificDays' && eventsGroup.frequency.daysOfWeek) {
      const days = [1, 2, 3, 4, 5, 6, 0];
      const selectedDays = eventsGroup.frequency.daysOfWeek;
      return days.map((day, index) => {
        return (
          <Text
            key={index}
            style={[selectedDays.find(d => d === day) ? styles.activeDay : styles.inactiveDay]}>
            {renderDayValue(day, true)}
          </Text>
        );
      });
    }
    const label = recurringTimes.find(
      r => r.value === eventsGroup.frequency.interval && r.unit === eventsGroup.frequency.unit,
    )?.label!;
    return t('eventGroups.recurring', {
      label: t(label),
    });
  };

  const switchEventsGroup = async () => {
    Alert.alert(t('eventGroups.switchAlertTitle'), t('eventGroups.switchAlertQuestion'), [
      {
        text: t('eventItem.alert.no'),
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: t('eventItem.alert.yes'),
        style: 'destructive',
        onPress: async () => {
          await dispatch(
            updateEventsGroup({
              key: groupKey,
              data: {
                active: !eventsGroup.active,
              },
            }),
          );
        },
      },
    ]);
  };

  return (
    <>
      <View style={{ width: '100%', height: 1, backgroundColor: 'black' }} />
      <TouchableOpacity
        style={{
          minWidth: '100%',
          alignItems: 'center',
        }}
        onPress={() =>
          navigate('EventsGroup', {
            groupKey: groupKey,
          })
        }>
        <Text h2 numberOfLines={1} adjustsFontSizeToFit>
          {eventsGroup.title}
        </Text>
        <View
          style={{
            alignItems: 'center',
            minWidth: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{t('eventGroups.create')}</Text>
              <Text style={{ flex: 2, fontWeight: '500', fontSize: 15 }}>
                {convertTimestampToDate(eventsGroup.createdAt, 'DD-MM-YYYY HH:mm')}
              </Text>
            </View>

            <View style={{ alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{t('eventGroups.update')}</Text>
              <Text style={{ flex: 2, fontWeight: '500', fontSize: 15 }}>
                {convertTimestampToDate(eventsGroup.updatedAt, 'DD-MM-YYYY HH:mm')}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              {t('eventGroups.recurringSpecificDays')}
              {renderRecurring()}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
            <Text style={{ fontSize: 16 }}>{t('eventGroups.switchEvent')}</Text>
            <Switch value={eventsGroup.active} onChange={switchEventsGroup} />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  activeDay: {
    color: 'blue',
  },
  inactiveDay: {
    color: 'red',
  },
});

export default EventsGroupItem;
