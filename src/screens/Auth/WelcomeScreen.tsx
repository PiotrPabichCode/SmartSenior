import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { Button } from '@rneui/themed';
import WelcomeSvg from '@assets/welcome-image.svg';
import { navigate, navigationRef } from '@src/navigation/navigationUtils';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';

const WelcomeScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <CustomActivityIndicator />;
  }
  return (
    <SafeAreaView style={styles.viewStyle}>
      {/* Image at the top */}
      <Text style={styles.headerText}>SmartSenior</Text>
      <WelcomeSvg width={300} height={300} />

      {/* Text under the Image */}
      <Text style={styles.welcomeText}>
        Kontrola zdrowia nigdy nie była łatwiejsza!
      </Text>
      <Text style={styles.welcomeText2}>
        Dołącz teraz, w zaledwie 2 minuty!
      </Text>

      <View style={styles.buttonsStyle}>
        {/* Buttons at the bottom */}
        <Button
          title='Zacznij teraz'
          buttonStyle={styles.buttonSignUpStyle}
          containerStyle={styles.buttonContainerStyle}
          titleStyle={styles.buttonSignUpTitleStyle}
          onPress={() => console.log(navigationRef.current?.getCurrentRoute())}
        />
        <Button
          title='Zaloguj się'
          buttonStyle={styles.buttonSignInStyle}
          containerStyle={styles.buttonContainerStyle}
          titleStyle={styles.buttonSignInTitleStyle}
          onPress={() => navigate('SignIn')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    marginTop: 50,
    fontSize: 48,
    fontWeight: 'bold',
  },
  welcomeText: {
    marginTop: 10,
    fontSize: 32,
    fontWeight: '500',
    textAlign: 'center',
    color: 'black',
  },
  welcomeText2: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
  buttonsStyle: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  buttonContainerStyle: {
    margin: 10,
  },
  buttonSignUpStyle: {
    backgroundColor: 'rgba(39, 39, 39, 1)',
    borderRadius: 5,
  },
  buttonSignUpTitleStyle: {
    fontSize: 20,
    color: 'white',
  },
  buttonSignInStyle: {
    backgroundColor: 'blue',
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonSignInTitleStyle: {
    fontSize: 20,
    color: 'white',
  },
});

export default WelcomeScreen;
