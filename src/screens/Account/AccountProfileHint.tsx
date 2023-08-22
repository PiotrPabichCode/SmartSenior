import { Avatar } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const AccountProfileHint = () => {
  return (
    <View style={styles.viewStyle}>
      <Avatar
        size='large'
        rounded
        title='PP'
        containerStyle={{ backgroundColor: '#C0C0C0' }}
        titleStyle={{ color: 'black', fontWeight: '500' }}
      />
      <View style={styles.detailsView}>
        <Text style={styles.name} numberOfLines={1}>
          Piotr Pabich
        </Text>
        <Text style={styles.email} numberOfLines={1}>
          235944@edu.p.lodz.pl
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-evenly',
    margin: 20,
    padding: 20,
  },
  detailsView: {
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    maxWidth: 200,
  },
  email: {
    fontSize: 16,
    fontWeight: '400',
    maxWidth: 200,
  },
});

export default AccountProfileHint;
