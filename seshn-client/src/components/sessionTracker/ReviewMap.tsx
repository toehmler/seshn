import { Location } from '@/types';
import { Circle } from 'native-base';
import { RefObject, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

interface Props {
  mapRef: RefObject<MapView>;
  path: Location[];
}

export const ReviewMap = ({ mapRef, path }: Props) => {
  const fitPath = useCallback(
    (animated = true) =>
      mapRef.current?.fitToCoordinates(path, {
        edgePadding: { top: 30, right: 50, bottom: 100, left: 50 },
        animated,
      }),
    [mapRef, path]
  );

  useEffect(() => {
    fitPath(false);
  }, [fitPath]);

  return (
    <MapView
      ref={mapRef}
      style={StyleSheet.absoluteFillObject}
      showsUserLocation={false}
      followsUserLocation={false}
      loadingEnabled
    >
      <Polyline
        coordinates={path}
        strokeColor="red"
        strokeWidth={3}
        tappable
        onPress={() => fitPath()}
      />
      <Marker coordinate={path[0]} onPress={() => fitPath()}>
        <Circle bgColor="white" size="5" borderColor="black" borderWidth={1} />
      </Marker>
      <Marker coordinate={path[path.length - 1]} onPress={() => fitPath()}>
        <Circle bgColor="black" size="5">
          <Circle
            bgColor="transparent"
            borderColor="white"
            borderWidth={1}
            size="4"
          />
        </Circle>
      </Marker>
    </MapView>
  );
};
