import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';
import * as Location from 'expo-location';
import { t } from '@src/localization/Localization';

const LocationPermissionModal = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const checkPermissions = async () => {
      const { granted } = await Location.getBackgroundPermissionsAsync();
      if (!granted) {
        setVisible(true);
      }
    };

    checkPermissions();
  }, []);

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, marginBottom: 10, textAlign: 'center' }}>
            {t('locationPermissionMessage')}
          </Text>
          <Button
            title={t('locationPermissionButton')}
            onPress={async () => {
              await Location.requestForegroundPermissionsAsync();
              await Location.requestBackgroundPermissionsAsync();
              setVisible(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LocationPermissionModal;
