import { StyleSheet } from 'react-native';
import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import Colors from '@src/constants/Colors';
import AccountConnectedUsersScreen from './ConnectedUsers/AccountConnectedUsersScreen';
import { goBack } from '@src/navigation/navigationUtils';
import { useAppSelector } from '@src/redux/types';
import AccountTags from './Tags/AccountTags';
import { selectTheme, selectUser } from '@src/redux/auth/auth.slice';
import FavouriteMedicinesScreen from './FavouriteMedicines/FavouriteMedicinesScreen';
import FavouritePharmaciesScreen from './FavouritePharmacies/FavouritePharmaciesScreen';
import AccountData from './AccountData/AccountData';
import LanguageScreen from './Language/LanguageScreen';

const AccountItemDetailsScreen = ({ route }: any) => {
  const user = useAppSelector(state => selectUser(state));
  const theme = useAppSelector(state => selectTheme(state));
  const currentTheme = Colors[theme];

  if (!user) {
    goBack();
    return null;
  }

  const { screenType } = route.params;

  const renderNotificationScreen = () => {
    return <></>;
  };

  const renderScreenByType = (screenType: string) => {
    switch (screenType) {
      case 'user':
        return <AccountData />;
      case 'connected-users':
        return <AccountConnectedUsersScreen />;
      case 'tags':
        return <AccountTags />;
      case 'medicines':
        return <FavouriteMedicinesScreen />;
      case 'pharmacies':
        return <FavouritePharmaciesScreen />;
      case 'notification':
        return renderNotificationScreen();
      case 'language':
        return <LanguageScreen />;
      case 'share':
        return <></>;
      default:
        return <></>;
    }
  };

  return (
    <CustomScrollContainer theme={currentTheme}>
      {renderScreenByType(screenType)}
    </CustomScrollContainer>
  );
};

const styles = StyleSheet.create({
  languageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  language: {
    fontSize: 20,
    fontWeight: '600',
    color: '#808080',
  },
  pickLanguage: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'center',
    borderRadius: 10,
    marginVertical: 10,
    fontSize: 20,
    fontWeight: '500',
    textAlignVertical: 'center',
  },
});

export default AccountItemDetailsScreen;
