import { CustomToast, Icons } from '@src/components';
import { Button } from '@src/components/shared';
import useThemeColors from '@src/config/useThemeColors';
import { t } from '@src/localization/Localization';
import { User } from '@src/models';
import { navigate } from '@src/navigation/navigationUtils';
import { View, Linking, StyleSheet } from 'react-native';

type Props = {
  keeper: User;
};

const ActionButtons = ({ keeper }: Props) => {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          if (!keeper.phoneNumber) {
            return CustomToast('error', t('message.error.keeperNoPhone'));
          }
          Linking.openURL(`tel:${keeper.phoneNumber}`);
        }}
        title={t('connectedUsers.callKeeper')}
        titleStyle={styles.buttonTitle}
        buttonStyle={styles.button}
        color={'green'}
        icon={<Icons name="phone" size={24} />}
      />

      <Button
        onPress={() => navigate('Chat')}
        title={t('connectedUsers.messageKeeper')}
        titleStyle={styles.buttonTitle}
        buttonStyle={styles.button}
        color={useThemeColors().lightblue}
        icon={<Icons name="chat" size={24} />}
      />
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  buttonTitle: {
    fontSize: 18,
  },
  button: {
    padding: 15,
  },
});
