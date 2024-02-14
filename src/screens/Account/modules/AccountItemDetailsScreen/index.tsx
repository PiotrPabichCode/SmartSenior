import { CustomScrollContainer } from '@src/components';
import { goBack } from '@src/navigation/navigationUtils';
import { useAppSelector } from '@src/redux/types';
import { selectUser } from '@src/redux/auth/auth.slice';
import AccountData from './AccountData';
import AccountTags from './AccountTags';
import Language from './Language';
import FavouriteMedicines from './FavouriteMedicines';
import FavouritePharmacies from './FavouritePharmacies';
import ConnectedUsers from './ConnectedUsers';
import { AccountItemDetailsScreenProps } from '@src/navigation/types';

const AccountItemDetailsScreen = ({ route }: AccountItemDetailsScreenProps) => {
  const user = useAppSelector(state => selectUser(state));

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

  return <CustomScrollContainer>{renderScreenByType(screenType)}</CustomScrollContainer>;
};

export default AccountItemDetailsScreen;
