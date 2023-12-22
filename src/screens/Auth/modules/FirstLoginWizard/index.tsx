import { StyleSheet, View } from 'react-native';
import CustomActivityIndicator from '@src/components/CustomActivityIndicator';
import { validateUserData } from '@src/redux/auth/auth.api';
import { useAppSelector } from '@src/redux/types';
import { selectAuthStatus, selectUser } from '@src/redux/auth/auth.slice';
import FirstLoginForm from './FirstLoginForm';
import BackButton from './BackButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useThemeColors from '@src/config/useThemeColors';

const FirstLoginWizard = () => {
  const { top } = useSafeAreaInsets();
  const status = useAppSelector(state => selectAuthStatus(state));
  const user = useAppSelector(state => selectUser(state));
  const backgroundColor = useThemeColors().mainBackground;

  if (status === 'pending' || validateUserData(user)) {
    return <CustomActivityIndicator />;
  }

  return (
    <View style={[styles.container, { paddingTop: top * 1.5, backgroundColor }]}>
      <BackButton />
      <FirstLoginForm user={user} />
    </View>
  );
};

export default FirstLoginWizard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
