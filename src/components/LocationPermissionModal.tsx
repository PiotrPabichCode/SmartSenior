import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';
import * as Location from 'expo-location';

const LocationPermissionModal = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const checkPermissions = async () => {
      const { granted } = await Location.getBackgroundPermissionsAsync();
      console.log(granted);
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
            Aby aplikacja działała poprawnie, potrzebujemy konfiguracji ustawień dotyczących
            lokalizacji na urządzeniu. Proszę upewnić się, że uprawnienia związane z lokalizacją są
            ustawione prawidłowo. Dodatkowo, należy zapewnić, że działanie lokalizacji w tle jest
            zawsze dostępne.
          </Text>
          <Button
            title="Zezwól na dostęp"
            onPress={async () => {
              const res = await Location.requestForegroundPermissionsAsync();
              console.log(res);
              const res1 = await Location.requestBackgroundPermissionsAsync();
              console.log(res1);
              setVisible(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LocationPermissionModal;
