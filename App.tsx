import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { UserProvider } from './src/context/UserContext';

export default function App() {
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
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
  });

  /*
    Show ActivityIndicator when user connection is loading
  */
  if (connecting) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <UserProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator user={user} />
        </NavigationContainer>
        <Toast />
      </SafeAreaProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
