import { StyleSheet, View, Text } from 'react-native';
import Icons, { renderIcon } from '@src/components/Icons';
import { Button } from '@rneui/themed';

import type { PropsWithChildren } from 'react';
import { t } from '@src/localization/Localization';

type PharmacyItemProps = PropsWithChildren<{
  name: string;
  added: boolean;
  onPress?: () => void;
  onPressFavourite: () => void;
}>;

const PharmacyItem = ({ name, added, onPress, onPressFavourite }: PharmacyItemProps) => {
  return (
    <View style={styles.viewStyle}>
      {renderIcon({ name: 'pharmacy', size: 24 })}
      <Text style={styles.name} numberOfLines={2} adjustsFontSizeToFit={true}>
        {name}
      </Text>
      <Button
        title={t('button.more')}
        onPress={onPress}
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 25,
        }}
        titleStyle={{
          fontSize: 10,
        }}
      />
      <Icons name={added ? 'heart' : 'heart-outline'} size={20} onPress={onPressFavourite} />
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
