import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import UpcomingEvents from '../components/UpcomingEvents';
import { HomeProps } from '../navigation/types';
import SpeedDialMenu from '../navigation/SpeedDialMenu';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import { useLayoutEffect, useState } from 'react';
import { EventProp } from './EventsScreen';
import { loadUserActiveEvents } from '../firebase/queries';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { logoutAction } from '../redux/actions';

const HomeScreen = ({ navigation }: HomeProps) => {
  const [events, setEvents] = useState<EventProp[]>([]);
  const userData = useAppSelector((state) => state.auth.userData);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData: any = await loadUserActiveEvents();
        setEvents(eventsData);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return <CustomActivityIndicator />;
  }

  return (
    <View style={styles.view}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Text style={styles.welcomeText}>{`Hej ${userData.firstName}!`}</Text>
          <UpcomingEvents events={events} />
          <View style={styles.buttonContainer}>
            <CustomButton
              onPress={() => navigation.navigate('Medicines')}
              title='Lista leków'
              backgroundColor={'#FB6D6C'}
              icon={'pills'}
            />
            <CustomButton
              title='Lista lekarzy'
              backgroundColor={'#fb8500'}
              icon={'doctor'}
            />
            <CustomButton
              onPress={() => navigation.navigate('Pharmacies')}
              title='Lista aptek'
              backgroundColor={'#9564FE'}
              icon={'pharmacy'}
            />
            <CustomButton
              title='Twoje notatki'
              backgroundColor={'#469323'}
              icon={'notes'}
            />
          </View>
        </View>
      </ScrollView>
      <SpeedDialMenu navigation={navigation} />
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
    backgroundColor: 'white',
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
  buttonContainer: {
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;
