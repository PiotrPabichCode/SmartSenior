import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from '../screens/CalendarScreen';
import Icons from '../custom/Icons';
import AccountScreen from '../screens/Account/AccountScreen';
import EventsScreen from '../screens/EventsScreen';
import ChatScreen from '../screens/ChatScreen';
import { BottomBarParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import CreateEventScreen from '../screens/Events/CreateEventScreen';

const Tab = createBottomTabNavigator<BottomBarParamList>();

const BottomBarNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'Strona główna',
          tabBarLabel: 'Strona główna',
          tabBarIcon: () => <Icons name='home-bottom-nav' />,
        }}
      />
      <Tab.Screen
        name='Calendar'
        component={CreateEventScreen} // TODO
        options={{
          title: 'Kalendarz',
          tabBarLabel: 'Kalendarz',
          tabBarIcon: () => <Icons name='calendar-bottom-nav' />,
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name='Events'
        component={EventsScreen}
        options={{
          title: 'Wydarzenia',
          tabBarLabel: 'Wydarzenia',
          tabBarIcon: () => <Icons name='events-bottom-nav' />,
          tabBarBadge: 3,
        }}
      />
      {/* <Tab.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          tabBarLabel: 'Czat',
          tabBarIcon: () => <Icons name='chat-bottom-nav' />,
          tabBarBadge: 3,
        }}
      /> */}
      <Tab.Screen
        name='Account'
        component={AccountScreen}
        options={{
          title: 'Profil',
          tabBarLabel: 'Profil',
          tabBarIcon: () => <Icons name='account-bottom-nav' />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBarNavigator;
