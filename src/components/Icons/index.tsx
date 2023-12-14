import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import useThemeColors from '@src/config/useThemeColors';
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
  console.log(color);
  const iconColor = color ?? useThemeColors().icon;

  switch (name) {
    case 'settings': {
      return (
        <Ionicons
          name="settings-outline"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    }
    case 'home-bottom-nav':
      return (
        <Ionicons
          name="home-outline"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'home-bottom-nav-active':
      return (
        <Ionicons
          name="home"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'calendar-bottom-nav':
      return (
        <Ionicons
          name="calendar-outline"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'calendar-bottom-nav-active':
      return (
        <Ionicons
          name="calendar"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'events-bottom-nav':
      return (
        <Ionicons
          name="calendar-outline"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'events-bottom-nav-active':
      return (
        <Ionicons
          name="calendar"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'chat-bottom-nav':
      return (
        <Ionicons
          name="chatbox-outline"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'chat-bottom-nav-active':
      return (
        <Ionicons
          name="chatbox"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'account-bottom-nav':
      return (
        <Ionicons
          name="person-circle-outline"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'account-bottom-nav-active':
      return (
        <Ionicons
          name="person-circle"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'user-account':
      return (
        <Ionicons
          name="person-outline"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'theme-account':
      return (
        <Ionicons
          name="partly-sunny-outline"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'theme-light':
      return (
        <Ionicons
          name="sunny-outline"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'theme-light-active':
      return (
        <Ionicons
          name="sunny"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={'#d4d700'}
          style={style}
        />
      );
    case 'theme-dark':
      return (
        <Ionicons
          name="moon-outline"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'theme-dark-active':
      return (
        <Ionicons
          name="moon"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={'darkblue'}
          style={style}
        />
      );
    case 'language-account':
      return (
        <Ionicons
          name="language-outline"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'tags-account':
      return (
        <AntDesign
          name="tagso"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'medicines-account':
      return (
        <AntDesign
          name="medicinebox"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={iconColor || 'black'}
          style={style}
        />
      );
    case 'pharmacies-account':
      return (
        <AntDesign
          name="shoppingcart"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={iconColor || 'black'}
          style={style}
        />
      );
    case 'notification-account':
      return (
        <Ionicons
          name="notifications-outline"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'share-account':
      return (
        <Ionicons
          name="share-social-outline"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'logout-wizard':
      return (
        <Ionicons
          name="exit-outline"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={iconColor || 'white'}
          style={style}
        />
      );
    case 'logout-account':
      return (
        <Ionicons
          name="exit-outline"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'pills':
      return (
        <Fontisto
          name="pills"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'doctor':
      return (
        <Fontisto
          name="doctor"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'pharmacy':
      return (
        <MaterialIcons
          name="local-pharmacy"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'notes':
      return (
        <MaterialCommunityIcons
          name="note"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'arrow-right':
      return (
        <Ionicons
          name="arrow-forward"
          size={size || constants.iconSizeXL}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'arrow-left':
      return (
        <Ionicons
          name="arrow-back"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'lock':
      return (
        <FontAwesome
          name="lock"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'safety':
      return (
        <AntDesign
          name="Safety"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'edit':
      return (
        <AntDesign
          name="edit"
          size={size || constants.iconSizeS}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    case 'more':
      return (
        <Foundation
          name="indent-more"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={iconColor || 'black'}
          style={style}
        />
      );
    case 'less':
      return (
        <Foundation
          name="indent-less"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={iconColor || 'black'}
          style={style}
        />
      );
    case 'add': {
      return (
        <MaterialIcons
          name="add"
          size={size || constants.iconSizeM}
          onPress={onPress}
          color={iconColor || 'blue'}
          style={style}
        />
      );
    }
    case 'person': {
      return (
        <Fontisto
          name="person"
          size={size || constants.iconSizeL}
          onPress={onPress}
          color={iconColor}
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
          color={'red'}
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
          color={iconColor || 'black'}
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
          color={iconColor || 'black'}
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
          color={iconColor || 'blue'}
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
          color={iconColor || 'black'}
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
          color={iconColor || 'black'}
          style={style}
        />
      );
    }
    case 'heart': {
      return (
        <AntDesign
          name="heart"
          size={size || constants.iconSizeL}
          onPress={onPress}
          color={'red'}
          style={style}
        />
      );
    }
    case 'heart-outline': {
      return (
        <AntDesign
          name="hearto"
          size={size || constants.iconSizeL}
          onPress={onPress}
          color={'red'}
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
          color={iconColor || 'black'}
          style={style}
        />
      );
    }
    case 'active-tick': {
      return (
        <Ionicons
          name="md-checkmark-circle-outline"
          size={size || constants.iconSizeL}
          onPress={onPress}
          color={iconColor || 'green'}
          style={style}
        />
      );
    }
    case 'active-untick': {
      return (
        <MaterialIcons
          name="cancel"
          size={size || constants.iconSizeL}
          onPress={onPress}
          color={iconColor || 'red'}
          style={style}
        />
      );
    }
    case 'show-toggle': {
      return (
        <Ionicons
          name="eye-sharp"
          size={size || constants.iconSizeL}
          onPress={onPress}
          color={iconColor}
          style={style}
        />
      );
    }
    case 'hide-toggle': {
      return (
        <Ionicons
          name="eye-off-sharp"
          size={size || constants.iconSizeL}
          onPress={onPress}
          color={iconColor}
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
          color={iconColor}
          style={style}
        />
      );
  }
};

export default Icons;
