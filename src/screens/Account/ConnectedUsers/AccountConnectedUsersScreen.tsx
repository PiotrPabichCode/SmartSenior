import { ROLES } from '@src/constants/Constants';
import { useAppSelector } from '@src/redux/store';
import SeniorView from './SeniorView';
import KeeperView from './KeeperView';
import AdminView from './AdminView';
import { ConnectedUser } from '@src/redux/auth/auth.types';

const AccountConnectedUsersScreen = () => {
  const role: string | undefined = useAppSelector(state => state.auth.userDetails?.role);
  const connectedUsers: ConnectedUser[] = useAppSelector(state => state.auth.connectedUsers);
  console.log(connectedUsers);

  // switch (role) {
  //   case ROLES.KEEPER: {
  // return <KeeperView connectedUsers={connectedUsers} />;
  //   }
  //   case ROLES.SENIOR: {
  return <SeniorView />;
  //   }
  //   default: {
  //     return <AdminView />;
  //   }
  // }
};

export default AccountConnectedUsersScreen;
