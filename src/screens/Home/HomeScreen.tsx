import { Text, StyleSheet } from 'react-native';
import UpcomingEvents from '@src/screens/Home/UpcomingEvents';
import CustomActivityIndicator from '@components/CustomActivityIndicator';
import { t } from '@src/localization/Localization';
import Colors from '@src/constants/Colors';
import HomeButtons from './HomeButtons';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { useAppSelector } from '@src/redux/types';
import { selectEvents } from '@src/redux/events/events.slice';
import { selectTheme, selectUser } from '@src/redux/auth/auth.slice';

const HomeScreen = () => {
  const events = useAppSelector(state => selectEvents(state));
  const user = useAppSelector(state => selectUser(state));
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];

  if (!user) {
    return <CustomActivityIndicator />;
  }

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Text style={styles.welcomeText}>
        {t('homeScreen.welcome', {
          name: user.firstName,
        })}
      </Text>
      <UpcomingEvents events={events} />
      <HomeButtons />
    </CustomScrollContainer>
  );
};

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.black,
  },
});

export default HomeScreen;
