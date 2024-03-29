import { useState, useCallback } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { navigationRef } from './src/navigation/navigationUtils';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { usePushNotifications } from '@src/hooks/usePushNotifications';
import LocationPermissionModal from '@src/components/LocationPermissionModal';
import store from '@src/redux/store';
import { injectStore } from '@src/redux/common';
import { useUserAuthentication, useAppSetup } from '@src/config';
import { ThemeProvider } from '@src/config';

injectStore(store);
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isNavigationReady, setIsNavigationReady] = useState<boolean>(false);
  const isAppReady = useAppSetup();
  const userReady = useUserAuthentication();
  usePushNotifications(userReady);

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
      <ThemeProvider>
        <SafeAreaProvider initialMetrics={initialWindowMetrics} onLayout={onLayoutRootView}>
          <NavigationContainer ref={navigationRef} onReady={() => setIsNavigationReady(true)}>
            <AppNavigator />
            <LocationPermissionModal />
          </NavigationContainer>
          <Toast />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}
