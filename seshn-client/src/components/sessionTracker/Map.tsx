import { getCurrentLocation } from '@/helpers';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { addPathPoint } from '@/redux';
import { RefObject, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

interface Props {
  mapRef: RefObject<MapView>;
}

export const Map = ({ mapRef }: Props) => {
  const [initialCoords, setInitialCoords] = useState({
    latitude: 0,
    longitude: 0,
  });

  // get the user's current location on mount
  useEffect(() => {
    (async () => {
      const loc = await getCurrentLocation();
      setInitialCoords(loc);
    })();
  }, []);

  const { currentSession, tracking, showUser } = useAppSelector(
    (state) => state.session
  );

  const dispatch = useAppDispatch();

  return (
    <MapView
      ref={mapRef}
      style={StyleSheet.absoluteFillObject}
      region={{
        ...initialCoords,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={showUser}
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
      <Polyline
        coordinates={currentSession?.path || []}
        strokeColor="red"
        strokeWidth={3}
      />
    </MapView>
  );
};
