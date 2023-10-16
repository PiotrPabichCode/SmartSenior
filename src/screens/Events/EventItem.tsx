import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Switch } from '@rneui/themed';

import type { PropsWithChildren } from 'react';
import { renderLocalDateWithTime } from '@src/utils/utils';
import { navigate } from '@src/navigation/navigationUtils';
import Icons from '@src/components/Icons';
import { useAppDispatch, useAppSelector } from '@src/redux/store';
import {
  loadActiveEventsAction,
  updateEventAction,
} from '@src/redux/actions/eventsActions';
import CustomToast from '@src/components/CustomToast';
import { getAuth } from 'firebase/auth';
import { EventDetails } from '@src/redux/types/eventsTypes';
import { translate } from '@src/localization/Localization';

type EventItemProps = PropsWithChildren<{
  eventKey: string;
}>;

type DayProps = PropsWithChildren<{
  active: boolean;
  shortTitle: string;
  title: string;
  value: number;
}>;

const EventItem = ({ eventKey }: EventItemProps) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const event: EventDetails = useAppSelector(
    (state) => state.events.events[eventKey]
  );
  console.log(event);

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  function generateDayTags() {
    return Object.values(event.days).map((day: DayProps, index: number) => {
      return (
        <Text
          style={day.active ? styles.activeDay : styles.inactiveDay}
          key={index}>
          {day.shortTitle}
        </Text>
      );
    });
  }

  const handleDeleteEvent = () => {
    Alert.alert(
      translate('eventItem.alert.title'),
      translate('eventItem.alert.message'),
      [
        {
          text: translate('eventItem.alert.no'),
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: translate('eventItem.alert.yes'),
          style: 'destructive',
          onPress: () => {
            dispatch(
              updateEventAction(eventKey, {
                deleted: true,
                userUid: getAuth().currentUser?.uid + 'deleted-true',
              })
            );
            CustomToast('success', translate('eventItem.alert.success'));
            dispatch(loadActiveEventsAction());
          },
        },
      ]
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
        <Icons
          name='delete'
          style={{ position: 'absolute', right: 5, top: 5 }}
          onPress={handleDeleteEvent}
        />
        <View style={styles.viewDetails}>
          <Text style={styles.time} numberOfLines={1}>
            {renderLocalDateWithTime(event.executionTime)}
          </Text>
          <View style={styles.viewRightPanel}>
            <Text style={styles.days}>{generateDayTags()}</Text>
            <Switch
              value={event.active}
              onValueChange={(value) => setChecked(value)}
            />
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
