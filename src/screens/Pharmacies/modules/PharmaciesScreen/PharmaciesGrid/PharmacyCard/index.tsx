import { View, Text } from 'react-native';
import Icons, { renderIcon } from '@src/components/Icons';
import { Button } from '@rneui/themed';

import { t } from '@src/localization/Localization';
import { useStyles } from './styles';
import { PharmacyItemProps } from './types';

const PharmacyCard = ({ name, added, onPress, onPressFavourite }: PharmacyItemProps) => {
  const styles = useStyles();
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
