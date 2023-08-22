import React from 'react';
import type { PropsWithChildren } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

type IconProps = PropsWithChildren<{
  name: string;
  onPress?: () => void;
}>;

const Icons = ({ name, onPress }: IconProps) => {
  switch (name) {
    case 'home-bottom-nav':
      return <Icon name='home' size={24} color='#000000' onPress={onPress} />;
    case 'calendar-bottom-nav':
      return (
        <Icon name='calendar' size={24} color='#000000' onPress={onPress} />
      );
    case 'events-bottom-nav':
      return (
        <Icon name='user-md' size={24} color='#000000' onPress={onPress} />
      );
    case 'chat-bottom-nav':
      return (
        <Icon name='comment' size={24} color='#000000' onPress={onPress} />
      );
    case 'account-bottom-nav':
      return (
        <Icon name='user-circle' size={24} color='#000000' onPress={onPress} />
      );
    case 'pills-home-page':
      return <Icon name='pills' size={38} color='#000000' onPress={onPress} />;
    case 'doctor-home-page':
      return (
        <Icon name='user-md' size={38} color='#000000' onPress={onPress} />
      );
    case 'notes-home-page':
      return (
        <Icon name='sticky-note' size={38} color='#000000' onPress={onPress} />
      );
    case 'user-account':
      return <Icon name='user' size={34} color='#000000' onPress={onPress} />;
    case 'theme-account':
      return (
        <Icon name='palette' size={34} color='#000000' onPress={onPress} />
      );
    case 'language-account':
      return (
        <Icon name='language' size={34} color='#000000' onPress={onPress} />
      );
    case 'notification-account':
      return <Icon name='bell' size={34} color='#000000' onPress={onPress} />;
    case 'share-account':
      return <Icon name='share' size={34} color='#000000' onPress={onPress} />;
    case 'logout-account':
      return (
        <Icon name='sign-out-alt' size={34} color='#000000' onPress={onPress} />
      );
    case 'arrow-right':
      return (
        <Icon name='arrow-right' size={34} color='#000000' onPress={onPress} />
      );
    case 'light-mode-account':
      return <Icon name='sun' size={26} color='#000000' onPress={onPress} />;
    case 'light-mode-active-account':
      return (
        <Icon name='sun' size={26} color='#000000' solid onPress={onPress} />
      );
    case 'dark-mode-account':
      return <Icon name='moon' size={26} color='#000000' onPress={onPress} />;
    case 'dark-mode-active-account':
      return (
        <Icon name='moon' size={26} color='#000000' solid onPress={onPress} />
      );
    case 'edit-account':
      return <Icon name='edit' size={16} color='#000000' onPress={onPress} />;
    default:
      return (
        <Icon
          name='question'
          size={26}
          color='#000000'
          solid
          onPress={onPress}
        />
      );
  }
};

export default Icons;
