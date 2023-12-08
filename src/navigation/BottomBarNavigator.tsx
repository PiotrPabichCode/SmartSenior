import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AccountScreen } from '@src/screens/Account';
import { EventsGroupScreen } from '@src/screens/Events';
import HomeScreen from '@src/screens/Home';
import ChatScreen from '@src/screens/Chat';

import { BottomBarParamList } from './types';
import { renderIcon } from '@src/components/Icons';
import CustomHeader from '@components/CustomHeader';
import SpeedDialMenu from '@src/components/SpeedDialMenu';
import AgendaScreen from '@src/screens/Calendar';
import { t } from '@src/localization/Localization';
import { navigationRef } from './navigationUtils';
import { useAppSelector } from '@src/redux/types';
import { selectChatsUnseenMessages } from '@src/redux/chats/chats.slice';
import { selectEvents } from '@src/redux/events/events.slice';

const Tab = createBottomTabNavigator<BottomBarParamList>();

const BottomBarNavigator = () => {
  const events = useAppSelector(state => selectEvents(state));
  const unseenMessages = useAppSelector(state => selectChatsUnseenMessages(state));

  const renderSpeedDial = () => {
    const route = navigationRef.getCurrentRoute()?.name;
    if (route !== 'Chat') {
      return <SpeedDialMenu style={{ position: 'absolute', right: 0, bottom: 50 }} />;
    }
  };

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: t('bottomNav.home'),
            tabBarIcon: ({ focused }) => renderIcon({ name: 'home-bottom-nav', focused: focused }),
            header: () => <CustomHeader title={t('bottomNav.home')} />,
          }}
        />
        <Tab.Screen
          name="Calendar"
          component={AgendaScreen} // TODO
          options={{
            tabBarLabel: t('bottomNav.calendar'),
            tabBarIcon: ({ focused }) =>
              renderIcon({ name: 'calendar-bottom-nav', focused: focused }),
            tabBarBadge: events.length ? events.length : undefined,
            header: () => <CustomHeader title={t('bottomNav.calendar')} />,
          }}
        />
        <Tab.Screen
          name="Events"
          component={EventsGroupScreen}
          options={{
            tabBarLabel: t('bottomNav.events'),
            tabBarIcon: ({ focused }) => renderIcon({ name: 'home-bottom-nav', focused: focused }),
            tabBarBadge: events.length ? events.length : undefined,
            header: ({ navigation, route }) => (
              <CustomHeader
                title={t('bottomNav.events')}
                more={true}
                filters={route?.params?.filterConditions}
                onBack={item => {
                  navigation.setParams({
                    filteredData: item.filteredData,
                    filterConditions: item.filterConditions,
                  });
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarLabel: t('bottomNav.chat'),
            tabBarIcon: ({ focused }) => renderIcon({ name: 'chat-bottom-nav', focused: focused }),
            tabBarBadge: unseenMessages ? unseenMessages : undefined,
            header: () => <CustomHeader title={t('bottomNav.chat')} />,
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarLabel: t('bottomNav.profile'),
            tabBarIcon: ({ focused }) =>
              renderIcon({ name: 'account-bottom-nav', focused: focused }),
            header: () => <CustomHeader title={t('bottomNav.profile')} />,
          }}
        />
      </Tab.Navigator>
      {renderSpeedDial()}
    </>
  );
};

export default BottomBarNavigator;
