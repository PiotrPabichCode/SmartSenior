import { useEffect, useState } from 'react';
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
import SpeedDialMenu from '@src/components/SpeedDialMenu';
import {
  clearEventsAction,
  loadActiveEventsAction,
} from '@src/redux/actions/eventsActions';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log(user);
      if (user) {
        setIsLoading(true);
        store.dispatch(verifyAuth(user));
        store.dispatch(loadActiveEventsAction());
        setIsLoading(false);
      } else {
        store.dispatch(clearEventsAction());
        store.dispatch(logoutAction());
      }
    });
  }, []);

  /*
    Show ActivityIndicator when user connection is loading
  */
  if (isLoading) {
    return <CustomActivityIndicator />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <AppNavigator />
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}
