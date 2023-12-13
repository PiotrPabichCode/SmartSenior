import { t } from '@src/localization/Localization';
import { EventGroup } from '@src/models';
import { store } from '@src/redux/common';
import { updateEventsGroup } from '@src/redux/events/events.actions';
import { Alert } from 'react-native';

export const switchEventsGroup = async (eventsGroup: EventGroup, groupKey: string) => {
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
          await store.dispatch(
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
