import SeniorView from './SeniorView';
import KeeperView from './KeeperView';
import { Roles } from '@src/models';
import { useAppSelector } from '@src/redux/types';
import { selectRole } from '@src/redux/auth/auth.slice';

const AccountConnectedUsersScreen = () => {
  const role = useAppSelector(state => selectRole(state));

  switch (role) {
    case Roles.SENIOR:
      return <SeniorView />;
    default:
      return <KeeperView />;
  }
};

export default AccountConnectedUsersScreen;
