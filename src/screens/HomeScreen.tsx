import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import UpcomingEvents from '../components/UpcomingEvents';
import { HomeProps } from '../navigation/types';
import SpeedDialMenu from '../navigation/SpeedDialMenu';

const HomeScreen = ({ navigation }: HomeProps) => {
  return (
    <View style={styles.view}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <Text style={styles.welcomeText}>Hej Piotr!</Text>
        <UpcomingEvents />
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
      </ScrollView>
      <SpeedDialMenu navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
  },
  scrollView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 48,
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
