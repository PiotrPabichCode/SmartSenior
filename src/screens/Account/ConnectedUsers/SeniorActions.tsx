import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import React from 'react';
import { ConnectedUser } from '@src/models';
import { convertTimestampToDate } from '@src/utils/utils';
import { t } from '@src/localization/Localization';

const SeniorActions = ({ user }: { user: ConnectedUser }) => {
  const events = user.events;

  const mapEvents = events.map((event, index) => {
    return (
      <View key={index}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            marginVertical: 10,
          }}>
          <Text style={{ fontSize: 18 }}>{event.title}</Text>
          <Text style={{ fontSize: 18 }}>
            {convertTimestampToDate(event.date!, 'DD-MM-YYYY HH:mm')}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button
            color={'green'}
            onPress={() => console.log('wykonaj zadanie')}
            title={t('seniorDashboard.execute')}
          />
          <Button
            color={'orange'}
            onPress={() => console.log('przypomnij')}
            title={t('seniorDashboard.remind')}
          />
          <Button
            color={'red'}
            onPress={() => console.log('usuń zadanie')}
            title={t('seniorDashboard.delete')}
          />
        </View>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.actionContainer}
        onPress={() => console.log('user localization')}>
        <Text style={styles.actionText} numberOfLines={1}>
          {t('seniorDashboard.localization')}
        </Text>
      </TouchableOpacity>
      {events.length > 0 && (
        <View style={styles.actionContainer}>
          <Text style={styles.actionText}>{t('seniorDashboard.upcomingEvents')}</Text>
          {mapEvents}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  actionContainer: {
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1,
    padding: 20,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default SeniorActions;
