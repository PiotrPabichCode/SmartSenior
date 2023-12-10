import { View, Text, StyleSheet } from 'react-native';
import Icons, { renderIcon } from '@src/components/Icons';
import { Button } from '@rneui/themed';

import { t } from '@src/localization/Localization';
import { PharmacyItemProps } from './types';

const PharmacyCard = ({ name, added, onPress, onPressFavourite }: PharmacyItemProps) => {
  return (
    <View style={styles.view}>
      {renderIcon({ name: 'pharmacy', size: 24 })}
      <Text style={styles.name} numberOfLines={2} adjustsFontSizeToFit={true}>
        {name}
      </Text>
      <Button
        title={t('button.more')}
        onPress={onPress}
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
      />
      <Icons name={added ? 'heart' : 'heart-outline'} size={20} onPress={onPressFavourite} />
    </View>
  );
};

export default PharmacyCard;

const styles = StyleSheet.create({
  view: {
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
  button: {
    backgroundColor: 'rgba(78, 116, 289, 1)',
  },
  buttonTitle: {
    fontSize: 10,
  },
});
