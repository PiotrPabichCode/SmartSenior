import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import WelcomeScreen from './src/screens/Auth/WelcomeScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import CustomSpeedDial from './src/components/CustomSpeedDial';
import AccountItemDetailsScreen from './src/screens/Account/AccountItemDetailsScreen';
import { RootStackParamList } from './src/navigation/types';
import BottomBar from './src/navigation/BottomBar';
import MedicinesScreen from './src/screens/Medicines/MedicinesScreen';
import MedicineItemDetails from './src/screens/Medicines/MedicineItemDetails';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <StatusBar
          animated={true}
          backgroundColor='transparent'
          barStyle={'dark-content'}
          translucent={true}
        />
        <Stack.Navigator initialRouteName='Welcome'>
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
        </Stack.Navigator>
        {/* <CustomSpeedDial /> */}
      </NavigationContainer>
    </RootSiblingParent>
  );
}
