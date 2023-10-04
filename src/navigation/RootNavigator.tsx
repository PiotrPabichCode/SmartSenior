import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import WelcomeScreen from '@screens/Auth/WelcomeScreen';
import LoginScreen from '@screens/Auth/LoginScreen';
import RegisterScreen from '@screens/Auth/RegisterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Welcome' component={WelcomeScreen} />
      <Stack.Screen name='SignIn' component={LoginScreen} />
      <Stack.Screen name='SignUp' component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
