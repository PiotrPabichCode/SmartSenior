import type { PropsWithChildren } from 'react';
import {
  AntDesign,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

type IconProps = PropsWithChildren<{
  name: string;
  onPress?: () => void;
}>;

export const renderIcon = (
  name: string,
  focused?: boolean,
  onPress?: () => void
) => {
  const iconName = name + (focused ? '-active' : '');
  return <Icons name={iconName} onPress={onPress} />;
};

const Icons = ({ name, onPress }: IconProps) => {
  switch (name) {
    case 'home-bottom-nav':
      return <Ionicons name='home-outline' size={24} onPress={onPress} />;
    case 'home-bottom-nav-active':
      return <Ionicons name='home' size={24} onPress={onPress} />;
    case 'calendar-bottom-nav':
      return <Ionicons name='calendar-outline' size={24} onPress={onPress} />;
    case 'calendar-bottom-nav-active':
      return <Ionicons name='calendar' size={24} onPress={onPress} />;
    case 'events-bottom-nav':
      return <Ionicons name='calendar-outline' size={24} onPress={onPress} />;
    case 'events-bottom-nav-active':
      return <Ionicons name='calendar' size={24} onPress={onPress} />;
    case 'chat-bottom-nav':
      return <Ionicons name='chatbox-outline' size={24} onPress={onPress} />;
    case 'chat-bottom-nav-active':
      return <Ionicons name='chatbox' size={24} onPress={onPress} />;
    case 'account-bottom-nav':
      return (
        <Ionicons name='person-circle-outline' size={24} onPress={onPress} />
      );
    case 'account-bottom-nav-active':
      return <Ionicons name='person-circle' size={24} onPress={onPress} />;
    case 'user-account':
      return <Ionicons name='person-outline' size={34} onPress={onPress} />;
    case 'theme-account':
      return (
        <Ionicons name='partly-sunny-outline' size={34} onPress={onPress} />
      );
    case 'theme-light':
      return <Ionicons name='sunny-outline' size={34} onPress={onPress} />;
    case 'theme-light-active':
      return (
        <Ionicons name='sunny' size={34} onPress={onPress} color={'#d4d700'} />
      );
    case 'theme-dark':
      return <Ionicons name='moon-outline' size={34} onPress={onPress} />;
    case 'theme-dark-active':
      return (
        <Ionicons name='moon' size={34} onPress={onPress} color={'darkblue'} />
      );
    case 'language-account':
      return <Ionicons name='language-outline' size={34} onPress={onPress} />;
    case 'notification-account':
      return (
        <Ionicons name='notifications-outline' size={34} onPress={onPress} />
      );
    case 'share-account':
      return (
        <Ionicons name='share-social-outline' size={34} onPress={onPress} />
      );
    case 'logout-account':
      return <Ionicons name='exit-outline' size={34} onPress={onPress} />;
    case 'pills':
      return <Fontisto name='pills' size={38} onPress={onPress} />;
    case 'doctor':
      return <Fontisto name='doctor' size={38} onPress={onPress} />;
    case 'pharmacy':
      return (
        <MaterialIcons name='local-pharmacy' size={38} onPress={onPress} />
      );
    case 'notes':
      return <MaterialCommunityIcons name='note' size={38} onPress={onPress} />;
    case 'logout-account':
      return <Ionicons name='exit-outline' size={34} onPress={onPress} />;
    case 'arrow-right':
      return <Ionicons name='arrow-forward' size={34} onPress={onPress} />;
    case 'arrow-left':
      return <Ionicons name='arrow-back' size={34} onPress={onPress} />;
    case 'edit':
      return <AntDesign name='edit' size={20} onPress={onPress} />;
    case 'more':
      return <Foundation name='indent-more' size={24} color='black' />;
    default:
      return <Ionicons name='search' size={24} onPress={onPress} />;
  }
};

export default Icons;
