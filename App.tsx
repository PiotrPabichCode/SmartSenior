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
import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['pl'] = {
  monthNames: [
    'styczeń',
    'luty',
    'marzec',
    'kwiecień',
    'maj',
    'czerwiec',
    'lipiec',
    'sierpień',
    'wrzesień',
    'październik',
    'listopad',
    'grudzień',
  ],
  monthNamesShort: [
    'sty',
    'lut',
    'mar',
    'kwi',
    'maj',
    'cze',
    'lip',
    'sie',
    'wrz',
    'paź',
    'lis',
    'gru',
  ],
  dayNames: [
    'niedziela',
    'poniedziałek',
    'wtorek',
    'środa',
    'czwartek',
    'piątek',
    'sobota',
  ],
  dayNamesShort: ['niedz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.'],
  today: 'dzisiaj',
};

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'today',
};

LocaleConfig.defaultLocale = 'pl';

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
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
};

export default App;
