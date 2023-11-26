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
import Icons from '@src/components/Icons';

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
      const out: any = [];
      days.map((day, index) => {
        if (index === 0) {
          out.push(
            <Text key={'recurring title'} style={{ fontSize: 16, fontWeight: 'bold' }}>
              {t('eventGroups.recurringSpecificDays')}
            </Text>,
          );
        }
        out.push(
          <Text
            key={index}
            style={[selectedDays.find(d => d === day) ? styles.activeDay : styles.inactiveDay]}>
            {renderDayValue(day, true)}
          </Text>,
        );
      });
      return out;
    }
    const label = recurringTimes.find(
      r => r.interval === eventsGroup.frequency.interval && r.unit === eventsGroup.frequency.unit,
    )?.label!;
    return t('eventGroups.recurringCustom', {
      label: t(label),
    });
  };

  const renderFrequencyDates = () => {
    if (eventsGroup.frequency.startDate && eventsGroup.frequency.endDate) {
      const startDate = convertTimestampToDate(eventsGroup.frequency.startDate, 'DD-MM-YYYY');
      const endDate = convertTimestampToDate(eventsGroup.frequency.endDate, 'DD-MM-YYYY');
      return (
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            marginTop: 10,
          }}>
          {t('eventGroups.frequencyDates', {
            startDate: startDate,
            endDate: endDate,
          })}
        </Text>
      );
    }
  };

  const switchEventsGroup = async () => {
    Alert.alert(
      eventsGroup.active
        ? t('eventGroups.switchDisableAlertTitle')
        : t('eventGroups.switchEnableAlertTitle'),
      eventsGroup.active
        ? t('eventGroups.switchDisableAlertQuestion')
        : t('eventGroups.switchEnableAlertQuestion'),
      [
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
      ],
    );
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
        <Icons
          name="settings"
          style={{ position: 'absolute', top: 12, right: 5 }}
          size={28}
          onPress={() =>
            navigate('EventsGroupDetails', {
              groupKey: groupKey,
            })
          }
        />
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
          {eventsGroup.frequency && (
            <>
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{renderRecurring()}</Text>
              </View>
              {renderFrequencyDates()}
            </>
          )}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
            <Text style={{ fontSize: 16 }}>{t('eventGroups.switchEvent')}</Text>
            <Switch value={eventsGroup.active} onTouchStart={switchEventsGroup} />
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
