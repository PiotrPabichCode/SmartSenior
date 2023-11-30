import { t } from '@src/localization/Localization';
import { View, Text } from 'react-native';

const LoginDivider = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
      <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
      <View>
        <Text style={{ width: 50, textAlign: 'center' }}>{t('login.or')}</Text>
      </View>
      <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
    </View>
  );
};

export default LoginDivider;
