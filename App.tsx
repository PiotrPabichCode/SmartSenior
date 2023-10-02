import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { User, onAuthStateChanged } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { FIREBASE_AUTH } from './firebaseConfig';
import CustomActivityIndicator from './src/components/CustomActivityIndicator';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [connecting, setConnecting] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setConnecting(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setConnecting(false);
    });
  }, []);

  /*
    Show ActivityIndicator when user connection is loading
  */
  if (connecting) {
    return <CustomActivityIndicator />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator user={user} />
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}
