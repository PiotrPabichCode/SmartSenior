import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import AccountItemDetailsScreen from '@screens/Account/AccountItemDetailsScreen';
import MedicinesScreen from '@screens/Medicines/MedicinesScreen';
import MedicineItemDetails from '@screens/Medicines/MedicineItemDetails';
import PharmaciesScreen from '@screens/Pharmacies/PharmaciesScreen';
import PharmacyItemDetails from '@screens/Pharmacies/PharmacyItemDetails';
import CreateEventScreen from '@screens/Events/CreateEventScreen';
import FirstLoginWizard from '@screens/Auth/FirstLoginWizard';

import BottomBarNavigator from './BottomBarNavigator';
import CustomHeader from '@components/CustomHeader';
import EventItemScreen from '@src/screens/Events/EventItemScreen';
import { translate } from '@src/localization/Localization';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="FirstLoginWizard">
      <Stack.Screen
        name="FirstLoginWizard"
        component={FirstLoginWizard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BottomBar"
        component={BottomBarNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AccountItemDetails"
        component={AccountItemDetailsScreen}
        options={({ route }) => ({
          header: () => <CustomHeader title={route.params.title} nested={true} more={true} />,
        })}
      />
      <Stack.Screen
        name="Medicines"
        component={MedicinesScreen}
        options={{
          header: () => (
            <CustomHeader title={translate('nav.medicines')} nested={true} more={true} />
          ),
        }}
      />
      <Stack.Screen
        name="MedicinesItemDetails"
        component={MedicineItemDetails}
        options={{
          header: () => (
            <CustomHeader title={translate('nav.medicinesItemDetails')} nested={true} more={true} />
          ),
        }}
      />
      <Stack.Screen
        name="Pharmacies"
        component={PharmaciesScreen}
        options={{
          header: () => (
            <CustomHeader title={translate('nav.pharmacies')} nested={true} more={true} />
          ),
        }}
      />
      <Stack.Screen
        name="PharmaciesItemDetails"
        component={PharmacyItemDetails}
        options={{
          header: () => (
            <CustomHeader
              title={translate('nav.pharmaciesItemDetails')}
              nested={true}
              more={true}
            />
          ),
        }}
      />
      <Stack.Screen
        name="CreateEvent"
        component={CreateEventScreen}
        options={{
          header: () => (
            <CustomHeader title={translate('nav.createEvent')} nested={true} more={true} />
          ),
        }}
      />
      <Stack.Screen
        name="EventItem"
        component={EventItemScreen}
        options={{
          header: () => (
            <CustomHeader title={translate('nav.eventItem')} nested={true} more={true} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
