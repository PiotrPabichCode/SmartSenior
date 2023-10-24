import { useEffect, useState, useCallback } from 'react';
import { LogBox, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';
import { FIREBASE_AUTH } from './firebaseConfig';
import {
  loadConnectedUsersAction,
  logoutAction,
  verifyAuth,
} from './src/redux/actions/authActions';
import { navigationRef } from './src/navigation/navigationUtils';
import { clearEventsAction, loadActiveEventsAction } from '@src/redux/actions/eventsActions';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import Calendar from '@src/components/Calendar/Calendar';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import Localization from '@src/localization/Localization';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const [isNavigationReady, setIsNavigationReady] = useState<boolean>(false);
  const theme = useColorScheme();

  useEffect(() => {
    async function prepare() {
      try {
        await Calendar.setupCalendar();
        await Localization.setupI18nConfig();
        useLocalStorage('THEME_KEY').setItem(theme);
        setIsAppReady(true);
      } catch (error) {
        console.warn(error);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, user => {
      if (user) {
        store.dispatch(verifyAuth(user));
        store.dispatch(loadActiveEventsAction());
        store.dispatch(loadConnectedUsersAction());
      } else {
        store.dispatch(clearEventsAction());
        store.dispatch(logoutAction());
      }
    });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady, isNavigationReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <NavigationContainer ref={navigationRef} onReady={() => setIsNavigationReady(true)}>
          <AppNavigator />
        </NavigationContainer>
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
}
