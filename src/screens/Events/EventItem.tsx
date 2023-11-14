import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Switch } from '@rneui/themed';

import type { PropsWithChildren } from 'react';
import { convertTimestampToDate, renderDayValue } from '@src/utils/utils';
import { navigate } from '@src/navigation/navigationUtils';
import CustomToast from '@src/components/CustomToast';
import { t } from '@src/localization/Localization';
import { updateEvent } from '@src/redux/events/events.actions';
import { Event } from '@src/models';
import { useAppDispatch, useAppSelector } from '@src/redux/types';
import { selectEventByKey } from '@src/redux/events/events.slice';

type DayProps = PropsWithChildren<{
  active: boolean;
  shortTitle: string;
  title: string;
  value: number;
}>;

const EventItem = ({ eventKey }: { eventKey: string }) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const event = useAppSelector(state => selectEventByKey(state, eventKey));

  if (!event) {
    return null;
  }

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  function generateDayTags(event: Event) {
    return Object.values(event.days).map((day: DayProps, index: number) => {
      return (
        <Text style={day.active ? styles.activeDay : styles.inactiveDay} key={index}>
          {renderDayValue(day.value, true)}
        </Text>
      );
    });
  }

  const onEventActivation = async (active: boolean) => {
    try {
      await dispatch(
        updateEvent({
          eventKey: eventKey,
          data: {
            active: !active,
          },
        }),
      ).unwrap();
      CustomToast(
        'success',
        active ? 'Wydarzenie zostało wyłączone' : 'Wydarzenie zostało włączone',
      );
    } catch (error) {
      console.log(error);
      CustomToast(
        'error',
        active ? 'Nie udało się wyłączyć wydarzenia' : 'Nie udało się włączyć wydarzenia',
      );
    }
  };

  const handleActivationEvent = async () => {
    Alert.alert(
      event.active ? 'Wyłączenie wydarzenia' : 'Włączenie wydarzenia',
      event.active ? 'Czy chcesz wyłączyć wydarzenie?' : 'Czy chcesz włączyć wydarzenie?',
      [
        {
          text: t('eventItem.alert.no'),
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: t('eventItem.alert.yes'),
          style: 'destructive',
          onPress: async () => await onEventActivation(event.active),
        },
      ],
    );
  };

  return (
    <>
      <View style={styles.divider} />
      <TouchableOpacity
        style={styles.viewStyle}
        onPress={() =>
          navigate('EventItem', {
            eventKey: eventKey,
          })
        }>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.viewDetails}>
          <Text style={styles.time} numberOfLines={1}>
            {convertTimestampToDate(event.date!, 'DD-MM-YYYY HH:mm')}
          </Text>
          <View style={styles.viewRightPanel}>
            <Text style={styles.days}>{generateDayTags(event)}</Text>
            <Switch value={event.active} onValueChange={handleActivationEvent} />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
  },
  inlineFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 18,
    fontWeight: '400',
    width: 190,
    alignSelf: 'center',
  },
  viewRightPanel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  days: {
    fontSize: 18,
    fontWeight: '500',
  },
  activeDay: {
    color: 'blue',
  },
  inactiveDay: {
    color: 'red',
  },
  viewDetails: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default EventItem;
