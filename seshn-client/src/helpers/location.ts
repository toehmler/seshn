import Geolocation, {
  GeolocationError,
  GeolocationOptions,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import { Location } from '@/types';
import { Region } from 'react-native-maps';

export const getCurrentLocation = (
  options?: GeolocationOptions
): Promise<Location> => {
  // Promisify Geolocation.getCurrentPosition since it relies on outdated callbacks
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position: GeolocationResponse) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error: GeolocationError) => {
        reject(error);
      },
      options
    );
  });
};

export const calculateRegionFromCoordinates = (
  coordinates: Location[]
): Region | undefined => {
  if (coordinates.length < 2) {
    return undefined;
  }

  const maxLatitude = Math.max(...coordinates.map(({ latitude }) => latitude));
  const minLatitude = Math.min(...coordinates.map(({ latitude }) => latitude));
  const maxLongitude = Math.max(
    ...coordinates.map(({ longitude }) => longitude)
  );
  const minLongitude = Math.min(
    ...coordinates.map(({ longitude }) => longitude)
  );

  const latitude = (maxLatitude + minLatitude) / 2;
  const longitude = (maxLongitude + minLongitude) / 2;

  const region = {
    latitude,
    longitude,
    latitudeDelta: Math.max(latitude - minLatitude + 0.01, 0.0922),
    longitudeDelta: Math.max(longitude - minLongitude + 0.01, 0.0421),
  };
  return region;
};
