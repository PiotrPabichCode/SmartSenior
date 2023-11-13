import {
  AntDesign,
  Entypo,
  Feather,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { constants } from '@src/constants/Constants';

type IconProps = {
  name: string;
  size?: number;
  color?: string;
  style?: object;
  onPress?: () => void;
  focused?: boolean;
};

export const renderIcon = ({ name, size, color, style, focused, onPress }: IconProps) => {
  const iconName = name + (focused ? '-active' : '');
  return <Icons name={iconName} onPress={onPress} size={size} color={color} style={style} />;
};

const Icons = ({ name, size, color, style, onPress }: IconProps) => {
  switch (name) {
    case 'home-bottom-nav':
      return (
        <Ionicons
          name="home-outline"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'home-bottom-nav-active':
      return (
        <Ionicons
          name="home"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'calendar-bottom-nav':
      return (
        <Ionicons
          name="calendar-outline"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'calendar-bottom-nav-active':
      return (
        <Ionicons
          name="calendar"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'events-bottom-nav':
      return (
        <Ionicons
          name="calendar-outline"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'events-bottom-nav-active':
      return (
        <Ionicons
          name="calendar"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'chat-bottom-nav':
      return (
        <Ionicons
          name="chatbox-outline"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'chat-bottom-nav-active':
      return (
        <Ionicons
          name="chatbox"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'account-bottom-nav':
      return (
        <Ionicons
          name="person-circle-outline"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'account-bottom-nav-active':
      return (
        <Ionicons
          name="person-circle"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'user-account':
      return (
        <Ionicons
          name="person-outline"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'theme-account':
      return (
        <Ionicons
          name="partly-sunny-outline"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'theme-light':
      return (
        <Ionicons
          name="sunny-outline"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'theme-light-active':
      return (
        <Ionicons
          name="sunny"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={color || '#d4d700'}
          style={style}
        />
      );
    case 'theme-dark':
      return (
        <Ionicons
          name="moon-outline"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'theme-dark-active':
      return (
        <Ionicons
          name="moon"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={color || 'darkblue'}
          style={style}
        />
      );
    case 'language-account':
      return (
        <Ionicons
          name="language-outline"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'tags-account':
      return (
        <AntDesign
          name="tagso"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'notification-account':
      return (
        <Ionicons
          name="notifications-outline"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'share-account':
      return (
        <Ionicons
          name="share-social-outline"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'logout-wizard':
      return (
        <Ionicons
          name="exit-outline"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={color || 'white'}
          style={style}
        />
      );
    case 'logout-account':
      return (
        <Ionicons
          name="exit-outline"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'pills':
      return (
        <Fontisto
          name="pills"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'doctor':
      return (
        <Fontisto
          name="doctor"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'pharmacy':
      return (
        <MaterialIcons
          name="local-pharmacy"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'notes':
      return (
        <MaterialCommunityIcons
          name="note"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'arrow-right':
      return (
        <Ionicons
          name="arrow-forward"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'arrow-left':
      return (
        <Ionicons
          name="arrow-back"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'edit':
      return (
        <AntDesign
          name="edit"
          size={size || constants.iconSizeS}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
    case 'more':
      return (
        <Foundation
          name="indent-more"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={color || 'black'}
          style={style}
        />
      );
    case 'add': {
      return (
        <MaterialIcons
          name="add"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={color || 'blue'}
          style={style}
        />
      );
    }
    case 'delete': {
      return (
        <MaterialIcons
          name="delete"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={color || 'red'}
          style={style}
        />
      );
    }
    case 'pharmacy': {
      return (
        <AntDesign
          name="medicinebox"
          size={size || constants.iconSizeL}
          onPress={onPress}
          color={color || 'black'}
          style={style}
        />
      );
    }
    case 'connected-users': {
      return (
        <Feather
          name="users"
          size={size || constants.iconSizeL}
          onPress={onPress}
          color={color || 'black'}
          style={style}
        />
      );
    }
    case 'chat': {
      return (
        <Entypo
          name="chat"
          size={size || constants.iconSizeL}
          onPress={onPress}
          color={color || 'black'}
          style={style}
        />
      );
    }
    case 'phone': {
      return (
        <Entypo
          name="phone"
          size={size || constants.iconSizeL}
          onPress={onPress}
          color={color || 'black'}
          style={style}
        />
      );
    }
    case 'email': {
      return (
        <Entypo
          name="email"
          size={size || constants.iconSizeL}
          onPress={onPress}
          color={color || 'black'}
          style={style}
        />
      );
    }
    case 'user': {
      return (
        <Entypo
          name="user"
          size={size || constants.iconSizeL}
          onPress={onPress}
          color={color || 'black'}
          style={style}
        />
      );
    }
    default:
      return (
        <Ionicons
          name="search"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={color}
          style={style}
        />
      );
  }
};

export default Icons;
