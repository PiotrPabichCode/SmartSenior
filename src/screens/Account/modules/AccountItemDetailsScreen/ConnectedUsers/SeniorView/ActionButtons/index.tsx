import { CustomButton, CustomToast, Icons } from '@src/components';
import { t } from '@src/localization/Localization';
import { User } from '@src/models';
import { navigate } from '@src/navigation/navigationUtils';
import { View, Linking, StyleSheet } from 'react-native';

type Props = {
  keeper: User;
};

const ActionButtons = ({ keeper }: Props) => {
  const mainColor = '#FFFAF0';
  return (
    <View style={styles.container}>
      <CustomButton
        onPress={() => {
          if (!keeper.phoneNumber) {
            return CustomToast('error', t('message.error.keeperNoPhone'));
          }
          Linking.openURL(`tel:${keeper.phoneNumber}`);
        }}
        title={t('connectedUsers.callKeeper')}
        titleStyle={styles.buttonTitle}
        color={mainColor}
        style={styles.button}
        backgroundColor={'green'}
        icon={<Icons name="phone" color={mainColor} size={24} />}
      />
      <CustomButton
        onPress={() => navigate('Chat')}
        title={t('connectedUsers.messageKeeper')}
        titleStyle={styles.buttonTitle}
        color={mainColor}
        style={styles.button}
        backgroundColor={'black'}
        icon={<Icons name="chat" color={mainColor} size={24} />}
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
    gap: 20,
  },
});
