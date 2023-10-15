import AuthNavigator from './AuthNavigator';
import RootNavigator from './RootNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useAppSelector } from '../redux/store';
import SideDrawerNavigator from './SideDrawer/SideDrawerNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

export const drawerRef = React.createRef();

const AppNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const user = useAppSelector((state) => state.auth.user);
  const Drawer = createDrawerNavigator();

  const SideDrawer = () => {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name='SideDrawer' component={SideDrawerNavigator} />
      </Drawer.Navigator>
    );
  };

  return (
    <Stack.Navigator
      initialRouteName={'Welcome'}
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}>
      {user ? (
        // <Stack.Group>
        <Stack.Screen name='Inside' component={AuthNavigator} />
      ) : (
        /*{ <Stack.Screen
            name='SideDrawer'
            component={SideDrawer}
            options={{ headerShown: false }}
          /> }*/
        // </Stack.Group>
        <Stack.Screen name='Initial' component={RootNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
