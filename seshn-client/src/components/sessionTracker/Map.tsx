import { getCurrentLocation } from '@/helpers';
import { Location } from '@/types';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

interface Props {
  tracking: boolean;
}

export const Map = ({ tracking }: Props) => {
  const [initialCoords, setInitialCoords] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [trackedCoords, setTrackedCoords] = useState<Location[]>([]);

  useEffect(() => {
    (async () => {
      const loc = await getCurrentLocation();
      setInitialCoords(loc);
    })();
  }, []);

  useEffect(() => {
    if (tracking) {
      setTrackedCoords([]);
    }
  }, [tracking]);

  return (
    <MapView
      style={StyleSheet.absoluteFillObject}
      region={{
        ...initialCoords,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation
      zoomEnabled={!tracking}
      rotateEnabled={!tracking}
      scrollEnabled={!tracking}
      followsUserLocation={tracking}
      loadingEnabled
      onUserLocationChange={({ nativeEvent }) => {
        if (tracking && nativeEvent?.coordinate) {
          const { latitude, longitude } = nativeEvent.coordinate;
          setTrackedCoords((prevCoords) => [
            ...prevCoords,
            { latitude, longitude },
          ]);
        }
      }}
    >
      <Polyline coordinates={trackedCoords} strokeColor="red" strokeWidth={3} />
    </MapView>
  );
};
