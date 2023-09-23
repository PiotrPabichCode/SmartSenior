import React from 'react';
import AuthNavigator from './AuthNavigator';
import RootNavigator from './RootNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

const AppNavigator = (props: any) => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName={'Welcome'}
      screenOptions={{
        headerShown: false,
      }}>
      {props.user ? (
        <Stack.Screen name='Inside' component={AuthNavigator} />
      ) : (
        <Stack.Screen name='Initial' component={RootNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
