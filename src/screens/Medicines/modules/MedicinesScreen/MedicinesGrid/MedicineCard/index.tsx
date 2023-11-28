import { View, Text } from 'react-native';
import { useStyles } from './styles';
import { MedicineCardProps } from './types';
import Icons, { renderIcon } from '@src/components/Icons';
import { Button } from '@rneui/themed';
import { t } from '@src/localization/Localization';

const MedicineCard = ({ added, name, onPressFavourite, onPress }: MedicineCardProps) => {
  const styles = useStyles();
  return (
    <View style={styles.viewStyle}>
      {renderIcon({ name: 'pills', size: 24 })}
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

export default MedicineCard;
