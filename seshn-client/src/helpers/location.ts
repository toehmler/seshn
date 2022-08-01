import Geolocation, {
  GeolocationError,
  GeolocationOptions,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import { Location } from '@/types';

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
