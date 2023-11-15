import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationError {
  message: string;
}

interface UserLocation {
  location: Coordinates | null;
  error: LocationError | null;
  openInGoogleMaps: () => void;
}

const useUserLocation = (): UserLocation => {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<LocationError | null>(null);

  useEffect(() => {
    const getLocation = async (): Promise<void> => {
      try {
        let { status } = await Location.requestBackgroundPermissionsAsync();
        if (status !== 'granted') {
          setError({ message: 'Permission to access location was denied' });
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
      } catch (error: any) {
        setError({ message: error.message });
      }
    };

    getLocation();
  }, []);

  const openInGoogleMaps = (): void => {
    if (location) {
      const { latitude, longitude } = location;
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url);
    } else {
      setError({ message: 'Location not available yet' });
    }
  };

  return { location, error, openInGoogleMaps };
};

export default useUserLocation;
