import { View, StyleSheet } from 'react-native';
import Icons from '@src/components/Icons';
import { Text } from '@rneui/themed';
import { Button } from '../shared';

import { t } from '@src/localization/Localization';
import useThemeColors from '@src/config/useThemeColors';

type Props = {
  name: string;
  added: boolean;
  onPress?: () => void;
  onPressFavourite: () => void;
};

const PharmacyCard = ({ name, added, onPress, onPressFavourite }: Props) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Icons name="pharmacy" size={24} />
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
      <Button
        title={t('button.more')}
        titleStyle={styles.buttonTitle}
        containerStyle={styles.buttonContainer}
        onPress={onPress}
        buttonStyle={styles.button}
      />
      <Icons name={added ? 'heart' : 'heart-outline'} size={24} onPress={onPressFavourite} />
    </View>
  );
};

export default PharmacyCard;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      gap: 10,
      width: '100%',
      padding: 5,
    },
    buttonContainer: {
      alignSelf: 'center',
    },
    name: {
      flex: 1,
      color: theme.text,
    },
    buttonTitle: {
      fontSize: 10,
    },
    button: {
      backgroundColor: 'rgba(78, 116, 289, 1)',
    },
  });
