import { getCurrentLocation } from '@/helpers';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { addPathPoint } from '@/redux';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

export const Map = () => {
  const [initialCoords, setInitialCoords] = useState({
    latitude: 0,
    longitude: 0,
  });

  const { path, tracking } = useAppSelector((state) => state.session);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const loc = await getCurrentLocation();
      setInitialCoords(loc);
    })();
  }, []);

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
          dispatch(addPathPoint({ latitude, longitude }));
        }
      }}
    >
      <Polyline coordinates={path} strokeColor="red" strokeWidth={3} />
    </MapView>
  );
};
