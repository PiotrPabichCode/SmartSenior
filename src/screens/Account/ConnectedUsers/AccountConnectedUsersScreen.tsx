import SeniorView from './SeniorView';
import KeeperView from './KeeperView';
import { Roles } from '@src/models';
import { useAppSelector } from '@src/redux/types';

const AccountConnectedUsersScreen = () => {
  const role: string | undefined = useAppSelector(state => state.auth.user?.role);

  switch (role) {
    case Roles.KEEPER:
      return <KeeperView />;
    default:
      return <SeniorView />;
  }
};

export default AccountConnectedUsersScreen;
