import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import AccountItemDetailsScreen from '../screens/Account/AccountItemDetailsScreen';
import MedicinesScreen from '../screens/Medicines/MedicinesScreen';
import MedicineItemDetails from '../screens/Medicines/MedicineItemDetails';
import PharmaciesScreen from '../screens/Pharmacies/PharmaciesScreen';
import PharmacyItemDetails from '../screens/Pharmacies/PharmacyItemDetails';
import BottomBarNavigator from './BottomBarNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='BottomBar'
        component={BottomBarNavigator}
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
};

export default AuthNavigator;
