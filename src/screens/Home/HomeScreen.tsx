import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CustomButton from 'src/components/CustomButton';
import UpcomingEvents from '@src/screens/Home/UpcomingEvents';
import CustomActivityIndicator from '@components/CustomActivityIndicator';
import { useAppSelector } from '@redux/store';
import { navigate } from '@src/navigation/navigationUtils';
import { EventDetails } from '@src/redux/types/eventsTypes';
import { filterUpcomingEvents } from '@src/redux/api/eventsAPI';
import { t } from '@src/localization/Localization';
import { UserDetails } from '@src/redux/types/authTypes';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import Colors from '@src/constants/Colors';
import HomeButtons from './HomeButtons';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import { Theme } from '@src/redux/types';

const HomeScreen = () => {
  const events: EventDetails[] = useAppSelector(state => state.events.events);
  const userDetails: UserDetails = useAppSelector(state => state.auth.userDetails);
  const theme: Theme = useAppSelector(state => state.auth.theme);
  const currentTheme = Colors[theme];

  if (!userDetails) {
    return <CustomActivityIndicator />;
  }

  return (
    <CustomScrollContainer theme={currentTheme}>
      <Text style={styles.welcomeText}>
        {t('homeScreen.welcome', {
          name: userDetails.firstName,
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
