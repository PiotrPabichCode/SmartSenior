import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH, db } from '../../firebaseConfig';
import { get, ref } from 'firebase/database';

interface User {
  uid: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  gender: string | null;
  birthDate: string | null;
}

type UserContextType = User | null;

const UserContext = createContext<UserContextType>(null);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserContextType>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        const loadUser = async () => {
          const userRef = ref(db, `users/${user.uid}`);
          const userDataSnapshot = await get(userRef);
          setUser(userDataSnapshot.val());
        };
        loadUser();
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
