import { useEffect, useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';
import * as Location from 'expo-location';
import { t } from '@src/localization/Localization';
import { useAppSelector } from '@src/redux/types';
import { selectRole } from '@src/redux/auth/auth.slice';
import { setupLocationTracking } from '@src/redux/auth/auth.api';
import { StyleSheet } from 'react-native';

const LocationPermissionModal = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const role = useAppSelector(state => selectRole(state));

  useEffect(() => {
    const checkPermissions = async () => {
      const { granted } = await Location.getBackgroundPermissionsAsync();
      if (granted && role === 'SENIOR') {
        await setupLocationTracking();
      }
      if (!granted) {
        setVisible(true);
      }
    };

    checkPermissions();
  }, []);

  const getUserPermissions = async () => {
    await Location.requestForegroundPermissionsAsync();
    const { granted } = await Location.requestBackgroundPermissionsAsync();
    if (granted && role === 'SENIOR') {
      await setupLocationTracking();
    }
    setVisible(false);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{t('locationPermissionMessage')}</Text>
          <Button
            title={t('locationPermissionButton')}
            onPress={async () => {
              await getUserPermissions();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LocationPermissionModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
});
