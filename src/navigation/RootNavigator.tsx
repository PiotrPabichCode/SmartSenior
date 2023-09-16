import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
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
};

export default RootNavigator;
