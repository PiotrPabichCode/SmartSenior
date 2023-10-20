import { StyleSheet, View, Text } from 'react-native';
import Icons from '@src/components/Icons';
import { Button } from '@rneui/themed';

import type { PropsWithChildren } from 'react';
import { translate } from '@src/localization/Localization';

type PharmacyItemProps = PropsWithChildren<{
  name: string;
  onPress?: () => void;
}>;

const PharmacyItem = ({ name, onPress }: PharmacyItemProps) => {
  return (
    <View style={styles.viewStyle}>
      <Icons name="pills-home-page" />
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <Button
        title={translate('button.more')}
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

export default PharmacyItem;
