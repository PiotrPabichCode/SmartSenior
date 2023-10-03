import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { FIREBASE_AUTH } from './firebaseConfig';
import CustomActivityIndicator from './src/components/CustomActivityIndicator';
import { logoutAction, verifyAuth } from './src/redux/actions';
import { navigationRef } from './src/navigation/navigationUtils';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        store.dispatch(verifyAuth(user));
      } else {
        store.dispatch(logoutAction());
      }
    });
  }, []);

  /*
    Show ActivityIndicator when user connection is loading
  */
  // if (!isReady) {
  //   return <CustomActivityIndicator />;
  // }

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef} onReady={() => setIsReady(true)}>
        <AppNavigator />
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}
