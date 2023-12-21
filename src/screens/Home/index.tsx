import { StyleSheet } from 'react-native';
import { t } from '@src/localization/Localization';
import HomeButtons from './HomeButtons';
import { CustomScrollContainer, CustomActivityIndicator } from '@src/components';
import { useAppSelector } from '@src/redux/types';
import { selectUser } from '@src/redux/auth/auth.slice';
import UpcomingEvents from './UpcomingEvents';
import useThemeColors from '@src/config/useThemeColors';
import { Text } from '@rneui/themed';

const HomeScreen = () => {
  const user = useAppSelector(state => selectUser(state));
  const styles = useStyles();

  if (!user) {
    return <CustomActivityIndicator />;
  }

  return (
    <CustomScrollContainer>
      <Text style={styles.welcomeText}>
        {t('homeScreen.welcome', {
          name: user.firstName,
        })}
      </Text>
      <UpcomingEvents />
      <HomeButtons />
    </CustomScrollContainer>
  );
};

export default HomeScreen;

const useStyles = (theme = useThemeColors()) =>
  StyleSheet.create({
    welcomeText: {
      fontSize: 36,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
  });
