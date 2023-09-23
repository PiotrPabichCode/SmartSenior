import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import AccountItemDetailsScreen from '../screens/Account/AccountItemDetailsScreen';
import MedicinesScreen from '../screens/Medicines/MedicinesScreen';
import MedicineItemDetails from '../screens/Medicines/MedicineItemDetails';
import PharmaciesScreen from '../screens/Pharmacies/PharmaciesScreen';
import PharmacyItemDetails from '../screens/Pharmacies/PharmacyItemDetails';
import BottomBarNavigator from './BottomBarNavigator';
import CustomHeader from '../components/CustomHeader';

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
        options={({ route }) => ({
          header: () => (
            <CustomHeader
              title={route.params.title}
              nested={true}
              more={true}
            />
          ),
        })}
      />
      <Stack.Screen
        name='Medicines'
        component={MedicinesScreen}
        options={{
          header: () => (
            <CustomHeader title='Lista leków' nested={true} more={true} />
          ),
        }}
      />
      <Stack.Screen
        name='MedicinesItemDetails'
        component={MedicineItemDetails}
        options={{
          header: () => (
            <CustomHeader title='Lek - opis' nested={true} more={true} />
          ),
        }}
      />
      <Stack.Screen
        name='Pharmacies'
        component={PharmaciesScreen}
        options={{
          header: () => (
            <CustomHeader title='Lista aptek' nested={true} more={true} />
          ),
        }}
      />
      <Stack.Screen
        name='PharmaciesItemDetails'
        component={PharmacyItemDetails}
        options={{
          header: () => (
            <CustomHeader title='Apteka - opis' nested={true} more={true} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
