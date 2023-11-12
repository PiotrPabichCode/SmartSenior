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
import { t } from '@src/localization/Localization';
import AddConnectedUser from '@src/screens/Account/ConnectedUsers/AddConnectedUser';
import { validateUserData } from '@src/redux/auth/auth.api';
import { useAppSelector } from '@src/redux/types';
import { selectUser } from '@src/redux/auth/auth.slice';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  const user = useAppSelector(state => selectUser(state));
  return (
    <Stack.Navigator initialRouteName={validateUserData(user) ? 'BottomBar' : 'FirstLoginWizard'}>
      <Stack.Screen
        name="BottomBar"
        component={BottomBarNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FirstLoginWizard"
        component={FirstLoginWizard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddConnectedUser"
        component={AddConnectedUser}
        options={{
          headerShown: false,
          presentation: 'transparentModal',
        }}
      />
      <Stack.Screen
        name="AccountItemDetails"
        component={AccountItemDetailsScreen}
        options={({ route }) => ({
          header: () => <CustomHeader title={route.params.title} nested={true} />,
        })}
      />
      <Stack.Screen
        name="Medicines"
        component={MedicinesScreen}
        options={{
          header: () => <CustomHeader title={t('nav.medicines')} nested={true} more={true} />,
        }}
      />
      <Stack.Screen
        name="MedicinesItemDetails"
        component={MedicineItemDetails}
        options={{
          header: () => <CustomHeader title={t('nav.medicinesItemDetails')} nested={true} />,
        }}
      />
      <Stack.Screen
        name="Pharmacies"
        component={PharmaciesScreen}
        options={{
          header: () => <CustomHeader title={t('nav.pharmacies')} nested={true} more={true} />,
        }}
      />
      <Stack.Screen
        name="PharmaciesItemDetails"
        component={PharmacyItemDetails}
        options={{
          header: () => <CustomHeader title={t('nav.pharmaciesItemDetails')} nested={true} />,
        }}
      />
      <Stack.Screen
        name="CreateEvent"
        component={CreateEventScreen}
        options={{
          header: () => <CustomHeader title={t('nav.createEvent')} nested={true} />,
        }}
      />
      <Stack.Screen
        name="EventItem"
        component={EventItemScreen}
        options={{
          header: () => <CustomHeader title={t('nav.eventItem')} nested={true} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
