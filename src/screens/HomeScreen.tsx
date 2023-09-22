import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import UpcomingEvents from '../components/UpcomingEvents';
import Icons from '../custom/Icons';
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
            icon={<Icons name='pills-home-page' />}
          />
          <CustomButton
            title='Lista lekarzy'
            backgroundColor={'#9564FE'}
            icon={<Icons name='doctor-home-page' />}
          />
          <CustomButton
            onPress={() => navigation.navigate('Pharmacies')}
            title='Lista aptek'
            backgroundColor={'#9564FE'}
            icon={<Icons name='pharmacy-home-page' />}
          />
          <CustomButton
            title='Twoje notatki'
            backgroundColor={'#469323'}
            icon={<Icons name='notes-home-page' />}
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
    height: '100%',
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
