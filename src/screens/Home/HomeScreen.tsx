import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CustomButton from 'src/components/CustomButton';
import UpcomingEvents from '@src/screens/Home/UpcomingEvents';
import CustomActivityIndicator from '@components/CustomActivityIndicator';
import { useAppSelector } from '@redux/store';
import { navigate } from '@src/navigation/navigationUtils';
import { EventDetails } from '@src/redux/types/eventsTypes';
import { filterUpcomingEvents } from '@src/redux/api/eventsAPI';
import { translate } from '@src/localization/Localization';
import { UserDetails } from '@src/redux/types/authTypes';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import Colors from '@src/constants/Colors';
import HomeButtons from './HomeButtons';

const HomeScreen = () => {
  let events: EventDetails[] = useAppSelector(state => state.events.events);
  const userDetails: UserDetails = useAppSelector(state => state.auth.userDetails);

  if (!userDetails) {
    return <CustomActivityIndicator />;
  }

  return (
    <View style={styles.view}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Text style={styles.welcomeText}>
            {translate('homeScreen.welcome', {
              name: userDetails.firstName,
            })}
          </Text>
          <UpcomingEvents events={events} />
          <HomeButtons />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 25,
    margin: 10,
    padding: 10,
    gap: 15,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default HomeScreen;
