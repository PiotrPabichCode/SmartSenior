import { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/Auth/WelcomeScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import AccountItemDetailsScreen from './src/screens/Account/AccountItemDetailsScreen';
import { CreateEventProps, RootStackParamList } from './src/navigation/types';
import BottomBar from './src/navigation/BottomBar';
import MedicinesScreen from './src/screens/Medicines/MedicinesScreen';
import MedicineItemDetails from './src/screens/Medicines/MedicineItemDetails';
import { useColorScheme } from 'react-native';
import { StatusBar, StyleSheet, ActivityIndicator, View } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import PharmaciesScreen from './src/screens/Pharmacies/PharmaciesScreen';
import PharmacyItemDetails from './src/screens/Pharmacies/PharmacyItemDetails';
import { SpeedDial } from '@rneui/themed';
import CreateEventScreen from './src/screens/Events/CreateEventScreen';
import SpeedDialMenu from './src/navigation/SpeedDialMenu';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [connecting, setConnecting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConnecting(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setConnecting(false);
    });
  });

  function InitialLayout() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='Welcome'
          component={WelcomeScreen}
          options={{ title: 'Strona powitalna' }}
        />
        <Stack.Screen
          name='SignIn'
          component={LoginScreen}
          options={{ title: 'Formularz logowania' }}
        />
        <Stack.Screen
          name='SignUp'
          component={RegisterScreen}
          options={{ title: 'Formularz rejestracji' }}
        />
      </Stack.Navigator>
    );
  }

  function InsideLayout() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='BottomBar'
          component={BottomBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='AccountItemDetails'
          component={AccountItemDetailsScreen}
          options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen
          name='Medicines'
          component={MedicinesScreen}
          options={{ title: 'Lista leków' }}
        />
        <Stack.Screen
          name='MedicinesItemDetails'
          component={MedicineItemDetails}
          options={{ title: 'Lista leków' }}
        />
        <Stack.Screen
          name='Pharmacies'
          component={PharmaciesScreen}
          options={{ title: 'Lista aptek' }}
        />
        <Stack.Screen
          name='PharmaciesItemDetails'
          component={PharmacyItemDetails}
          options={{ title: 'Lista aptek' }}
        />
      </Stack.Navigator>
    );
  }

  if (connecting) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <StatusBar
          animated={true}
          backgroundColor='transparent'
          barStyle={'dark-content'}
          translucent={true}
        />
        <Stack.Navigator initialRouteName={user ? 'BottomBar' : 'Welcome'}>
          {user ? (
            <Stack.Screen
              name='Inside'
              component={InsideLayout}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name='Initial'
              component={InitialLayout}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
        {/* <SpeedDialMenu navigation={navigation} route={undefined} /> */}
      </NavigationContainer>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
