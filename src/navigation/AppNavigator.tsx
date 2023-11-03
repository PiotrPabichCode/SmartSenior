import AuthNavigator from './AuthNavigator';
import RootNavigator from './RootNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useAppSelector } from '../redux/store';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const user = useAppSelector(state => state.auth.user);
  const language = useAppSelector(state => state.auth.language);
  return (
    <Stack.Navigator
      key={language}
      initialRouteName={'Welcome'}
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}>
      {user ? (
        <Stack.Screen name="Inside" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="Initial" component={RootNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
