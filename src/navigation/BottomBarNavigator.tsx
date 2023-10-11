import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from '@src/screens/Calendar/CalendarScreen';
import AccountScreen from '@screens/Account/AccountScreen';
import EventsScreen from '@src/screens/Events/EventsScreen';
import HomeScreen from '@src/screens/Home/HomeScreen';

import { BottomBarParamList } from './types';
import { renderIcon } from '@src/components/Icons';
import CustomHeader from '@components/CustomHeader';
import { useAppSelector } from '@src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import SpeedDialMenu from '@src/components/SpeedDialMenu';

const Tab = createBottomTabNavigator<BottomBarParamList>();

const BottomBarNavigator = () => {
  const events = useAppSelector((state) => state.events.events);
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Strona główna',
            tabBarIcon: ({ focused }) =>
              renderIcon({ name: 'home-bottom-nav', focused: focused }),
            header: () => <CustomHeader title='Strona główna' more={true} />,
          }}
        />
        <Tab.Screen
          name='Calendar'
          component={CalendarScreen} // TODO
          options={{
            tabBarLabel: 'Kalendarz',
            tabBarIcon: ({ focused }) =>
              renderIcon({ name: 'calendar-bottom-nav', focused: focused }),
            tabBarBadge: Object.values(events).length,
            header: () => <CustomHeader title='Kalendarz' more={true} />,
          }}
        />
        <Tab.Screen
          name='Events'
          component={EventsScreen}
          options={{
            tabBarLabel: 'Wydarzenia',
            tabBarIcon: ({ focused }) =>
              renderIcon({ name: 'home-bottom-nav', focused: focused }),
            tabBarBadge: Object.values(events).length,
            header: () => <CustomHeader title='Wydarzenia' more={true} />,
          }}
        />
        {/* <Tab.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          tabBarLabel: 'Czat',
          tabBarIcon: ({ focused }) => renderIcon('chat-bottom-nav', focused),
          tabBarBadge: 3,
          header: () => <CustomHeader title='Czat' more={true} />,
        }}
      /> */}
        <Tab.Screen
          name='Account'
          component={AccountScreen}
          options={{
            tabBarLabel: 'Profil',
            tabBarIcon: ({ focused }) =>
              renderIcon({ name: 'account-bottom-nav', focused: focused }),
            header: () => <CustomHeader title='Profil' more={true} />,
          }}
        />
      </Tab.Navigator>
      <SpeedDialMenu style={{ position: 'absolute', right: 0, bottom: 50 }} />
    </>
  );
};

export default BottomBarNavigator;
