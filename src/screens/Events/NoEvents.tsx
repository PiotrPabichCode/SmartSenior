import { View, Text } from 'react-native';
import React from 'react';
import { t } from '@src/localization/Localization';

const NoEvents = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 50 }}>
        {t('eventsScreen.noActiveEvents')}
      </Text>
    </View>
  );
};

export default NoEvents;
