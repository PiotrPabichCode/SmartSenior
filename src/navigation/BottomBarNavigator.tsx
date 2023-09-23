import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from '../screens/CalendarScreen';
import AccountScreen from '../screens/Account/AccountScreen';
import EventsScreen from '../screens/EventsScreen';
import ChatScreen from '../screens/ChatScreen';
import { BottomBarParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import CreateEventScreen from '../screens/Events/CreateEventScreen';
import { renderIcon } from '../custom/Icons';

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
          tabBarIcon: ({ focused }) => renderIcon('home-bottom-nav', focused),
        }}
      />
      {/* <Tab.Screen
        name='Calendar'
        component={CreateEventScreen} // TODO
        options={{
          title: 'Kalendarz',
          tabBarLabel: 'Kalendarz',
          tabBarIcon: ({ focused }) => renderIcon('calendar-bottom-nav', focused),
          tabBarBadge: 3,
        }}
      /> */}
      <Tab.Screen
        name='Events'
        component={EventsScreen}
        options={{
          title: 'Wydarzenia',
          tabBarLabel: 'Wydarzenia',
          tabBarIcon: ({ focused }) => renderIcon('events-bottom-nav', focused),
          tabBarBadge: 3,
        }}
      />
      {/* <Tab.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          tabBarLabel: 'Czat',
          tabBarIcon: ({ focused }) => renderIcon('chat-bottom-nav', focused),
          tabBarBadge: 3,
        }}
      /> */}
      <Tab.Screen
        name='Account'
        component={AccountScreen}
        options={{
          title: 'Profil',
          tabBarLabel: 'Profil',
          tabBarIcon: ({ focused }) =>
            renderIcon('account-bottom-nav', focused),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBarNavigator;
