import { CustomScrollContainer } from '@src/components/CustomScrollContainer';
import Colors from '@src/constants/Colors';
import { goBack } from '@src/navigation/navigationUtils';
import { useAppSelector } from '@src/redux/types';
import { selectTheme, selectUser } from '@src/redux/auth/auth.slice';
import AccountData from './AccountData';
import AccountTags from './AccountTags';
import Language from './Language';
import FavouriteMedicines from './FavouriteMedicines';
import FavouritePharmacies from './FavouritePharmacies';
import ConnectedUsers from './ConnectedUsers';

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
        return <ConnectedUsers />;
      case 'tags':
        return <AccountTags />;
      case 'medicines':
        return <FavouriteMedicines />;
      case 'pharmacies':
        return <FavouritePharmacies />;
      case 'notification':
        return renderNotificationScreen();
      case 'language':
        return <Language />;
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

export default AccountItemDetailsScreen;
