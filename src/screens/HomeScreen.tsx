import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton';
import UpcomingEvents from '../components/UpcomingEvents';
import Icons from '../custom/Icons';
import { HomeProps } from '../navigation/types';

const HomeScreen = ({ navigation }: HomeProps) => {
  return (
    <ScrollView contentContainerStyle={styles.viewStyle}>
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
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFAFA',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
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
  speedDial: {
    position: 'absolute',
    right: 0,
  },
});

export default HomeScreen;
