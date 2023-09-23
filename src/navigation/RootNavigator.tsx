import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import CustomHeader from '../components/CustomHeader';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Welcome'
        component={WelcomeScreen}
        options={{
          header: () => <CustomHeader title='Strona powitalna' />,
        }}
      />
      <Stack.Screen
        name='SignIn'
        component={LoginScreen}
        options={{ header: () => <CustomHeader title='Strona logowania' /> }}
      />
      <Stack.Screen
        name='SignUp'
        component={RegisterScreen}
        options={{ header: () => <CustomHeader title='Strona rejestracji' /> }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
