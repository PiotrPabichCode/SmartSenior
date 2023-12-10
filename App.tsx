import { useState, useCallback } from 'react';
import { LogBox, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { navigationRef } from './src/navigation/navigationUtils';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { usePushNotifications } from '@src/hooks/usePushNotifications';
import LocationPermissionModal from '@src/components/LocationPermissionModal';
import store from '@src/redux/store';
import { injectStore } from '@src/redux/common';
import { useUserAuthentication } from '@src/config/useUserAuthentication';
import { useAppSetup } from '@src/config/useAppSetup';
import { ThemeProvider } from '@rneui/themed';
import theme from '@src/config/theme';

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
      <ThemeProvider theme={theme}>
        <SafeAreaProvider onLayout={onLayoutRootView}>
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
