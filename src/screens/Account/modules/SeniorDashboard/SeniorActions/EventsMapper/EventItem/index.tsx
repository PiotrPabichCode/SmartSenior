import { View, StyleSheet } from 'react-native';
import { handleCompleteEvent, handleDeleteEvent, sendEventNotificationReminder } from '../../utils';
import { Text } from '@rneui/themed';
import { Button } from '@src/components/shared';
import { convertTimestampToDate } from '@src/utils/utils';
import { UserEvent } from '../../types';
import { t } from '@src/localization/Localization';
import useThemeColors from '@src/config/useThemeColors';

type EventItemProps = {
  event: UserEvent;
  userID: string;
  onEvent: () => void;
  onLoad: (_: boolean) => void;
};

const EventItem = ({ event, userID, onEvent, onLoad }: EventItemProps) => {
  return (
    <>
      <View style={styles.eventContainer}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDate}>
          {convertTimestampToDate(event.date!, 'DD-MM-YYYY HH:mm')}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          color={'green'}
          buttonStyle={styles.buttonContainer}
          onPress={() =>
            handleCompleteEvent({
              groupKey: event.groupKey,
              title: event.title,
              date: event.date,
              onComplete: onEvent,
            })
          }
          title={t('seniorDashboard.execute')}
        />
        <Button
          buttonStyle={styles.buttonContainer}
          color={useThemeColors().lightblue}
          onPress={() => sendEventNotificationReminder(event, userID, onLoad)}
          title={t('seniorDashboard.remind')}
        />
        <Button
          color={'red'}
          buttonStyle={styles.buttonContainer}
          onPress={() =>
            handleDeleteEvent({
              groupKey: event.groupKey,
              title: event.title,
              date: event.date,
              onDelete: onEvent,
            })
          }
          title={t('seniorDashboard.delete')}
        />
      </View>
    </>
  );
};

export default EventItem;

const styles = StyleSheet.create({
  eventContainer: {
    alignItems: 'center',
    gap: 5,
    marginVertical: 10,
  },
  eventTitle: {
    fontSize: 18,
  },
  eventDate: {
    fontSize: 18,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    flex: 1,
  },
});
