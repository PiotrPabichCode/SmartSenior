import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Switch } from '@rneui/themed';

import type { PropsWithChildren } from 'react';
import { convertTimestampToDate, renderDayValue } from '@src/utils/utils';
import { goBack, navigate } from '@src/navigation/navigationUtils';
import Icons from '@src/components/Icons';
import CustomToast from '@src/components/CustomToast';
import { t } from '@src/localization/Localization';
import { deleteEvent } from '@src/redux/events/events.actions';
import { Event } from '@src/models';
import { useAppDispatch, useAppSelector } from '@src/redux/types';

type DayProps = PropsWithChildren<{
  active: boolean;
  shortTitle: string;
  title: string;
  value: number;
}>;

const EventItem = ({ eventKey }: { eventKey: string }) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  // @ts-ignore
  const event: Event = useAppSelector(state => state.events.events[eventKey]);

  if (!event) {
    goBack();
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

  const onEventDelete = async () => {
    try {
      await dispatch(deleteEvent(eventKey)).unwrap();
      CustomToast('success', t('eventItem.alert.success'));
    } catch (error) {
      console.log(error);
      CustomToast('success', t('eventItem.alert.error'));
    }
  };

  const handleDeleteEvent = () => {
    Alert.alert(t('eventItem.alert.title'), t('eventItem.alert.message'), [
      {
        text: t('eventItem.alert.no'),
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: t('eventItem.alert.yes'),
        style: 'destructive',
        onPress: onEventDelete,
      },
    ]);
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
        <Icons
          name="delete"
          style={{ position: 'absolute', right: 5, top: 5 }}
          onPress={handleDeleteEvent}
        />
        <View style={styles.viewDetails}>
          <Text style={styles.time} numberOfLines={1}>
            {convertTimestampToDate(event.date!, 'DD-MM-YYYY HH:mm')}
          </Text>
          <View style={styles.viewRightPanel}>
            <Text style={styles.days}>{generateDayTags(event)}</Text>
            <Switch value={event.active} onValueChange={value => setChecked(value)} />
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
