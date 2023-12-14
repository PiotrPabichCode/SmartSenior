import AuthNavigator from './AuthNavigator';
import RootNavigator from './RootNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useAppSelector } from '@src/redux/types';
import { selectLanguage, selectTheme, selectUser } from '@src/redux/auth/auth.slice';
import useThemeColors from '@src/config/useThemeColors';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const user = useAppSelector(state => selectUser(state));
  const language = useAppSelector(state => selectLanguage(state));
  const backgroundColor = useThemeColors().cardBackground;
  return (
    <Stack.Navigator
      key={language}
      initialRouteName={'Welcome'}
      screenOptions={{
        headerShown: false,
        animation: 'none',
        contentStyle: {
          backgroundColor,
        },
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
