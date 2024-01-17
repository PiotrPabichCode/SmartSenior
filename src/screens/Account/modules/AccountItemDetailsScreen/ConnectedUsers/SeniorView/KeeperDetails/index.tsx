import { Text, useTheme } from '@rneui/themed';
import { CustomButton, Icons } from '@src/components';
import useThemeColors from '@src/config/useThemeColors';
import { t } from '@src/localization/Localization';
import { User } from '@src/models';
import { View, StyleSheet } from 'react-native';

type Props = {
  keeper: User;
};

const KeeperDetails = ({ keeper }: Props) => {
  const theme = useTheme().theme;
  const styles = useStyles();
  return (
    <View style={styles.details}>
      <Text style={styles.title}>{t('connectedUsers.seniorTitle')}</Text>
      <View style={styles.detailsButtons}>
        <CustomButton
          title={keeper.firstName + ' ' + keeper.lastName}
          titleStyle={styles.buttonTitle}
          style={styles.button}
          color={theme.colors.black}
          icon={<Icons name="user" color={theme.colors.black} size={24} />}
        />
        <CustomButton
          title={'' + keeper.email}
          titleStyle={styles.buttonTitle}
          style={styles.button}
          color={theme.colors.black}
          icon={<Icons name="email" color={theme.colors.black} size={24} />}
        />
        <CustomButton
          title={'' + keeper.phoneNumber}
          titleStyle={styles.buttonTitle}
          style={styles.button}
          color={theme.colors.black}
          icon={<Icons name="phone" color={theme.colors.black} size={24} />}
        />
      </View>
    </View>
  );
};

export default KeeperDetails;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    details: {
      flex: 1,
      marginVertical: 10,
      width: '100%',
      alignItems: 'center',
      borderRadius: 25,
      padding: 10,
    },
    detailsButtons: {
      gap: 25,
      width: '100%',
      flexGrow: 1,
      justifyContent: 'center',
    },
    title: {
      marginTop: 10,
      fontSize: 30,
      fontWeight: '700',
    },
    buttonTitle: {
      fontSize: 16,
    },
    button: {
      gap: 20,
    },
  });
