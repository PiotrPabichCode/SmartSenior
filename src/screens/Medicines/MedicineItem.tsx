import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { renderIcon } from '../../custom/Icons';
import { Button } from '@rneui/themed';

import type { PropsWithChildren } from 'react';

type MedicineItemProps = PropsWithChildren<{
  name: string;
  price: string;
  onPress?: () => void;
}>;

const MedicineItem = ({ name, price, onPress }: MedicineItemProps) => {
  return (
    <View style={styles.viewStyle}>
      {renderIcon('pills')}
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <Button
        title='Zobacz więcej'
        onPress={onPress}
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
        }}
        containerStyle={{
          width: 100,
        }}
        titleStyle={{
          fontSize: 10,
          fontWeight: '400',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 60,
    padding: 5,
  },
  name: {
    width: 150,
  },
});

export default MedicineItem;
