import { StyleSheet, View } from 'react-native';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { validateUserData } from '@src/redux/auth/auth.api';
import { useAppSelector } from '@src/redux/types';
import { selectAuthStatus, selectUser } from '@src/redux/auth/auth.slice';
import FirstLoginForm from './FirstLoginForm';
import BackButton from './BackButton';

const FirstLoginWizard = () => {
  const status = useAppSelector(state => selectAuthStatus(state));
  const user = useAppSelector(state => selectUser(state));
  if (status === 'pending' || validateUserData(user)) {
    return <CustomActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <BackButton />
      <FirstLoginForm user={user} />
    </View>
  );
};

export default FirstLoginWizard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
});
