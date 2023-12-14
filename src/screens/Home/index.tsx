import { StyleSheet, Text } from 'react-native';
import { t } from '@src/localization/Localization';
import Colors from '@src/constants/Colors';
import HomeButtons from './HomeButtons';
import { CustomScrollContainer, CustomActivityIndicator } from '@src/components';
import { useAppSelector } from '@src/redux/types';
import { selectUser } from '@src/redux/auth/auth.slice';
import UpcomingEvents from './UpcomingEvents';

const HomeScreen = () => {
  const user = useAppSelector(state => selectUser(state));

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

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.black,
  },
});
