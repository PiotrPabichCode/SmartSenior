import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { PharmaciesScreen, PharmacyItemDetails } from '@src/screens/Pharmacies';
import { MedicinesScreen, MedicineItemDetails } from '@src/screens/Medicines';
import CreateEventScreen from '@screens/Events/CreateEventScreen';
import {
  AddConnectedUser,
  AddTag,
  SeniorDashboard,
  AccountItemDetailsScreen,
} from '@src/screens/Account';

import { FirstLoginWizard } from '@src/screens/Auth';
import BottomBarNavigator from './BottomBarNavigator';
import CustomHeader from '@components/CustomHeader';
import EventItemScreen from '@src/screens/Events/EventItemScreen';
import { t } from '@src/localization/Localization';
import { validateUserData } from '@src/redux/auth/auth.api';
import { useAppSelector } from '@src/redux/types';
import { selectUser } from '@src/redux/auth/auth.slice';
import FilterPanel from '@src/components/FilterPanel';
import EventsScreen from '@src/screens/Events/EventsScreen/EventsScreen';
import EventsGroupDetails from '@src/screens/Events/EventsGroupDetails';
import NotesScreen from '@src/screens/Notes/modules/NotesScreen';
import { navigationRef } from './navigationUtils';
import SpeedDialMenu from '@src/components/SpeedDialMenu';
import { CreateNote, NoteDetails } from '@src/screens/Notes';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  const user = useAppSelector(state => selectUser(state));
  const renderSpeedDial = () => {
    const route = navigationRef.getCurrentRoute()?.name;
    if (route === 'Notes') {
      return <SpeedDialMenu style={{ position: 'absolute', right: 0, bottom: 0 }} />;
    }
  };
  return (
    <>
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
          name="AddTag"
          component={AddTag}
          options={{
            headerShown: false,
            presentation: 'transparentModal',
          }}
        />
        <Stack.Screen
          name="SeniorDashboard"
          component={SeniorDashboard}
          options={({ route }) => ({
            header: () => <CustomHeader title={route.params.title} nested={true} />,
          })}
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
            header: () => <CustomHeader title={t('nav.medicines')} nested={true} />,
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
            header: () => <CustomHeader title={t('nav.pharmacies')} nested={true} />,
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
          name="Notes"
          component={NotesScreen}
          options={{
            header: () => <CustomHeader title={t('nav.notes')} nested={true} />,
          }}
        />
        <Stack.Screen
          name="NoteDetails"
          component={NoteDetails}
          options={{
            header: () => <CustomHeader title={t('nav.noteDetails')} nested={true} />,
          }}
        />
        <Stack.Screen
          name="CreateNote"
          component={CreateNote}
          options={{
            animation: 'fade',
            header: () => <CustomHeader title={t('nav.createNote')} nested={true} />,
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
          name="EventsGroup"
          component={EventsScreen}
          options={{
            header: () => <CustomHeader title={t('nav.eventsGroup')} nested={true} />,
          }}
        />
        <Stack.Screen
          name="EventItem"
          component={EventItemScreen}
          options={{
            header: () => <CustomHeader title={t('nav.eventItem')} nested={true} />,
          }}
        />
        <Stack.Screen
          name="EventsGroupDetails"
          component={EventsGroupDetails}
          options={() => ({
            header: () => <CustomHeader title={'Szczegóły grupy wydarzeń'} nested={true} />,
            presentation: 'transparentModal',
            animation: 'slide_from_right',
            animationTypeForReplace: 'push',
          })}
        />
        <Stack.Screen
          name="FilterPanel"
          component={FilterPanel}
          options={({ route }) => ({
            header: () => (
              <CustomHeader
                title={t('filterPanel.label')}
                filter={true}
                filters={route?.params?.filters}
              />
            ),
            presentation: 'transparentModal',
            animation: 'slide_from_right',
            animationTypeForReplace: 'push',
          })}
        />
      </Stack.Navigator>
      {renderSpeedDial()}
    </>
  );
};

export default AuthNavigator;
