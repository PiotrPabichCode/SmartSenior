import { useAppSelector } from '@src/redux/store';
import SeniorView from './SeniorView';
import { ConnectedUsers } from '@src/models';

const AccountConnectedUsersScreen = () => {
  const role: string | undefined = useAppSelector(state => state.auth.user?.role);
  const connectedUsers: ConnectedUsers = useAppSelector(state => state.auth.connectedUsers);
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
