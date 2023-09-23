import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarScreen from '../screens/CalendarScreen';
import AccountScreen from '../screens/Account/AccountScreen';
import EventsScreen from '../screens/EventsScreen';
import ChatScreen from '../screens/ChatScreen';
import { BottomBarParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import CreateEventScreen from '../screens/Events/CreateEventScreen';
import Icons, { renderIcon } from '../custom/Icons';
import CustomHeader from '../components/CustomHeader';

const Tab = createBottomTabNavigator<BottomBarParamList>();

const BottomBarNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarLabel: 'Strona główna',
          tabBarIcon: ({ focused }) => renderIcon('home-bottom-nav', focused),
          header: () => <CustomHeader title='Strona główna' more={true} />,
        }}
      />
      <Tab.Screen
        name='Calendar'
        component={CalendarScreen} // TODO
        options={{
          tabBarLabel: 'Kalendarz',
          tabBarIcon: ({ focused }) =>
            renderIcon('calendar-bottom-nav', focused),
          tabBarBadge: 3,
          header: () => <CustomHeader title='Kalendarz' more={true} />,
        }}
      />
      <Tab.Screen
        name='Events'
        component={EventsScreen}
        options={{
          tabBarLabel: 'Wydarzenia',
          tabBarIcon: ({ focused }) => renderIcon('events-bottom-nav', focused),
          tabBarBadge: 3,
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
            renderIcon('account-bottom-nav', focused),
          header: () => <CustomHeader title='Profil' more={true} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomBarNavigator;
