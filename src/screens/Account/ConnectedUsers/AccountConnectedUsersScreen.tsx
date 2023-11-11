import { useAppSelector } from '@src/redux/store';
import { SeniorView, KeeperView } from './index';
import { Roles } from '@src/models';

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
