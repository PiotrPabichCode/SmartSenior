import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CustomButton from 'src/components/CustomButton';
import UpcomingEvents from '@src/screens/Home/UpcomingEvents';
import CustomActivityIndicator from '@components/CustomActivityIndicator';
import { useAppSelector } from '@redux/store';
import { navigate } from '@src/navigation/navigationUtils';

const HomeScreen = () => {
  const events = useAppSelector((state) => state.events.events);
  const userDetails = useAppSelector((state) => state.auth.userDetails);

  if (!userDetails) {
    return <CustomActivityIndicator />;
  }

  return (
    <View style={styles.view}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Text
            style={styles.welcomeText}>{`Hej ${userDetails.firstName}!`}</Text>
          <UpcomingEvents events={events} />
          <View style={styles.buttonContainer}>
            <CustomButton
              onPress={() => navigate('Medicines')}
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
              onPress={() => navigate('Pharmacies')}
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
