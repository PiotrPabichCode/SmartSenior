import { View, Text } from 'react-native';
import React from 'react';
import { useAppSelector } from '@src/redux/types';
import { selectTags } from '@src/redux/auth/auth.slice';
import { Button } from '@rneui/themed';
import { navigate } from '@src/navigation/navigationUtils';

const AccountTags = () => {
  const tags = useAppSelector(state => selectTags(state));

  if (!tags || !tags.length) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <Text style={{ fontSize: 22, textAlign: 'center' }}>You don't have any assigned tags.</Text>
        <Text
          style={{
            fontSize: 17,
            textAlign: 'center',
            marginVertical: 10,
            maxWidth: '90%',
            letterSpacing: 0.5,
          }}>
          Tags allow you to categorize and organize your profile information. They help in
          highlighting specific interests, skills, or characteristics. Add a tag to enhance your
          profile!
        </Text>
        <Button
          title="Add a new tag"
          color={'green'}
          onPress={() => navigate('AddTag')}
          titleStyle={{ fontSize: 20 }}
          buttonStyle={{ minWidth: '100%' }}
          containerStyle={{ margin: 20, borderRadius: 25 }}
        />
      </View>
    );
  }

  return (
    <View>
      <Button
        title="Dodaj nowy znacznik"
        color={'green'}
        onPress={() => navigate('AddTag')}
        buttonStyle={{ minWidth: '100%' }}
        containerStyle={{ margin: 20, borderRadius: 25 }}
      />
    </View>
  );
};

export default AccountTags;
