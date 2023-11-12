import { View, Text } from 'react-native';
import React from 'react';
import { t } from '@src/localization/Localization';

const EmptyChat = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ textAlign: 'center', fontSize: 24 }}>{t('chat.noActiveChats')}</Text>
    </View>
  );
};

export default EmptyChat;
