import { useEffect, useState, useCallback } from 'react';
import { LogBox, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';
import { FIREBASE_AUTH } from './firebaseConfig';
import CustomActivityIndicator from './src/components/CustomActivityIndicator';
import { logoutAction, verifyAuth } from './src/redux/actions/authActions';
import { navigationRef } from './src/navigation/navigationUtils';
import {
  clearEventsAction,
  loadActiveEventsAction,
} from '@src/redux/actions/eventsActions';
import Localization from './src/localization/Localization';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import Calendar from '@src/components/Calendar/Calendar';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const [isNavigationReady, setIsNavigationReady] = useState<boolean>(false);

  useEffect(() => {
    async function prepare() {
      try {
        StatusBar.setBarStyle('light-content', true);
        Calendar.setupCalendar();
        Localization.setupI18nConfig();
      } catch (error) {
        console.warn(error);
      } finally {
        setIsAppReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        store.dispatch(verifyAuth(user));
        store.dispatch(loadActiveEventsAction());
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

  /*
    Show ActivityIndicator when user connection is loading
  */

  if (!isAppReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => setIsNavigationReady(true)}>
          <AppNavigator />
        </NavigationContainer>
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
